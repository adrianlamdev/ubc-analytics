import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // TODO: probably add redis caching here

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
