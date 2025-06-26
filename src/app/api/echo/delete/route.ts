import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { EchoModel } from "@/models/echo.model";
import { getAuthSession, unauthorized } from "@/lib/session-utils";
import { BaseResponse } from "@/types";
import redis from "@/lib/redis";

export async function DELETE(request: NextRequest) {
  await connectDB();

  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    // Extract echo id from search params
    const searchParams = request.nextUrl.searchParams;
    const echoId = searchParams.get("echoId");

    // Find and Delete echo
    const deleteEcho = await EchoModel.findOneAndDelete({
      _id: echoId,
      owner: session.userId,
    });

    if (!deleteEcho) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "Echo does not exist",
        },
        {
          status: 404,
        }
      );
    }

    // Clear Cache
    await redis.del(`echos:${session.userId}`);

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Echo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete echo:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to delete echo" },
      { status: 500 }
    );
  }
}
