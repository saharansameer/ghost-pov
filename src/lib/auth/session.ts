import { auth } from "@/lib/auth/auth";
import { Session, User } from "better-auth";
import { NextResponse } from "next/server";
import { BaseResponse, AuthProvider } from "@/types";
import mongoose, { Types } from "mongoose";
import connectDB from "@/lib/db/db";

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

export async function getAuthProvider(
  userId: string | Types.ObjectId
): Promise<AuthProvider | null> {
  await connectDB();

  const Accounts = mongoose.connection.collection("account");

  const userAccount = await Accounts.findOne(
    {
      userId: new Types.ObjectId(userId),
    },
    { projection: { _id: 0, providerId: 1 } }
  );

  if (!userAccount) return null;

  return userAccount.providerId;
}
