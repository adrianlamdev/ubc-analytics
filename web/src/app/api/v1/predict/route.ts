import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { subject, course, year } = body;

  // TODO: add validation
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/predict`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, course, year }),
    },
  );

  if (!response.ok) {
    return NextResponse.error();
  }

  const data = await response.json();

  console.log(data);

  return NextResponse.json(data);
}
