from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from utils.inference_utils import prepare_inference_features
from joblib import load
import pandas as pd
import time
import logging

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
        }
    except ValueError as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
