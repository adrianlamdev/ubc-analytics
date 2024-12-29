import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import logger from "@/utils/logger";

// TODO: move to shared schema.ts file
const PredictionRequestSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  course: z.string().min(1, "Course is required"),
  year: z.string().min(1, "Year is required"),
});

export async function POST(req: NextRequest) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL environment variable is not set");
    }

    const body = await req.json();
    const validationResult = PredictionRequestSchema.safeParse(body);

    if (!validationResult.success) {
      logger.error(
        { error: validationResult.error, body },
        "Invalid request body",
      );
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    const { subject, course, year } = validationResult.data;

    const response = await fetch(`${API_URL}/api/v1/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, course, year }),
    });

    if (!response.ok) {
      const error = await response.json();
      logger.error({ error }, "Prediction API request failed");
      return NextResponse.json(
        { error: "Failed to fetch prediction" },
        { status: response.status },
      );
    }

    const data = await response.json();
    logger.info({ data }, "Successfully fetched prediction");

    return NextResponse.json(data);
  } catch (error) {
    logger.error({ error }, "Unexpected error in POST /api/v1/predict");
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
