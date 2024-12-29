import { GpaBoostersQuerySchema } from "@/lib/schema";
import logger from "@/utils/logger";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL environment variable is not set");
    }

    const { searchParams } = new URL(req.url);

    const validatedParams = GpaBoostersQuerySchema.parse({
      limit: searchParams.get("limit") || "10",
      minEnrollment: Number(searchParams.get("min_enrollment")),
      maxYearLevel: searchParams.get("max_year_level") || "2",
      includeSubjects: searchParams.get("include_subjects") || "",
      excludeSubjects: searchParams.get("exclude_subjects") || "",
      minHistoricalAvg: Number(searchParams.get("min_historical_avg")),
    });

    const response = await fetch(
      `${API_URL}/api/v1/gpa-boosters?` +
        new URLSearchParams({
          limit: validatedParams.limit.toString(),
          min_enrollment: validatedParams.minEnrollment.toString(),
          max_year_level: validatedParams.maxYearLevel.toString(),
          include_subjects: validatedParams.includeSubjects || "",
          exclude_subjects: validatedParams.excludeSubjects || "",
          min_historical_avg: validatedParams.minHistoricalAvg?.toString(),
        }).toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        detail: "Failed to fetch GPA boosters",
      }));
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    logger.info({ data }, "Successfully fetched GPA boosters");
    return NextResponse.json(data);
  } catch (error) {
    logger.error({ error }, "Error in GPA boosters route");
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { detail: "Invalid request parameters", errors: error.errors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 },
    );
  }
}
