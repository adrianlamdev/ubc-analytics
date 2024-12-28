import logger from "@/utils/logger";
import { neon } from "@neondatabase/serverless";
import { type NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
	try {
		const subjects = await sql`
      SELECT id, subject_code 
      FROM subjects 
      ORDER BY subject_code ASC
    `;

		logger.info({ subjects }, "Successfully fetched subjects");
		return NextResponse.json(subjects);
	} catch (error) {
		logger.error({ error }, "Database query failed");
		return NextResponse.json(
			{ error: "Failed to fetch subjects" },
			{ status: 500 },
		);
	}
}
