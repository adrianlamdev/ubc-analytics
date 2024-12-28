import logger from "@/utils/logger";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// TODO: move to shared schema.ts file
const querySchema = z.object({
	limit: z.string().transform(Number),
	min_enrollment: z.string().transform(Number),
	max_year_level: z.string().transform(Number),
	include_subjects: z.string().optional(),
	exclude_subjects: z.string().optional(),
	min_historical_avg: z
		.string()
		.transform((val) => Number.parseFloat(val))
		.optional(),
});

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);

		// Parse and validate query parameters
		const validatedParams = querySchema.parse({
			limit: searchParams.get("limit") || "10",
			min_enrollment: searchParams.get("min_enrollment") || "50",
			max_year_level: searchParams.get("max_year_level") || "2",
			include_subjects: searchParams.get("include_subjects") || "",
			exclude_subjects: searchParams.get("exclude_subjects") || "",
			min_historical_avg: searchParams.get("min_historical_avg") || "80",
		});

		// Forward request to FastAPI backend
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/gpa-boosters?` +
				new URLSearchParams({
					limit: validatedParams.limit.toString(),
					min_enrollment: validatedParams.min_enrollment.toString(),
					max_year_level: validatedParams.max_year_level.toString(),
					include_subjects: validatedParams.include_subjects || "",
					exclude_subjects: validatedParams.exclude_subjects || "",
					min_historical_avg:
						validatedParams.min_historical_avg?.toString() || "80",
				}).toString(),
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
			return NextResponse.json(errorData, { status: response.status });
		}

		const data = await response.json();
		logger.info({ data }, "Successfully fetched GPA boosters");
		return NextResponse.json(data);
	} catch (error) {
		logger.error({ error }, "Error in GPA boosters route");
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ detail: "Invalid request parameters", errors: error.errors },
				{ status: 400 },
			);
		}
		return NextResponse.json(
			{ detail: "Internal server error" },
			{ status: 500 },
		);
	}
}
