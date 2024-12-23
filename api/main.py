from enum import Enum
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator
from src.utils.inference import prepare_inference_features
from joblib import load
import pandas as pd
import time
import structlog
from typing import List, Dict
from prometheus_client import Counter, Histogram, Gauge, start_http_server
from database import init_db, get_db, create_db_engine
from models import RequestLog
from sqlalchemy import func, case, select, text
from sqlalchemy.sql import text as sql_text
from datetime import datetime, timedelta, timezone, UTC
import psutil
from pydantic_settings import BaseSettings
from functools import lru_cache
import hashlib
import os


# Prometheus metrics
REQUEST_COUNT = Counter("app_request_count_total", "Total request count", ["endpoint"])
RESPONSE_TIME = Histogram("app_response_time_seconds", "Response time in seconds")
MEMORY_USAGE = Gauge("app_memory_usage_bytes", "Memory usage in bytes")
CONCURRENT_REQUESTS = Gauge("app_concurrent_requests", "Number of concurrent requests")
CACHE_HITS = Counter("app_cache_hits_total", "Total cache hits")
CACHE_MISSES = Counter("app_cache_misses_total", "Total cache misses")


MODEL = None
DF = None


logger = structlog.get_logger()
engine = create_db_engine()
init_db(engine)


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/db"
    MODEL_PATH: str = "models/ubcv_grade_predictor_ridge_v1.joblib"
    DATA_PATH: str = "data/ubcv_grades_processed_tableau_all.csv"
    ALLOWED_ORIGINS: list = ["http://localhost:3000"]
    PROMETHEUS_PORT: int = 9090

    class Config:
        env_file = ".env"


settings = Settings()


class SortOrder(Enum):
    HIGHEST = "highest"
    LOWEST = "lowest"


class InferenceRequest(BaseModel):
    subject: str
    course: int
    year: int
    campus: str = "UBCV"
    session: str = "W"
    professor: str = ""

    @field_validator("course")
    def validate_course(cls, v):
        if not 100 <= v <= 999:
            raise ValueError("Course number must be between 100 and 999")
        return v

    @field_validator("subject")
    def validate_subject(cls, v):
        if not v.isalpha() or len(v) > 4:
            raise ValueError("Subject must be alphabetic and maximum 4 characters")
        return v.upper()

    class Config:
        schema_extra = {
            "example": {
                "subject": "CPSC",
                "course": 110,
                "year": 2023,
                "campus": "UBCV",
                "session": "W",
                "professor": "Gregor",
            }
        }


def get_model():
    global MODEL
    if MODEL is None:
        try:
            MODEL = load("models/ubcv_grade_predictor_ridge_v1.joblib")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return MODEL


def get_df():
    global DF
    if DF is None:
        try:
            DF = pd.read_csv("data/ubcv_grades_processed_tableau_all.csv")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return DF


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@lru_cache(maxsize=1)
def get_model_version():
    with open(settings.MODEL_PATH, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()


@app.get("/api/v1/model-info")
async def get_model_info():
    return {
        "version": get_model_version(),
        "last_updated": os.path.getmtime(settings.MODEL_PATH),
        "size": os.path.getsize(settings.MODEL_PATH),
    }


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc) if settings.DEBUG else "An unexpected error occurred",
        },
    )


class DetailedHTTPException(HTTPException):
    def __init__(self, status_code: int, detail: str, code: str):
        super().__init__(status_code=status_code, detail=detail)
        self.code = code


@app.middleware("http")
async def log_requests(request, call_next):
    CONCURRENT_REQUESTS.inc()
    start_time = time.time()

    try:
        response = await call_next(request)
        status_code = response.status_code
        error = None
    except Exception as e:
        status_code = 500
        error = str(e)
        raise
    finally:
        duration = time.time() - start_time
        memory = psutil.Process().memory_info().rss

        # Update Prometheus metrics
        REQUEST_COUNT.labels(endpoint=request.url.path).inc()
        RESPONSE_TIME.observe(duration)
        MEMORY_USAGE.set(memory)
        CONCURRENT_REQUESTS.dec()

        # Log to database
        with get_db() as db:
            log_entry = RequestLog(
                endpoint=request.url.path,
                response_time=duration,
                memory_usage=memory,
                status_code=status_code,
                error=error,
            )

            # Add prediction-specific data if it's a prediction request
            if request.url.path == "/api/v1/predict" and hasattr(request, "prediction"):
                log_entry.prediction = request.prediction
                log_entry.subject = request.subject
                log_entry.course = request.course

            db.add(log_entry)

    return response


@app.get("/health")
async def healthcheck():
    try:
        # Check critical components
        model = get_model()
        df = get_df()
        with get_db() as db:
            db.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "timestamp": datetime.now(UTC).isoformat(),
            "components": {
                "model": "loaded",
                "data": "loaded",
                "database": "connected",
            },
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service unhealthy: {str(e)}")


@app.get("/health/detailed")
async def detailed_health_check() -> Dict:
    """Detailed health check endpoint"""
    # TODO: Implement this endpoint
    health_status = {
        "status": "healthy",
        "components": {
            "database": check_database_connection(),
            "model": check_model_status(),
            "memory": check_memory_usage(),
        },
    }
    return health_status


