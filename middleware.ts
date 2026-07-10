import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIMARY_HOST = "guptasajal.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host === PRIMARY_HOST || host === "localhost:3000") {
    return NextResponse.next();
  }

  if (host.endsWith(".vercel.app")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = PRIMARY_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};




