from enum import Enum
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from utils.inference_utils import prepare_inference_features
from joblib import load
import pandas as pd
import time
import logging
from typing import List

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

MODEL = None
DF = None


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


@app.get("/")
async def health_check():
    """Basic health check endpoint that also verifies model loading"""
    try:
        get_model()
        get_df()
        return {"status": "ok", "message": "Model and data loaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")


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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
