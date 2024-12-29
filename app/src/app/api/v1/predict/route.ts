import { type NextRequest, NextResponse } from "next/server";
import logger from "@/utils/logger";
import { PredictionRequestSchema } from "@/lib/schema";
import { validateEnv } from "@/utils/env";
import { APIError } from "@/lib/api-error";

validateEnv();

export async function POST(req: NextRequest) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	try {
		const body = await req.json();
		const validationResult = PredictionRequestSchema.safeParse(body);

		if (!validationResult.success) {
			logger.error(
				{ error: validationResult.error, body },
				"Invalid request body",
			);
			throw new APIError(
				400,
				"Invalid request body",
				"VALIDATION_ERROR",
				validationResult.error.errors,
			);
		}

		const { subject, course, year } = validationResult.data;

		const response = await fetch(`${apiUrl}/api/v1/predict`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ subject, course, year }),
		});

		if (!response.ok) {
			const error = await response.json();
			logger.error({ error }, "Prediction API request failed");

			const statusCode = response.status === 404 ? 404 : 502;
			throw new APIError(
				statusCode,
				"Failed to fetch prediction",
				"PREDICTION_API_ERROR",
				error.details,
			);
		}

		const data = await response.json();
		logger.info({ data }, "Successfully fetched prediction");
		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof APIError) {
			return NextResponse.json(
				{
					error: error.message,
					code: error.code,
					...(error.statusCode === 400 ? { details: error.details } : {}),
				},
				{ status: error.statusCode },
			);
		}

		logger.error({ error }, "Unexpected error in POST /api/v1/predict");

		throw new APIError(
			500,
			"An unexpected error occurred. Please try again later.",
			"INTERNAL_SERVER_ERROR",
		);
	}
}
