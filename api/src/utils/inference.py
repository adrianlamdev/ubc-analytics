import pandas as pd
import numpy as np


def prepare_inference_features(
    df, subject, course, year, campus="UBCV", session="W", professor=None
):
    """
    Prepare features for model inference based on historical course data.

    Args:
        df (pd.DataFrame): Historical course data
        subject (str): Course subject code (e.g., 'CPSC')
        course (int): Course number (e.g., 110)
        year (int): Target year for prediction
        campus (str, optional): Campus code. Defaults to "UBCV"
        session (str, optional): Academic session. Defaults to "W"
        professor (str, optional): Professor name. Defaults to None

    Returns:
        pd.DataFrame: Feature matrix ready for model inference

    Raises:
        ValueError: If no historical data is found for the specified course
    """
    # Input validation
    course_mask = (df["Subject"] == subject) & (df["Course"] == course)
    time_mask = (df["Year"] < year) | ((df["Year"] == year) & (df["Session"] < session))
    filtered_df = df[course_mask & time_mask]

    if len(filtered_df) == 0:
        raise ValueError(
            f"No historical data found for {subject} {course} before {year}"
        )

    latest_data = filtered_df.iloc[-1].to_dict()

    # TODO: for later if UBCO
    # known_campuses = df["Campus"].unique()
    # if campus not in known_campuses:
    #     campus = "UBCV"

    known_sessions = df["Session"].unique()
    if session not in known_sessions:
        session = "W"

    if professor:
        known_professors = df["Professor"].unique()
        if professor not in known_professors:
            # If professor is unknown, use aggregated stats or defaults
            professor = ""
            latest_data["Prof_Courses_Taught"] = 0
            for col in df.columns:
                if col.startswith("Prof_Prev_"):
                    latest_data[col] = df[col].mean()

    features = {
        "Campus": campus,
        "Subject": subject,
        "Course": course,
        "Year": year,
        "Session": session,
        "SubjectCourse": f"{subject}{course}",
        "CourseLevel": latest_data["CourseLevel"],
        "Years_Since_Start": year - df["Year"].min(),
        "Course_Avg_Roll_1y": latest_data["Course_Avg_Roll_1y"],
        "Course_Min_Last_3y": latest_data["Course_Min_Last_3y"],
        "Course_Max_Last_3y": latest_data["Course_Max_Last_3y"],
        "Course_Std_Last_3y": latest_data["Course_Std_Last_3y"],
        "Professor": professor if professor else "",
        "Prof_Courses_Taught": latest_data["Prof_Courses_Taught"],
    }

    # Handle rolling statistics and previous values
    for col in df.columns:
        if col.startswith("Prev_") or col.startswith("Prof_Prev_"):
            features[col] = latest_data[col]

    # Convert to DataFrame and handle any remaining NaN values
    feature_df = pd.DataFrame([features])
    feature_df = feature_df.fillna(0)

    return feature_df
