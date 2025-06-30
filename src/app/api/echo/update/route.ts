import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { EchoModel } from "@/models/echo.model";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { BaseResponse } from "@/types";
import { deleteByPrefix } from "@/lib/db/redis";

export async function PATCH(request: NextRequest) {
  await connectDB();

  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }
  try {
    // Extract echo id from search params
    const searchParams = request.nextUrl.searchParams;
    const echoId = searchParams.get("echoId");

    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Title Field is required" },
        { status: 400 }
      );
    }

    // Find and Update echo
    const updatedEcho = await EchoModel.findOneAndUpdate(
      { _id: echoId, owner: session.userId },
      { title, description: description || "" },
      { new: true, runValidators: true }
    );

    if (!updatedEcho) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Failed to save changes" },
        { status: 400 }
      );
    }

    // Clear Cache
    await deleteByPrefix(`echos:${session.userId}`);

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "Changes Saved" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to save changes" },
      { status: 500 }
    );
  }
}
