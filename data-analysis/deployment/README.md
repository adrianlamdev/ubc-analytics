---
library_name: sklearn
tags:
- sklearn
- skops
- tabular-regression
model_format: pickle
model_file: ubcv_grade_predictor_ridge.joblib
widget:
- structuredData:
    Campus:
    - UBCV
    Course:
    - 110
    CourseLevel:
    - 1
    Course_Avg_Roll_1y:
    - 73.5864074445
    Course_Max_Last_3y:
    - 91.0
    Course_Min_Last_3y:
    - 71.898305085
    Course_Std_Last_3y:
    - 7.270712022509893
    Prev_50-54:
    - 1.0
    Prev_55-59:
    - 5.0
    Prev_60-63:
    - 11.0
    Prev_64-67:
    - 12.0
    Prev_68-71:
    - 14.0
    Prev_72-75:
    - 15.0
    Prev_76-79:
    - 11.0
    Prev_80-84:
    - 31.0
    Prev_85-89:
    - 23.0
    Prev_90-100:
    - 23.0
    Prev_<50:
    - 31.0
    Prev_High:
    - 97.0
    Prev_Low:
    - 5.0
    Prev_Median:
    - .nan
    Prev_Percentile (25):
    - .nan
    Prev_Percentile (75):
    - .nan
    Prof_Courses_Taught:
    - .nan
    Prof_Prev_50-54:
    - .nan
    Prof_Prev_55-59:
    - .nan
    Prof_Prev_60-63:
    - .nan
    Prof_Prev_64-67:
    - .nan
    Prof_Prev_68-71:
    - .nan
    Prof_Prev_72-75:
    - .nan
    Prof_Prev_76-79:
    - .nan
    Prof_Prev_80-84:
    - .nan
    Prof_Prev_85-89:
    - .nan
    Prof_Prev_90-100:
    - .nan
    Prof_Prev_<50:
    - .nan
    Prof_Prev_High:
    - .nan
    Prof_Prev_Low:
    - .nan
    Prof_Prev_Median:
    - .nan
    Prof_Prev_Percentile (25):
    - .nan
    Prof_Prev_Percentile (75):
    - .nan
    Professor:
    - ''
    Session:
    - W
    Subject:
    - CPSC
    SubjectCourse:
    - CPSC110
    Year:
    - 2018
    Years_Since_Start:
    - 4
---

# Model description

[More Information Needed]

## Intended uses & limitations

[More Information Needed]

## Training Procedure

[More Information Needed]

### Hyperparameters

<details>
<summary> Click to expand </summary>

