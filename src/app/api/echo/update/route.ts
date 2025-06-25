import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { EchoModel } from "@/models/echo.model";
import { getAuthSession, unauthorized } from "@/lib/session-utils";
import { BaseResponse } from "@/types";
import redis from "@/lib/redis";

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

    const { title, description, isAcceptingFeedback } = await request.json();

    if (!title) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Title Field is required" },
        { status: 400 }
      );
    }

    // Find and Update echo
    const updatedEcho = await EchoModel.findOneAndUpdate(
      { _id: echoId, owner: session.userId },
      { title, description: description || "", isAcceptingFeedback },
      { new: true, runValidators: true }
    );

    if (!updatedEcho) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Echo updation failed" },
        { status: 400 }
      );
    }

    // Clear Cache
    await redis.del(`echos:${session.userId}`);

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "Echo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update echo:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to update echo" },
      { status: 500 }
    );
  }
}
