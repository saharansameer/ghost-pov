import { NextRequest, NextResponse } from "next/server";
import { Session } from "better-auth";

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];
const protectedRoutes = ["/dashboard", "/account", "/buy-credits"];

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const session: Session = await fetch(`${origin}/api/auth/get-session`, {
    headers: request.headers,
  }).then((res) => res.json());

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/buy-credits",
  ],
};
