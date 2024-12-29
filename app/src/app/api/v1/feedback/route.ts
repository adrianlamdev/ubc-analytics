import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import logger from "@/utils/logger";

// TODO: move to shared schema.ts file
const feedbackSchema = z.object({
  feedback: z.string().min(1, "Feedback is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationResult = feedbackSchema.safeParse(body);
    if (!validationResult.success) {
      logger.error(
        { error: validationResult.error, body },
        "Invalid request body",
      );
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: validationResult.error.errors,
        },
        { status: 400 },
      );
    }
    const { feedback } = validationResult.data;
    // TODO: Implement feedback submission
  } catch (error) {
    logger.error({ error }, "Unexpected error in POST /api/v1/feedback");
    return NextResponse.json(
      { error: "Failed to submit feedback. Please try again later." },
      { status: 500 },
    );
  }
}