@app.get("/api/v1/subjects")
async def get_subjects():
    """Get a list of all subjects"""
    # TODO: Implement this endpoint
    pass


@app.get("/api/v1/metrics")
async def get_performance_stats(days_back: int = 30):
    with get_db() as db:
        try:
            cutoff_date = datetime.now(UTC) - timedelta(days=days_back)

            # Basic stats query using raw SQL for complex calculations
            basic_stats = db.execute(
                text("""
                    SELECT 
                        COUNT(*) as total_requests,
                        AVG(response_time) * 1000 as avg_response_time_ms,
                        percentile_cont(0.95) WITHIN GROUP (ORDER BY response_time) * 1000 as p95_response_time_ms,
                        (COUNT(CASE WHEN error IS NOT NULL THEN 1 END) * 100.0 / COUNT(*)) as error_rate
                    FROM request_logs 
                    WHERE timestamp >= :cutoff_date
                """),
                {"cutoff_date": cutoff_date},
            ).first()

            # Prediction stats query
            pred_stats = db.execute(
                text("""
                    SELECT 
                        AVG(prediction) as avg_prediction,
                        COUNT(prediction) as total_predictions
                    FROM request_logs
                    WHERE timestamp >= :cutoff_date 
                    AND prediction IS NOT NULL
                """),
                {"cutoff_date": cutoff_date},
            ).first()

            # Get Prometheus metrics
            try:
                cache_hits = CACHE_HITS._value.get()
                cache_misses = CACHE_MISSES._value.get()
                cache_hit_rate = (
                    (cache_hits / (cache_hits + cache_misses) * 100)
                    if (cache_hits + cache_misses) > 0
                    else 0
                )
            except Exception as e:
                logger.error(f"Error getting cache metrics: {str(e)}")
                cache_hit_rate = 0

            return {
                "total_requests": basic_stats.total_requests if basic_stats else 0,
                "avg_response_time_ms": round(basic_stats.avg_response_time_ms, 2)
                if basic_stats
                else 0,
                "p95_response_time_ms": round(basic_stats.p95_response_time_ms, 2)
                if basic_stats
                else 0,
                "error_rate_percentage": round(basic_stats.error_rate, 2)
                if basic_stats
                else 0,
                "prediction_metrics": {
                    "total_predictions": pred_stats.total_predictions
                    if pred_stats
                    else 0,
                    "average_grade_prediction": round(pred_stats.avg_prediction, 2)
                    if pred_stats and pred_stats.avg_prediction
                    else None,
                },
                "cache_hit_rate": round(cache_hit_rate, 2),
            }
        except Exception as e:
            logger.error(f"Error getting metrics: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/v1/predict")
async def predict(request: InferenceRequest):
    """Main prediction endpoint"""
    logger.info(f"Received prediction request for {request.subject} {request.course}")
    try:
        feature_start = time.time()
        model = get_model()
        df = get_df()

        try:
            historical_mask = (df["Subject"] == request.subject) & (
                df["Course"] == request.course
            )

            historical = df[historical_mask][["Year", "Session", "Avg", "Enrolled"]]

            # Check if we got any data
            if len(historical) > 0:
                logger.info(f"Raw historical data:\n{historical.head()}")  # Debugging

                # Aggregate by Year and Session
                historical_aggregated = (
                    historical.groupby(["Year", "Session"])
                    .agg({"Avg": "mean", "Enrolled": "mean"})
                    .reset_index()
                )

                logger.info(
                    f"Aggregated historical data:\n{historical_aggregated.head()}"
                )  # Debugging

                if len(historical_aggregated) > 0:
                    historical_data = []
                    for _, row in historical_aggregated.sort_values(
                        ["Year", "Session"]
                    ).iterrows():
                        historical_feature = prepare_inference_features(
                            df,
                            request.subject,
                            request.course,
                            int(row["Year"]),
                            request.campus,
                            request.session,
                            request.professor,
                        )
                        historical_prediction = model.predict(historical_feature)[0]
                        historical_data.append(
                            {
                                "year": f"{row['Year']}-{row['Session']}",
                                "average": round(float(row["Avg"]), 2)
                                if pd.notnull(row["Avg"])
                                else None,
                                "enrollment": int(row["Enrolled"])
                                if pd.notnull(row["Enrolled"])
                                else None,
                                "predicted_avg": round(float(historical_prediction), 2),
                            }
                        )
                    logger.info(
                        f"Found {len(historical_data)} historical records with predictions"
                    )
                else:
                    historical_data = []
                    logger.info("No aggregated historical records found")
            else:
                historical_data = []
                logger.info("No raw historical records found")

            logger.info(f"Found {len(historical_data)} historical records")

        except Exception as e:
            logger.warning(f"Error processing historical data: {str(e)}")
            historical_data = []

        input_features = prepare_inference_features(
            df,
            request.subject,
            request.course,
            request.year,
            request.campus,
            request.session,
            request.professor,
        )
        feature_time = round(time.time() - feature_start, 2)

        inference_start = time.time()
        output = model.predict(input_features)
        inference_time = round(time.time() - inference_start, 2)

        logger.info(f"Prediction successful: {output[0]}")

        return {
            "request_details": {
                "campus": request.campus,
                "subject": request.subject,
                "course": request.course,
                "year": request.year,
                "session": request.session,
                "professor": request.professor,
            },
            "timing": {
                "feature_preparation": feature_time,
                "model_inference": inference_time,
                "total_time": round(feature_time + inference_time, 2),
            },
            "predicted_avg": round(float(output[0]), 2),
            "historical_data": historical_data,
        }
    except ValueError as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/v1/gpa-boosters")
