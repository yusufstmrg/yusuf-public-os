import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;
const auth =
  baseUrl && cookieSecret
    ? createNeonAuth({
        baseUrl,
        cookies: { secret: cookieSecret, sessionDataTtl: 300 },
      })
    : null;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/os")) return NextResponse.next();

  if (!auth) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    url.searchParams.set("callbackUrl", pathname);
    url.searchParams.set("reason", "auth_setup");
    return NextResponse.redirect(url);
  }

  return auth.middleware({ loginUrl: "/auth/sign-in" })(request);
}

export const config = {
  matcher: ["/os/:path*"],
};
