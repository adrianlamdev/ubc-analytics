import logger from "@/utils/logger";
import { neon } from "@neondatabase/serverless";
import { type NextRequest, NextResponse } from "next/server";
import { SubjectsQuerySchema } from "@/lib/schema";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(DATABASE_URL);

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
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    const subjects = await sql`
      SELECT id, subject_code 
      FROM subjects 
      ORDER BY subject_code ASC
    `;

    logger.info({}, "Successfully fetched subjects");

    return NextResponse.json(subjects);
  } catch (error) {
    logger.error(
      { error, message: "Database query failed" },
      "Failed to fetch subjects",
    );
    return NextResponse.json(
      { error: "Failed to fetch subjects. Please try again later." },
      { status: 500 },
    );
  }
}
