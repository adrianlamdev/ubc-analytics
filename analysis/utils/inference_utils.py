import pandas as pd

def prepare_inference_features(df, subject, course, year, campus="UBCV", session='W', professor=None):
    course_mask = (df['Subject'] == subject) & (df['Course'] == course)
    time_mask = ((df['Year'] < year) | 
                 ((df['Year'] == year) & (df['Session'] < session)))
    latest_data = df[course_mask & time_mask].iloc[-1].to_dict()

    features = {
        'Campus': campus,
        'Subject': subject,
        'Course': course,
        'Year': year,
        'Session': session,
        'SubjectCourse': f"{subject}{course}",
        'CourseLevel': latest_data['CourseLevel'],
        'Years_Since_Start': year - df['Year'].min(),
        'Course_Avg_Roll_1y': latest_data['Course_Avg_Roll_1y'],
        'Course_Min_Last_3y': latest_data['Course_Min_Last_3y'],
        'Course_Max_Last_3y': latest_data['Course_Max_Last_3y'],
        'Course_Std_Last_3y': latest_data['Course_Std_Last_3y'],
        'Professor': professor if professor else '',
        'Prof_Courses_Taught': latest_data['Prof_Courses_Taught']
    }

    for col in df.columns:
        if col.startswith('Prev_') or col.startswith('Prof_Prev_'):
            features[col] = latest_data[col]
    
    return pd.DataFrame([features])