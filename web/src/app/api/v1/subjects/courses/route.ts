import logger from "@/utils/logger";
import { neon } from "@neondatabase/serverless";
import { type NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const subject = searchParams.get("subject");

		if (!subject) {
			logger.error("Subject parameter is required");
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

		logger.info({ courses }, "Successfully fetched courses");
		return NextResponse.json(courses);
	} catch (error) {
		logger.error({ error }, "Database query failed");
		return NextResponse.json(
			{ error: "Failed to fetch courses" },
			{ status: 500 },
		);
	}
}
