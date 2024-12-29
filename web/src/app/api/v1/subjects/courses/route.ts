import logger from "@/utils/logger";
import { neon } from "@neondatabase/serverless";
import { type NextRequest, NextResponse } from "next/server";
import { CoursesQuerySchema } from "@/lib/schema";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(DATABASE_URL!);

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

    if (!/^[A-Z]{2,4}$/.test(subject)) {
      return NextResponse.json(
        { error: "Invalid subject format" },
        { status: 400 },
      );
    }

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
        setTimeout(() => reject(new Error("Query timeout")), 5000),
      ),
    ]);

    const headers = new Headers();
    headers.set("Cache-Control", "public, max-age=300"); // maybe cahce for 5 minutes?

    logger.info({ courses, subject }, "Successfully fetched courses");
    return NextResponse.json(courses, { headers });
  } catch (error: any) {
    if (error.message === "Query timeout") {
      return NextResponse.json(
        { error: "Database query timed out. Please try again." },
        { status: 408 },
      );
    }

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
