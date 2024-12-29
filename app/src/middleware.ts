import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	// TODO: probably add redis caching here
	const response = NextResponse.next();

	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

	return response;
}

export const config = {
	matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
