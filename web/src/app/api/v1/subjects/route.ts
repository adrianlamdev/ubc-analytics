import { type NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    const subjects = await sql`
      SELECT id, subject_code 
      FROM subjects 
      ORDER BY subject_code ASC
    `;

    return NextResponse.json(subjects);
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 },
    );
  }
}
