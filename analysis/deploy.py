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