| Hyperparameter                                                       | Value                                                                                                                                                  |
|----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| memory                                                               |                                                                                                                                                        |
| steps                                                                | [('columntransformer', ColumnTransformer(transformers=[('pipeline-1',<br />                                 Pipeline(steps=[('simpleimputer',<br />                                                  SimpleImputer()),<br />                                                 ('standardscaler',<br />                                                  StandardScaler())]),<br />                                 ['Course_Avg_Roll_1y', 'Course_Min_Last_3y',<br />                                  'Course_Max_Last_3y', 'Course_Std_Last_3y']),<br />                                ('pipeline-2',<br />                                 Pipeline(steps=[('simpleimputer',<br />                                                  SimpleImputer(strategy='most_frequent')),<br />                                                 ('onehotencoder',<br />                                                  OneHotEncoder(drop='if_b...<br />                                                  SimpleImputer(strategy='most_frequent')),<br />                                                 ('ordinalencoder',<br />                                                  OrdinalEncoder(handle_unknown='use_encoded_value',<br />                                                                 unknown_value=-1))]),<br />                                 ['CourseLevel', 'Years_Since_Start',<br />                                  'Prof_Courses_Taught', 'Year']),<br />                                ('drop', 'drop',<br />                                 ['Reported', 'Section', 'Detail', 'Median',<br />                                  'Percentile (25)', 'Percentile (75)', 'High',<br />                                  'Low', '<50', '50-54', '55-59', '60-63',<br />                                  '64-67', '68-71', '72-75', '76-79', '80-84',<br />                                  '85-89', '90-100'])])), ('ridge', Ridge(alpha=2.091, random_state=42))]                                                                                                                                                        |
| transform_input                                                      |                                                                                                                                                        |
| verbose                                                              | False                                                                                                                                                  |
| columntransformer                                                    | ColumnTransformer(transformers=[('pipeline-1',<br />                                 Pipeline(steps=[('simpleimputer',<br />                                                  SimpleImputer()),<br />                                                 ('standardscaler',<br />                                                  StandardScaler())]),<br />                                 ['Course_Avg_Roll_1y', 'Course_Min_Last_3y',<br />                                  'Course_Max_Last_3y', 'Course_Std_Last_3y']),<br />                                ('pipeline-2',<br />                                 Pipeline(steps=[('simpleimputer',<br />                                                  SimpleImputer(strategy='most_frequent')),<br />                                                 ('onehotencoder',<br />                                                  OneHotEncoder(drop='if_b...<br />                                                  SimpleImputer(strategy='most_frequent')),<br />                                                 ('ordinalencoder',<br />                                                  OrdinalEncoder(handle_unknown='use_encoded_value',<br />                                                                 unknown_value=-1))]),<br />                                 ['CourseLevel', 'Years_Since_Start',<br />                                  'Prof_Courses_Taught', 'Year']),<br />                                ('drop', 'drop',<br />                                 ['Reported', 'Section', 'Detail', 'Median',<br />                                  'Percentile (25)', 'Percentile (75)', 'High',<br />                                  'Low', '<50', '50-54', '55-59', '60-63',<br />                                  '64-67', '68-71', '72-75', '76-79', '80-84',<br />                                  '85-89', '90-100'])])                                                                                                                                                        |
| ridge                                                                | Ridge(alpha=2.091, random_state=42)                                                                                                                    |
| columntransformer__force_int_remainder_cols                          | True                                                                                                                                                   |
| columntransformer__n_jobs                                            |                                                                                                                                                        |
| columntransformer__remainder                                         | drop                                                                                                                                                   |
| columntransformer__sparse_threshold                                  | 0.3                                                                                                                                                    |
| columntransformer__transformer_weights                               |                                                                                                                                                        |
| columntransformer__transformers                                      | [('pipeline-1', Pipeline(steps=[('simpleimputer', SimpleImputer()),<br />                ('standardscaler', StandardScaler())]), ['Course_Avg_Roll_1y', 'Course_Min_Last_3y', 'Course_Max_Last_3y', 'Course_Std_Last_3y']), ('pipeline-2', Pipeline(steps=[('simpleimputer', SimpleImputer(strategy='most_frequent')),<br />                ('onehotencoder',<br />                 OneHotEncoder(drop='if_binary', handle_unknown='ignore'))]), ['Campus', 'Session', 'SubjectCourse', 'Professor', 'Subject']), ('pipeline-3', Pipeline(steps=[('simpleimputer', SimpleImputer(strategy='most_frequent')),<br />                ('ordinalencoder',<br />                 OrdinalEncoder(handle_unknown='use_encoded_value',<br />                                unknown_value=-1))]), ['CourseLevel', 'Years_Since_Start', 'Prof_Courses_Taught', 'Year']), ('drop', 'drop', ['Reported', 'Section', 'Detail', 'Median', 'Percentile (25)', 'Percentile (75)', 'High', 'Low', '<50', '50-54', '55-59', '60-63', '64-67', '68-71', '72-75', '76-79', '80-84', '85-89', '90-100'])]                                                                                                                                                        |
| columntransformer__verbose                                           | False                                                                                                                                                  |
| columntransformer__verbose_feature_names_out                         | True                                                                                                                                                   |
| columntransformer__pipeline-1                                        | Pipeline(steps=[('simpleimputer', SimpleImputer()),<br />                ('standardscaler', StandardScaler())])                                                                                                                                                        |
| columntransformer__pipeline-2                                        | Pipeline(steps=[('simpleimputer', SimpleImputer(strategy='most_frequent')),<br />                ('onehotencoder',<br />                 OneHotEncoder(drop='if_binary', handle_unknown='ignore'))])                                                                                                                                                        |
| columntransformer__pipeline-3                                        | Pipeline(steps=[('simpleimputer', SimpleImputer(strategy='most_frequent')),<br />                ('ordinalencoder',<br />                 OrdinalEncoder(handle_unknown='use_encoded_value',<br />                                unknown_value=-1))])                                                                                                                                                        |
| columntransformer__drop                                              | drop                                                                                                                                                   |
| columntransformer__pipeline-1__memory                                |                                                                                                                                                        |
| columntransformer__pipeline-1__steps                                 | [('simpleimputer', SimpleImputer()), ('standardscaler', StandardScaler())]                                                                             |
| columntransformer__pipeline-1__transform_input                       |                                                                                                                                                        |
| columntransformer__pipeline-1__verbose                               | False                                                                                                                                                  |
| columntransformer__pipeline-1__simpleimputer                         | SimpleImputer()                                                                                                                                        |
| columntransformer__pipeline-1__standardscaler                        | StandardScaler()                                                                                                                                       |
| columntransformer__pipeline-1__simpleimputer__add_indicator          | False                                                                                                                                                  |
| columntransformer__pipeline-1__simpleimputer__copy                   | True                                                                                                                                                   |
| columntransformer__pipeline-1__simpleimputer__fill_value             |                                                                                                                                                        |
| columntransformer__pipeline-1__simpleimputer__keep_empty_features    | False                                                                                                                                                  |
| columntransformer__pipeline-1__simpleimputer__missing_values         | nan                                                                                                                                                    |
| columntransformer__pipeline-1__simpleimputer__strategy               | mean                                                                                                                                                   |
| columntransformer__pipeline-1__standardscaler__copy                  | True                                                                                                                                                   |
| columntransformer__pipeline-1__standardscaler__with_mean             | True                                                                                                                                                   |
| columntransformer__pipeline-1__standardscaler__with_std              | True                                                                                                                                                   |
| columntransformer__pipeline-2__memory                                |                                                                                                                                                        |
| columntransformer__pipeline-2__steps                                 | [('simpleimputer', SimpleImputer(strategy='most_frequent')), ('onehotencoder', OneHotEncoder(drop='if_binary', handle_unknown='ignore'))]              |
| columntransformer__pipeline-2__transform_input                       |                                                                                                                                                        |
| columntransformer__pipeline-2__verbose                               | False                                                                                                                                                  |
| columntransformer__pipeline-2__simpleimputer                         | SimpleImputer(strategy='most_frequent')                                                                                                                |
| columntransformer__pipeline-2__onehotencoder                         | OneHotEncoder(drop='if_binary', handle_unknown='ignore')                                                                                               |
| columntransformer__pipeline-2__simpleimputer__add_indicator          | False                                                                                                                                                  |
| columntransformer__pipeline-2__simpleimputer__copy                   | True                                                                                                                                                   |
| columntransformer__pipeline-2__simpleimputer__fill_value             |                                                                                                                                                        |
| columntransformer__pipeline-2__simpleimputer__keep_empty_features    | False                                                                                                                                                  |
| columntransformer__pipeline-2__simpleimputer__missing_values         | nan                                                                                                                                                    |
| columntransformer__pipeline-2__simpleimputer__strategy               | most_frequent                                                                                                                                          |
| columntransformer__pipeline-2__onehotencoder__categories             | auto                                                                                                                                                   |
| columntransformer__pipeline-2__onehotencoder__drop                   | if_binary                                                                                                                                              |
| columntransformer__pipeline-2__onehotencoder__dtype                  | <class 'numpy.float64'>                                                                                                                                |
| columntransformer__pipeline-2__onehotencoder__feature_name_combiner  | concat                                                                                                                                                 |
| columntransformer__pipeline-2__onehotencoder__handle_unknown         | ignore                                                                                                                                                 |
| columntransformer__pipeline-2__onehotencoder__max_categories         |                                                                                                                                                        |
| columntransformer__pipeline-2__onehotencoder__min_frequency          |                                                                                                                                                        |
| columntransformer__pipeline-2__onehotencoder__sparse_output          | True                                                                                                                                                   |
| columntransformer__pipeline-3__memory                                |                                                                                                                                                        |
| columntransformer__pipeline-3__steps                                 | [('simpleimputer', SimpleImputer(strategy='most_frequent')), ('ordinalencoder', OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1))] |
| columntransformer__pipeline-3__transform_input                       |                                                                                                                                                        |
| columntransformer__pipeline-3__verbose                               | False                                                                                                                                                  |
| columntransformer__pipeline-3__simpleimputer                         | SimpleImputer(strategy='most_frequent')                                                                                                                |
| columntransformer__pipeline-3__ordinalencoder                        | OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)                                                                                   |
| columntransformer__pipeline-3__simpleimputer__add_indicator          | False                                                                                                                                                  |
| columntransformer__pipeline-3__simpleimputer__copy                   | True                                                                                                                                                   |
| columntransformer__pipeline-3__simpleimputer__fill_value             |                                                                                                                                                        |
| columntransformer__pipeline-3__simpleimputer__keep_empty_features    | False                                                                                                                                                  |
| columntransformer__pipeline-3__simpleimputer__missing_values         | nan                                                                                                                                                    |
| columntransformer__pipeline-3__simpleimputer__strategy               | most_frequent                                                                                                                                          |
| columntransformer__pipeline-3__ordinalencoder__categories            | auto                                                                                                                                                   |
| columntransformer__pipeline-3__ordinalencoder__dtype                 | <class 'numpy.float64'>                                                                                                                                |
| columntransformer__pipeline-3__ordinalencoder__encoded_missing_value | nan                                                                                                                                                    |
| columntransformer__pipeline-3__ordinalencoder__handle_unknown        | use_encoded_value                                                                                                                                      |
| columntransformer__pipeline-3__ordinalencoder__max_categories        |                                                                                                                                                        |
| columntransformer__pipeline-3__ordinalencoder__min_frequency         |                                                                                                                                                        |
| columntransformer__pipeline-3__ordinalencoder__unknown_value         | -1                                                                                                                                                     |
| ridge__alpha                                                         | 2.091                                                                                                                                                  |
| ridge__copy_X                                                        | True                                                                                                                                                   |
| ridge__fit_intercept                                                 | True                                                                                                                                                   |
| ridge__max_iter                                                      |                                                                                                                                                        |
| ridge__positive                                                      | False                                                                                                                                                  |
| ridge__random_state                                                  | 42                                                                                                                                                     |
| ridge__solver                                                        | auto                                                                                                                                                   |
| ridge__tol                                                           | 0.0001                                                                                                                                                 |

</details>

### Model Plot

<style>#sk-container-id-1 {/* Definition of color scheme common for light and dark mode */--sklearn-color-text: #000;--sklearn-color-text-muted: #666;--sklearn-color-line: gray;/* Definition of color scheme for unfitted estimators */--sklearn-color-unfitted-level-0: #fff5e6;--sklearn-color-unfitted-level-1: #f6e4d2;--sklearn-color-unfitted-level-2: #ffe0b3;--sklearn-color-unfitted-level-3: chocolate;/* Definition of color scheme for fitted estimators */--sklearn-color-fitted-level-0: #f0f8ff;--sklearn-color-fitted-level-1: #d4ebff;--sklearn-color-fitted-level-2: #b3dbfd;--sklearn-color-fitted-level-3: cornflowerblue;/* Specific color for light theme */--sklearn-color-text-on-default-background: var(--sg-text-color, var(--theme-code-foreground, var(--jp-content-font-color1, black)));--sklearn-color-background: var(--sg-background-color, var(--theme-background, var(--jp-layout-color0, white)));--sklearn-color-border-box: var(--sg-text-color, var(--theme-code-foreground, var(--jp-content-font-color1, black)));--sklearn-color-icon: #696969;@media (prefers-color-scheme: dark) {/* Redefinition of color scheme for dark theme */--sklearn-color-text-on-default-background: var(--sg-text-color, var(--theme-code-foreground, var(--jp-content-font-color1, white)));--sklearn-color-background: var(--sg-background-color, var(--theme-background, var(--jp-layout-color0, #111)));--sklearn-color-border-box: var(--sg-text-color, var(--theme-code-foreground, var(--jp-content-font-color1, white)));--sklearn-color-icon: #878787;}
}#sk-container-id-1 {color: var(--sklearn-color-text);
}#sk-container-id-1 pre {padding: 0;
}#sk-container-id-1 input.sk-hidden--visually {border: 0;clip: rect(1px 1px 1px 1px);clip: rect(1px, 1px, 1px, 1px);height: 1px;margin: -1px;overflow: hidden;padding: 0;position: absolute;width: 1px;
}#sk-container-id-1 div.sk-dashed-wrapped {border: 1px dashed var(--sklearn-color-line);margin: 0 0.4em 0.5em 0.4em;box-sizing: border-box;padding-bottom: 0.4em;background-color: var(--sklearn-color-background);
}#sk-container-id-1 div.sk-container {/* jupyter's `normalize.less` sets `[hidden] { display: none; }`but bootstrap.min.css set `[hidden] { display: none !important; }`so we also need the `!important` here to be able to override thedefault hidden behavior on the sphinx rendered scikit-learn.org.See: https://github.com/scikit-learn/scikit-learn/issues/21755 */display: inline-block !important;position: relative;
}#sk-container-id-1 div.sk-text-repr-fallback {display: none;
}div.sk-parallel-item,
div.sk-serial,
div.sk-item {/* draw centered vertical line to link estimators */background-image: linear-gradient(var(--sklearn-color-text-on-default-background), var(--sklearn-color-text-on-default-background));background-size: 2px 100%;background-repeat: no-repeat;background-position: center center;
}/* Parallel-specific style estimator block */#sk-container-id-1 div.sk-parallel-item::after {content: "";width: 100%;border-bottom: 2px solid var(--sklearn-color-text-on-default-background);flex-grow: 1;
}#sk-container-id-1 div.sk-parallel {display: flex;align-items: stretch;justify-content: center;background-color: var(--sklearn-color-background);position: relative;
}#sk-container-id-1 div.sk-parallel-item {display: flex;flex-direction: column;
}#sk-container-id-1 div.sk-parallel-item:first-child::after {align-self: flex-end;width: 50%;
}#sk-container-id-1 div.sk-parallel-item:last-child::after {align-self: flex-start;width: 50%;
}#sk-container-id-1 div.sk-parallel-item:only-child::after {width: 0;
}/* Serial-specific style estimator block */#sk-container-id-1 div.sk-serial {display: flex;flex-direction: column;align-items: center;background-color: var(--sklearn-color-background);padding-right: 1em;padding-left: 1em;
}/* Toggleable style: style used for estimator/Pipeline/ColumnTransformer box that is
clickable and can be expanded/collapsed.
- Pipeline and ColumnTransformer use this feature and define the default style
- Estimators will overwrite some part of the style using the `sk-estimator` class
*//* Pipeline and ColumnTransformer style (default) */#sk-container-id-1 div.sk-toggleable {/* Default theme specific background. It is overwritten whether we have aspecific estimator or a Pipeline/ColumnTransformer */background-color: var(--sklearn-color-background);
}/* Toggleable label */
#sk-container-id-1 label.sk-toggleable__label {cursor: pointer;display: flex;width: 100%;margin-bottom: 0;padding: 0.5em;box-sizing: border-box;text-align: center;align-items: start;justify-content: space-between;gap: 0.5em;
}#sk-container-id-1 label.sk-toggleable__label .caption {font-size: 0.6rem;font-weight: lighter;color: var(--sklearn-color-text-muted);
}#sk-container-id-1 label.sk-toggleable__label-arrow:before {/* Arrow on the left of the label */content: "▸";float: left;margin-right: 0.25em;color: var(--sklearn-color-icon);
}#sk-container-id-1 label.sk-toggleable__label-arrow:hover:before {color: var(--sklearn-color-text);
}/* Toggleable content - dropdown */#sk-container-id-1 div.sk-toggleable__content {max-height: 0;max-width: 0;overflow: hidden;text-align: left;/* unfitted */background-color: var(--sklearn-color-unfitted-level-0);
}#sk-container-id-1 div.sk-toggleable__content.fitted {/* fitted */background-color: var(--sklearn-color-fitted-level-0);
}#sk-container-id-1 div.sk-toggleable__content pre {margin: 0.2em;border-radius: 0.25em;color: var(--sklearn-color-text);/* unfitted */background-color: var(--sklearn-color-unfitted-level-0);
}#sk-container-id-1 div.sk-toggleable__content.fitted pre {/* unfitted */background-color: var(--sklearn-color-fitted-level-0);
}#sk-container-id-1 input.sk-toggleable__control:checked~div.sk-toggleable__content {/* Expand drop-down */max-height: 200px;max-width: 100%;overflow: auto;
}#sk-container-id-1 input.sk-toggleable__control:checked~label.sk-toggleable__label-arrow:before {content: "▾";
}/* Pipeline/ColumnTransformer-specific style */#sk-container-id-1 div.sk-label input.sk-toggleable__control:checked~label.sk-toggleable__label {color: var(--sklearn-color-text);background-color: var(--sklearn-color-unfitted-level-2);
}#sk-container-id-1 div.sk-label.fitted input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: var(--sklearn-color-fitted-level-2);
}/* Estimator-specific style *//* Colorize estimator box */
#sk-container-id-1 div.sk-estimator input.sk-toggleable__control:checked~label.sk-toggleable__label {/* unfitted */background-color: var(--sklearn-color-unfitted-level-2);
}#sk-container-id-1 div.sk-estimator.fitted input.sk-toggleable__control:checked~label.sk-toggleable__label {/* fitted */background-color: var(--sklearn-color-fitted-level-2);
}#sk-container-id-1 div.sk-label label.sk-toggleable__label,
#sk-container-id-1 div.sk-label label {/* The background is the default theme color */color: var(--sklearn-color-text-on-default-background);
}/* On hover, darken the color of the background */
#sk-container-id-1 div.sk-label:hover label.sk-toggleable__label {color: var(--sklearn-color-text);background-color: var(--sklearn-color-unfitted-level-2);
}/* Label box, darken color on hover, fitted */
#sk-container-id-1 div.sk-label.fitted:hover label.sk-toggleable__label.fitted {color: var(--sklearn-color-text);background-color: var(--sklearn-color-fitted-level-2);
}/* Estimator label */#sk-container-id-1 div.sk-label label {font-family: monospace;font-weight: bold;display: inline-block;line-height: 1.2em;
}#sk-container-id-1 div.sk-label-container {text-align: center;
}/* Estimator-specific */
#sk-container-id-1 div.sk-estimator {font-family: monospace;border: 1px dotted var(--sklearn-color-border-box);border-radius: 0.25em;box-sizing: border-box;margin-bottom: 0.5em;/* unfitted */background-color: var(--sklearn-color-unfitted-level-0);
}#sk-container-id-1 div.sk-estimator.fitted {/* fitted */background-color: var(--sklearn-color-fitted-level-0);
}/* on hover */
#sk-container-id-1 div.sk-estimator:hover {/* unfitted */background-color: var(--sklearn-color-unfitted-level-2);
}#sk-container-id-1 div.sk-estimator.fitted:hover {/* fitted */background-color: var(--sklearn-color-fitted-level-2);
}/* Specification for estimator info (e.g. "i" and "?") *//* Common style for "i" and "?" */.sk-estimator-doc-link,
a:link.sk-estimator-doc-link,
a:visited.sk-estimator-doc-link {float: right;font-size: smaller;line-height: 1em;font-family: monospace;background-color: var(--sklearn-color-background);border-radius: 1em;height: 1em;width: 1em;text-decoration: none !important;margin-left: 0.5em;text-align: center;/* unfitted */border: var(--sklearn-color-unfitted-level-1) 1pt solid;color: var(--sklearn-color-unfitted-level-1);
}.sk-estimator-doc-link.fitted,
a:link.sk-estimator-doc-link.fitted,
a:visited.sk-estimator-doc-link.fitted {/* fitted */border: var(--sklearn-color-fitted-level-1) 1pt solid;color: var(--sklearn-color-fitted-level-1);
}/* On hover */
div.sk-estimator:hover .sk-estimator-doc-link:hover,
.sk-estimator-doc-link:hover,
div.sk-label-container:hover .sk-estimator-doc-link:hover,
.sk-estimator-doc-link:hover {/* unfitted */background-color: var(--sklearn-color-unfitted-level-3);color: var(--sklearn-color-background);text-decoration: none;
}div.sk-estimator.fitted:hover .sk-estimator-doc-link.fitted:hover,
.sk-estimator-doc-link.fitted:hover,
div.sk-label-container:hover .sk-estimator-doc-link.fitted:hover,
.sk-estimator-doc-link.fitted:hover {/* fitted */background-color: var(--sklearn-color-fitted-level-3);color: var(--sklearn-color-background);text-decoration: none;
}/* Span, style for the box shown on hovering the info icon */
.sk-estimator-doc-link span {display: none;z-index: 9999;position: relative;font-weight: normal;right: .2ex;padding: .5ex;margin: .5ex;width: min-content;min-width: 20ex;max-width: 50ex;color: var(--sklearn-color-text);box-shadow: 2pt 2pt 4pt #999;/* unfitted */background: var(--sklearn-color-unfitted-level-0);border: .5pt solid var(--sklearn-color-unfitted-level-3);
}.sk-estimator-doc-link.fitted span {/* fitted */background: var(--sklearn-color-fitted-level-0);border: var(--sklearn-color-fitted-level-3);
}.sk-estimator-doc-link:hover span {display: block;
}/* "?"-specific style due to the `<a>` HTML tag */#sk-container-id-1 a.estimator_doc_link {float: right;font-size: 1rem;line-height: 1em;font-family: monospace;background-color: var(--sklearn-color-background);border-radius: 1rem;height: 1rem;width: 1rem;text-decoration: none;/* unfitted */color: var(--sklearn-color-unfitted-level-1);border: var(--sklearn-color-unfitted-level-1) 1pt solid;
}#sk-container-id-1 a.estimator_doc_link.fitted {/* fitted */border: var(--sklearn-color-fitted-level-1) 1pt solid;color: var(--sklearn-color-fitted-level-1);
}/* On hover */
#sk-container-id-1 a.estimator_doc_link:hover {/* unfitted */background-color: var(--sklearn-color-unfitted-level-3);color: var(--sklearn-color-background);text-decoration: none;
}#sk-container-id-1 a.estimator_doc_link.fitted:hover {/* fitted */background-color: var(--sklearn-color-fitted-level-3);
}
</style><div id="sk-container-id-1" class="sk-top-container" style="overflow: auto;"><div class="sk-text-repr-fallback"><pre>Pipeline(steps=[(&#x27;columntransformer&#x27;,ColumnTransformer(transformers=[(&#x27;pipeline-1&#x27;,Pipeline(steps=[(&#x27;simpleimputer&#x27;,SimpleImputer()),(&#x27;standardscaler&#x27;,StandardScaler())]),[&#x27;Course_Avg_Roll_1y&#x27;,&#x27;Course_Min_Last_3y&#x27;,&#x27;Course_Max_Last_3y&#x27;,&#x27;Course_Std_Last_3y&#x27;]),(&#x27;pipeline-2&#x27;,Pipeline(steps=[(&#x27;simpleimputer&#x27;,SimpleImputer(strategy=&#x27;most_frequent&#x27;)),(&#x27;on...OrdinalEncoder(handle_unknown=&#x27;use_encoded_value&#x27;,unknown_value=-1))]),[&#x27;CourseLevel&#x27;,&#x27;Years_Since_Start&#x27;,&#x27;Prof_Courses_Taught&#x27;,&#x27;Year&#x27;]),(&#x27;drop&#x27;, &#x27;drop&#x27;,[&#x27;Reported&#x27;, &#x27;Section&#x27;,&#x27;Detail&#x27;, &#x27;Median&#x27;,&#x27;Percentile (25)&#x27;,&#x27;Percentile (75)&#x27;, &#x27;High&#x27;,&#x27;Low&#x27;, &#x27;&lt;50&#x27;, &#x27;50-54&#x27;,&#x27;55-59&#x27;, &#x27;60-63&#x27;, &#x27;64-67&#x27;,&#x27;68-71&#x27;, &#x27;72-75&#x27;, &#x27;76-79&#x27;,&#x27;80-84&#x27;, &#x27;85-89&#x27;,&#x27;90-100&#x27;])])),(&#x27;ridge&#x27;, Ridge(alpha=2.091, random_state=42))])</pre><b>In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. <br />On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.</b></div><div class="sk-container" hidden><div class="sk-item sk-dashed-wrapped"><div class="sk-label-container"><div class="sk-label fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-1" type="checkbox" ><label for="sk-estimator-id-1" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>Pipeline</div></div><div><a class="sk-estimator-doc-link fitted" rel="noreferrer" target="_blank" href="https://scikit-learn.org/1.6/modules/generated/sklearn.pipeline.Pipeline.html">?<span>Documentation for Pipeline</span></a><span class="sk-estimator-doc-link fitted">i<span>Fitted</span></span></div></label><div class="sk-toggleable__content fitted"><pre>Pipeline(steps=[(&#x27;columntransformer&#x27;,ColumnTransformer(transformers=[(&#x27;pipeline-1&#x27;,Pipeline(steps=[(&#x27;simpleimputer&#x27;,SimpleImputer()),(&#x27;standardscaler&#x27;,StandardScaler())]),[&#x27;Course_Avg_Roll_1y&#x27;,&#x27;Course_Min_Last_3y&#x27;,&#x27;Course_Max_Last_3y&#x27;,&#x27;Course_Std_Last_3y&#x27;]),(&#x27;pipeline-2&#x27;,Pipeline(steps=[(&#x27;simpleimputer&#x27;,SimpleImputer(strategy=&#x27;most_frequent&#x27;)),(&#x27;on...OrdinalEncoder(handle_unknown=&#x27;use_encoded_value&#x27;,unknown_value=-1))]),[&#x27;CourseLevel&#x27;,&#x27;Years_Since_Start&#x27;,&#x27;Prof_Courses_Taught&#x27;,&#x27;Year&#x27;]),(&#x27;drop&#x27;, &#x27;drop&#x27;,[&#x27;Reported&#x27;, &#x27;Section&#x27;,&#x27;Detail&#x27;, &#x27;Median&#x27;,&#x27;Percentile (25)&#x27;,&#x27;Percentile (75)&#x27;, &#x27;High&#x27;,&#x27;Low&#x27;, &#x27;&lt;50&#x27;, &#x27;50-54&#x27;,&#x27;55-59&#x27;, &#x27;60-63&#x27;, &#x27;64-67&#x27;,&#x27;68-71&#x27;, &#x27;72-75&#x27;, &#x27;76-79&#x27;,&#x27;80-84&#x27;, &#x27;85-89&#x27;,&#x27;90-100&#x27;])])),(&#x27;ridge&#x27;, Ridge(alpha=2.091, random_state=42))])</pre></div> </div></div><div class="sk-serial"><div class="sk-item sk-dashed-wrapped"><div class="sk-label-container"><div class="sk-label fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-2" type="checkbox" ><label for="sk-estimator-id-2" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>columntransformer: ColumnTransformer</div></div><div><a class="sk-estimator-doc-link fitted" rel="noreferrer" target="_blank" href="https://scikit-learn.org/1.6/modules/generated/sklearn.compose.ColumnTransformer.html">?<span>Documentation for columntransformer: ColumnTransformer</span></a></div></label><div class="sk-toggleable__content fitted"><pre>ColumnTransformer(transformers=[(&#x27;pipeline-1&#x27;,Pipeline(steps=[(&#x27;simpleimputer&#x27;,SimpleImputer()),(&#x27;standardscaler&#x27;,StandardScaler())]),[&#x27;Course_Avg_Roll_1y&#x27;, &#x27;Course_Min_Last_3y&#x27;,&#x27;Course_Max_Last_3y&#x27;, &#x27;Course_Std_Last_3y&#x27;]),(&#x27;pipeline-2&#x27;,Pipeline(steps=[(&#x27;simpleimputer&#x27;,SimpleImputer(strategy=&#x27;most_frequent&#x27;)),(&#x27;onehotencoder&#x27;,OneHotEncoder(drop=&#x27;if_b...SimpleImputer(strategy=&#x27;most_frequent&#x27;)),(&#x27;ordinalencoder&#x27;,OrdinalEncoder(handle_unknown=&#x27;use_encoded_value&#x27;,unknown_value=-1))]),[&#x27;CourseLevel&#x27;, &#x27;Years_Since_Start&#x27;,&#x27;Prof_Courses_Taught&#x27;, &#x27;Year&#x27;]),(&#x27;drop&#x27;, &#x27;drop&#x27;,[&#x27;Reported&#x27;, &#x27;Section&#x27;, &#x27;Detail&#x27;, &#x27;Median&#x27;,&#x27;Percentile (25)&#x27;, &#x27;Percentile (75)&#x27;, &#x27;High&#x27;,&#x27;Low&#x27;, &#x27;&lt;50&#x27;, &#x27;50-54&#x27;, &#x27;55-59&#x27;, &#x27;60-63&#x27;,&#x27;64-67&#x27;, &#x27;68-71&#x27;, &#x27;72-75&#x27;, &#x27;76-79&#x27;, &#x27;80-84&#x27;,&#x27;85-89&#x27;, &#x27;90-100&#x27;])])</pre></div> </div></div><div class="sk-parallel"><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-3" type="checkbox" ><label for="sk-estimator-id-3" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>pipeline-1</div></div></label><div class="sk-toggleable__content fitted"><pre>[&#x27;Course_Avg_Roll_1y&#x27;, &#x27;Course_Min_Last_3y&#x27;, &#x27;Course_Max_Last_3y&#x27;, &#x27;Course_Std_Last_3y&#x27;]</pre></div> </div></div><div class="sk-serial"><div class="sk-item"><div class="sk-serial"><div class="sk-item"><div class="sk-estimator fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-4" type="checkbox" ><label for="sk-estimator-id-4" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>SimpleImputer</div></div><div><a class="sk-estimator-doc-link fitted" rel="noreferrer" target="_blank" href="https://scikit-learn.org/1.6/modules/generated/sklearn.impute.SimpleImputer.html">?<span>Documentation for SimpleImputer</span></a></div></label><div class="sk-toggleable__content fitted"><pre>SimpleImputer()</pre></div> </div></div><div class="sk-item"><div class="sk-estimator fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-5" type="checkbox" ><label for="sk-estimator-id-5" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>StandardScaler</div></div><div><a class="sk-estimator-doc-link fitted" rel="noreferrer" target="_blank" href="https://scikit-learn.org/1.6/modules/generated/sklearn.preprocessing.StandardScaler.html">?<span>Documentation for StandardScaler</span></a></div></label><div class="sk-toggleable__content fitted"><pre>StandardScaler()</pre></div> </div></div></div></div></div></div></div><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-6" type="checkbox" ><label for="sk-estimator-id-6" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>pipeline-2</div></div></label><div class="sk-toggleable__content fitted"><pre>[&#x27;Campus&#x27;, &#x27;Session&#x27;, &#x27;SubjectCourse&#x27;, &#x27;Professor&#x27;, &#x27;Subject&#x27;]</pre></div> </div></div><div class="sk-serial"><div class="sk-item"><div class="sk-serial"><div class="sk-item"><div class="sk-estimator fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-7" type="checkbox" ><label for="sk-estimator-id-7" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>SimpleImputer</div></div><div><a class="sk-estimator-doc-link fitted" rel="noreferrer" target="_blank" href="https://scikit-learn.org/1.6/modules/generated/sklearn.impute.SimpleImputer.html">?<span>Documentation for SimpleImputer</span></a></div></label><div class="sk-toggleable__content fitted"><pre>SimpleImputer(strategy=&#x27;most_frequent&#x27;)</pre></div> </div></div><div class="sk-item"><div class="sk-estimator fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-8" type="checkbox" ><label for="sk-estimator-id-8" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>OneHotEncoder</div></div><div><a class="sk-estimator-doc-link fitted" rel="noreferrer" target="_blank" href="https://scikit-learn.org/1.6/modules/generated/sklearn.preprocessing.OneHotEncoder.html">?<span>Documentation for OneHotEncoder</span></a></div></label><div class="sk-toggleable__content fitted"><pre>OneHotEncoder(drop=&#x27;if_binary&#x27;, handle_unknown=&#x27;ignore&#x27;)</pre></div> </div></div></div></div></div></div></div><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-9" type="checkbox" ><label for="sk-estimator-id-9" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>pipeline-3</div></div></label><div class="sk-toggleable__content fitted"><pre>[&#x27;CourseLevel&#x27;, &#x27;Years_Since_Start&#x27;, &#x27;Prof_Courses_Taught&#x27;, &#x27;Year&#x27;]</pre></div> </div></div><div class="sk-serial"><div class="sk-item"><div class="sk-serial"><div class="sk-item"><div class="sk-estimator fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-10" type="checkbox" ><label for="sk-estimator-id-10" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>SimpleImputer</div></div><div><a class="sk-estimator-doc-link fitted" rel="noreferrer" target="_blank" href="https://scikit-learn.org/1.6/modules/generated/sklearn.impute.SimpleImputer.html">?<span>Documentation for SimpleImputer</span></a></div></label><div class="sk-toggleable__content fitted"><pre>SimpleImputer(strategy=&#x27;most_frequent&#x27;)</pre></div> </div></div><div class="sk-item"><div class="sk-estimator fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-11" type="checkbox" ><label for="sk-estimator-id-11" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>OrdinalEncoder</div></div><div><a class="sk-estimator-doc-link fitted" rel="noreferrer" target="_blank" href="https://scikit-learn.org/1.6/modules/generated/sklearn.preprocessing.OrdinalEncoder.html">?<span>Documentation for OrdinalEncoder</span></a></div></label><div class="sk-toggleable__content fitted"><pre>OrdinalEncoder(handle_unknown=&#x27;use_encoded_value&#x27;, unknown_value=-1)</pre></div> </div></div></div></div></div></div></div><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-12" type="checkbox" ><label for="sk-estimator-id-12" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>drop</div></div></label><div class="sk-toggleable__content fitted"><pre>[&#x27;Reported&#x27;, &#x27;Section&#x27;, &#x27;Detail&#x27;, &#x27;Median&#x27;, &#x27;Percentile (25)&#x27;, &#x27;Percentile (75)&#x27;, &#x27;High&#x27;, &#x27;Low&#x27;, &#x27;&lt;50&#x27;, &#x27;50-54&#x27;, &#x27;55-59&#x27;, &#x27;60-63&#x27;, &#x27;64-67&#x27;, &#x27;68-71&#x27;, &#x27;72-75&#x27;, &#x27;76-79&#x27;, &#x27;80-84&#x27;, &#x27;85-89&#x27;, &#x27;90-100&#x27;]</pre></div> </div></div><div class="sk-serial"><div class="sk-item"><div class="sk-estimator fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-13" type="checkbox" ><label for="sk-estimator-id-13" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>drop</div></div></label><div class="sk-toggleable__content fitted"><pre>drop</pre></div> </div></div></div></div></div></div></div><div class="sk-item"><div class="sk-estimator fitted sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-14" type="checkbox" ><label for="sk-estimator-id-14" class="sk-toggleable__label fitted sk-toggleable__label-arrow"><div><div>Ridge</div></div><div><a class="sk-estimator-doc-link fitted" rel="noreferrer" target="_blank" href="https://scikit-learn.org/1.6/modules/generated/sklearn.linear_model.Ridge.html">?<span>Documentation for Ridge</span></a></div></label><div class="sk-toggleable__content fitted"><pre>Ridge(alpha=2.091, random_state=42)</pre></div> </div></div></div></div></div></div>

## Evaluation Results

[More Information Needed]

# How to Get Started with the Model

[More Information Needed]

# Model Card Authors

This model card is written by following authors:

[More Information Needed]

# Model Card Contact

You can contact the model card authors through following channels:
[More Information Needed]

# Citation

Below you can find information related to citation.

**BibTeX:**
```
[More Information Needed]
```