async def get_gpa_boosters(
    limit: int = 10,
    min_enrollment: int = 50,
    max_year_level: int = 2,
    include_subjects: List[str] = Query(default=[]),
    exclude_subjects: List[str] = Query(default=[]),
    min_historical_avg: float = 80,
):
    """Get predicted GPA booster courses"""
    start_time = time.time()
    year = pd.Timestamp.now().year
    logger.info(f"Fetching GPA boosters for year {year}")
    try:
        # Clean exclude subjects
        cleaned_exclude_subjects = []
        for subject in exclude_subjects:
            cleaned_exclude_subjects.extend(subject.split(","))
        cleaned_exclude_subjects = [
            s.strip() for s in cleaned_exclude_subjects if s.strip()
        ]

        # Clean include subjects
        cleaned_include_subjects = []
        for subject in include_subjects:
            cleaned_include_subjects.extend(subject.split(","))
        cleaned_include_subjects = [
            s.strip() for s in cleaned_include_subjects if s.strip()
        ]

        df = get_df()
        model = get_model()

        # Time for data aggregation and filtering
        agg_start = time.time()

        # Filter by year level using integer division
        df = df.assign(Year_Level=df["Course"].div(100).astype(int))
        filtered_df = df[df["Year_Level"] <= max_year_level]

        # Group and aggregate with year level filter
        course_stats = (
            filtered_df.groupby(["Subject", "Course"])
            .agg({"Enrolled": "mean", "Avg": "mean", "Year_Level": "first"})
            .reset_index()
        )

        # Apply enrollment and historical average filters
        eligible_courses = course_stats[
            (course_stats["Enrolled"] >= min_enrollment)
            & (course_stats["Avg"] >= min_historical_avg)
        ]

        # Apply subject inclusions if any
        if cleaned_include_subjects:
            eligible_courses = eligible_courses[
                eligible_courses["Subject"].isin(cleaned_include_subjects)
            ]

        # Apply subject exclusions if any
        if cleaned_exclude_subjects:
            eligible_courses = eligible_courses[
                ~eligible_courses["Subject"].isin(cleaned_exclude_subjects)
            ]

        agg_time = round(time.time() - agg_start, 2)

        # Time for predictions
        prediction_start = time.time()
        predictions = []
        for _, row in eligible_courses.iterrows():
            try:
                features = prepare_inference_features(
                    df, row["Subject"], row["Course"], year
                )
                pred = model.predict(features)[0]
                predictions.append(
                    {
                        "subject": row["Subject"],
                        "course": int(row["Course"]),
                        "year_level": int(row["Year_Level"]),
                        "predicted_avg": round(float(pred), 2),
                        "historical_avg": round(float(row["Avg"]), 2),
                    }
                )
            except ValueError:
                continue

        prediction_time = round(time.time() - prediction_start, 2)
        total_time = round(time.time() - start_time, 2)

        predictions.sort(key=lambda x: x["predicted_avg"], reverse=True)

        return {
            "timing": {
                "data_aggregation": agg_time,
                "predictions": prediction_time,
                "total_time": total_time,
            },
            "metadata": {
                "total_courses_considered": len(eligible_courses),
                "year": year,
                "filters": {
                    "min_enrollment": min_enrollment,
                    "max_year_level": max_year_level,
                    "min_historical_avg": min_historical_avg,
                    "include_subjects": cleaned_include_subjects,
                    "exclude_subjects": cleaned_exclude_subjects,
                },
            },
            "courses": predictions[:limit],
        }
    except Exception as e:
        logger.error(f"GPA boosters fetch failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/v1/test-db")
async def test_db_connection():
    try:
        with get_db() as db:
            # Insert a test log
            test_log = RequestLog(
                endpoint="/api/v1/test-db",
                response_time=0.1,
                memory_usage=1000,
                status_code=200,
                subject="TEST",
                course=101,
            )
            db.add(test_log)
            db.commit()

            # Query the most recent logs
            recent_logs = (
                db.query(RequestLog)
                .order_by(RequestLog.timestamp.desc())
                .limit(5)
                .all()
            )

            return {
                "status": "success",
                "message": "Database connection working",
                "recent_logs": [
                    {
                        "id": log.id,
                        "timestamp": log.timestamp,
                        "endpoint": log.endpoint,
                        "response_time": log.response_time,
                        "status_code": log.status_code,
                    }
                    for log in recent_logs
                ],
            }
    except Exception as e:
        logger.error(f"Database test failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
