import { NextRequest, NextResponse } from "next/server";
import { Session } from "better-auth";
import { rateLimiter } from "@/lib/rate-limit";

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];
const protectedRoutes = ["/dashboard", "/account", "/buy-credits"];
const rateLimitExcludedRoutes = ["/api/auth", "/api/razorpay/webhook"];

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Get IP
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown-ip";

  // Apply Rate Limiting
  const excludedFromRateLimit = rateLimitExcludedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (!excludedFromRateLimit) {
    const { success } = await rateLimiter.limit(ip);
    if (!success) {
      return NextResponse.redirect(
        new URL("/rate-limit-exceeded", request.url)
      );
    }
  }

  // Identify Route Type
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check Auth Session
  const session: Session = await fetch(`${origin}/api/auth/get-session`, {
    headers: request.headers,
  }).then((res) => res.json());

  // Redirect logged-in users away from auth routes
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|api/razorpay/webhook|_next/static|_next/image|favicon.ico|public|robots.txt|sitemap.xml).*)",
  ],
};
