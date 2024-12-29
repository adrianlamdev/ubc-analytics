import logger from "@/utils/logger";
import { neon } from "@neondatabase/serverless";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(DATABASE_URL!);

// TODO: move to shared schema.ts file
const CoursesQuerySchema = z.object({
  subject: z.string().min(1, "Subject parameter is required"),
});

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
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    const { subject } = validationResult.data;

    const courses = await sql`
      SELECT c.id, c.course_number, c.title
      FROM courses c
      JOIN subjects s ON c.subject_id = s.id
      WHERE s.subject_code = ${subject}
      ORDER BY c.course_number ASC
    `;

    logger.info({ courses, subject }, "Successfully fetched courses");

    return NextResponse.json(courses);
  } catch (error) {
    logger.error(
      { error, message: "Database query failed" },
      "Failed to fetch courses",
    );
    return NextResponse.json(
      { error: "Failed to fetch courses. Please try again later." },
      { status: 500 },
    );
  }
}
