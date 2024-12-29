import { z } from "zod";

// Schema for querying subjects (currently empty)
export const SubjectsQuerySchema = z.object({});

// Schema for prediction requests
export const PredictionRequestSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  course: z.string().min(1, "Course is required"),
  year: z.string().min(1, "Year is required"),
});

export const GpaBoostersQuerySchema = z.object({
  limit: z.string(),
  minEnrollment: z.number().min(1, "Minimum enrollment must be at least 1"),
  maxYearLevel: z.string(),
  includeSubjects: z.string().optional(),
  excludeSubjects: z.string().optional(),
  minHistoricalAvg: z
    .number()
    .min(0, "Minimum average must be at least 0")
    .max(100, "Maximum average cannot exceed 100"),
});

export const CoursesQuerySchema = z.object({
  subject: z.string().min(1, "Subject parameter is required"),
});

export default {
  SubjectsQuerySchema,
  PredictionRequestSchema,
  GpaBoostersQuerySchema,
  CoursesQuerySchema,
};
