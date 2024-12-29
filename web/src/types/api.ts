import { Course } from "./course";

export interface PredictionResponse {
  predicted_avg: number;
  request_details: {
    subject: string;
    course: string;
    campus: string;
    year: string;
    session: string;
  };
  historical_data: {
    year: string;
    average: number;
    predicted_avg: number;
    historical_predicted: number;
  }[];
  timing: {
    total_time: number;
  };
}

export interface CourseResponse {
  courses: Course[];
  timing: {
    total_time: number;
  };
  metadata: {
    total_courses_considered: number;
  };
}
