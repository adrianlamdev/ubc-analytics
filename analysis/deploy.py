# from transformers import Pipeline
# import pandas as pd
# from joblib import load
# import os
# from utils.inference_utils import prepare_inference_features

# class GradePredictionPipeline(Pipeline):
#     def __init__(self):
#         super().__init__()

#         model_path = os.path.join("models", "ubcv_grade_predictor_ridge.joblib")
#         self.model = load(model_path)

#         self.df = pd.read_csv("../data/processed/ubcv_grades_processed_tableau_all.csv")
#         self.prepare_inference_features = prepare_inference_features

#     def preprocess(self, inputs):
#         # Validate inputs
#         required_fields = ['subject', 'course', 'year']
#         for field in required_fields:
#             if field not in inputs:
#                 raise ValueError(f"Missing required field: {field}")
        
#         # Create features
#         features = self.prepare_inference_features(
#             df=self.df,
#             subject=inputs['subject'],
#             course=inputs['course'],
#             year=inputs['year'],
#             campus=inputs.get('campus', 'UBCV'),
#             session=inputs.get('session', 'W'),
#             professor=inputs.get('professor', '')
#         )
#         return features
    
#     def _forward(self, model_inputs):
#         return self.model.predict(model_inputs)
    
#     def postprocess(self, model_outputs):
#         return {
#             "predicted_grade": float(model_outputs[0]),
#             "status": "success"
#         }

import sklearn
from sklearn.tree import DecisionTreeClassifier
from skops import hub_utils, card
from pathlib import Path
from joblib import load
from utils.inference_utils import prepare_inference_features
import pandas as pd

df = pd.read_csv("data/processed/ubcv_grades_processed_tableau_all.csv")

# Load example input

example_input = prepare_inference_features(
            df=df,
            subject = 'CPSC',
            course = 110,
            year = 2018,
            campus = 'UBCV',
            session= 'W',
            professor = ''
)
model = load("models/ubcv_grade_predictor_ridge.joblib")

# create repo on Hub
local_repo = "deployment"
hub_utils.init(
    model="models/ubcv_grade_predictor_ridge.joblib",
    requirements=[f"scikit-learn={sklearn.__version__}"],
    dst=local_repo,
    task="tabular-regression",
    data=example_input,
)

model_card = card.Card(model, metadata=card.metadata_from_config(Path(local_repo)))

model_card.save(Path(local_repo) / "README.md")

repo_id = "adrian-lam/ubcv-grade-predictor-ridge"

token = input("Enter your Hugging Face token: ")

hub_utils.push(
    repo_id=repo_id,
    source=local_repo,
    token=token,
    commit_message="Initial commit",
    create_remote=True,
)