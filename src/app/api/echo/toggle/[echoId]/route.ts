import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { EchoModel } from "@/models/echo.model";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { RequestParams, BaseResponse } from "@/types";
import { deleteByPrefix } from "@/lib/db/redis";

export async function PATCH(request: NextRequest, { params }: RequestParams) {
  await connectDB();

  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    // Extract echo id form params
    const { echoId } = await params;

    // Find echo and toggle 'isAcceptingFeedback'
    const toggle = await EchoModel.findOneAndUpdate(
      { _id: echoId, owner: session.userId },
      [
        {
          $set: {
            isAcceptingFeedback: { $not: "$isAcceptingFeedback" },
          },
        },
      ],
      { new: true }
    );

    if (!toggle) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Echo Toggle Failed" },
        { status: 400 }
      );
    }

    // Clear cache
    await deleteByPrefix(`echos:${session.userId}`);
    await deleteByPrefix(`feedbacks:${echoId}`)

    // Final Response
    return NextResponse.json(
      { success: true, message: "Echo Toggled" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to toggle echo" },
      { status: 500 }
    );
  }
}
