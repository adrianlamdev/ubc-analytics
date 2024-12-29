import logger from "@/utils/logger";
import { neon } from "@neondatabase/serverless";
import { type NextRequest, NextResponse } from "next/server";
import { CoursesQuerySchema } from "@/lib/schema";
import { APIError } from "@/lib/api-error";
import { validateEnv } from "@/utils/env";

validateEnv();

const sql = neon(process.env.DATABASE_URL!);
const QUERY_TIMEOUT_MS = 5000;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = {
      subject: searchParams.get("subject"),
    };

    const validationResult = CoursesQuerySchema.safeParse(query);
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

    const { subject } = validationResult.data;

    if (!/^[A-Z]{2,4}$/.test(subject)) {
      throw new APIError(
        400,
        "Invalid subject format",
        "INVALID_SUBJECT_FORMAT",
      );
    }

    try {
      const courses = await Promise.race([
        sql`
          SELECT c.id, c.course_number, c.title
          FROM courses c
          JOIN subjects s ON c.subject_id = s.id
          WHERE s.subject_code = ${subject}
          ORDER BY c.course_number ASC
          LIMIT 100
        `,
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Query timeout")),
            QUERY_TIMEOUT_MS,
          ),
        ),
      ]);

      const headers = new Headers();
      headers.set("Cache-Control", "public, max-age=300");

      logger.info({ courses, subject }, "Successfully fetched courses");
      return NextResponse.json(courses, { headers });
    } catch (dbError: any) {
      if (dbError.message === "Query timeout") {
        throw new APIError(
          408,
          "Database query timed out. Please try again.",
          "QUERY_TIMEOUT",
        );
      }

      logger.error(
        { error: dbError, message: "Database query failed" },
        "Failed to fetch courses",
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
      "Failed to fetch courses",
    );

    throw new APIError(
      500,
      "Failed to fetch courses. Please try again later.",
      "INTERNAL_SERVER_ERROR",
    );
  }
}
