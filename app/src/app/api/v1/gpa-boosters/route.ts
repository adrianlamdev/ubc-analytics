import { GpaBoostersQuerySchema } from "@/lib/schema";
import logger from "@/utils/logger";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { APIError } from "@/lib/api-error";
import { validateEnv } from "@/utils/env";

validateEnv();

export async function GET(req: NextRequest) {
	try {
		const API_URL = process.env.NEXT_PUBLIC_API_URL!;
		const { searchParams } = new URL(req.url);

		try {
			const validatedParams = GpaBoostersQuerySchema.parse({
				limit: searchParams.get("limit") || "10",
				minEnrollment: Number(searchParams.get("min_enrollment")),
				maxYearLevel: searchParams.get("max_year_level") || "2",
				includeSubjects: searchParams.get("include_subjects") || "",
				excludeSubjects: searchParams.get("exclude_subjects") || "",
				minHistoricalAvg: Number(searchParams.get("min_historical_avg")),
			});

			const queryParams = new URLSearchParams({
				limit: validatedParams.limit.toString(),
				min_enrollment: validatedParams.minEnrollment.toString(),
				max_year_level: validatedParams.maxYearLevel.toString(),
				include_subjects: validatedParams.includeSubjects || "",
				exclude_subjects: validatedParams.excludeSubjects || "",
				min_historical_avg: validatedParams.minHistoricalAvg?.toString(),
			}).toString();

			const response = await fetch(
				`${API_URL}/api/v1/gpa-boosters?${queryParams}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({
					detail: "Failed to fetch GPA boosters",
				}));

				throw new APIError(
					response.status,
					errorData.detail || "Failed to fetch GPA boosters",
					"GPA_BOOSTERS_API_ERROR",
				);
			}

			const data = await response.json();
			logger.info({ data }, "Successfully fetched GPA boosters");
			return NextResponse.json(data);
		} catch (validationError) {
			if (validationError instanceof z.ZodError) {
				logger.error(
					{ error: validationError },
					"Invalid GPA boosters request parameters",
				);
				throw new APIError(
					400,
					"Invalid request parameters",
					"VALIDATION_ERROR",
					validationError.errors,
				);
			}
			throw validationError;
		}
	} catch (error) {
		if (error instanceof APIError) {
			return NextResponse.json(
				{
					error: error.message,
					code: error.code,
					details: error.details,
				},
				{ status: error.statusCode },
			);
		}

		logger.error({ error }, "Unexpected error in GPA boosters route");
		throw new APIError(500, "Internal server error", "INTERNAL_SERVER_ERROR");
	}
}
