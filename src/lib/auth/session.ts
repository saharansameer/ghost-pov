import { auth } from "@/lib/auth/auth";
import { Session, User } from "better-auth";
import { NextResponse } from "next/server";
import { BaseResponse } from "@/types";

export async function getAuthSession(
  headers: Headers
): Promise<Session | null> {
  const authSession = await auth.api.getSession({
    headers,
  });

  if (!authSession) return null;

  return authSession.session as Session;
}

export function unauthorized() {
  return NextResponse.json<BaseResponse>(
    { success: false, message: "Please Sign-in and try again" },
    { status: 401 }
  );
}

export async function getAuthUser(headers: Headers): Promise<User | null> {
  const session = await auth.api.getSession({
    headers,
  });

  if (!session) return null;

  return session.user as User;
}
