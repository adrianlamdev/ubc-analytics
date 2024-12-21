import { type NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const subject = searchParams.get("subject");

    if (!subject) {
      return NextResponse.json(
        { error: "Subject parameter is required" },
        { status: 400 },
      );
    }

    const courses = await sql`
      SELECT c.id, c.course_number, c.title
      FROM courses c
      JOIN subjects s ON c.subject_id = s.id
      WHERE s.subject_code = ${subject}
      ORDER BY c.course_number ASC
    `;

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}
