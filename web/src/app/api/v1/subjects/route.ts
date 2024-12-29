import logger from "@/utils/logger";
import { neon } from "@neondatabase/serverless";
import { type NextRequest, NextResponse } from "next/server";
import { SubjectsQuerySchema } from "@/lib/schema";
import { APIError } from "@/lib/api-error";
import { validateEnv } from "@/utils/env";

validateEnv();

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    const validationResult = SubjectsQuerySchema.safeParse(query);
    if (!validationResult.success) {
      logger.error(
        { error: validationResult.error, query },
        "Invalid query parameters",
      );
      throw new APIError(
        400,
        "Invalid query parameters",
        "VALIDATION_ERROR",
        validationResult.error.errors,
      );
    }

    try {
      const subjects = await sql`
        SELECT id, subject_code 
        FROM subjects 
        ORDER BY subject_code ASC
      `;

      logger.info({}, "Successfully fetched subjects");
      return NextResponse.json(subjects);
    } catch (dbError) {
      logger.error(
        { error: dbError, message: "Database query failed" },
        "Failed to fetch subjects",
      );
      throw new APIError(503, "Database operation failed", "DATABASE_ERROR");
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

    logger.error(
      { error, message: "Unexpected error occurred" },
      "Failed to fetch subjects",
    );
    throw new APIError(
      500,
      "Failed to fetch subjects. Please try again later.",
      "INTERNAL_SERVER_ERROR",
    );
  }
}
