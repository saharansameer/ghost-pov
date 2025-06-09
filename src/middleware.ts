import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth";

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
