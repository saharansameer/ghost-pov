import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { FeedbackModel } from "@/models/feedback.model";
import { BaseResponse, RequestParams } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { deleteByPrefix } from "@/lib/db/redis";

export async function PATCH(request: NextRequest, { params }: RequestParams) {
  await connectDB();

  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }
  try {
    // Extract feedback id form params
    const { feedbackId } = await params;

    // Toggle feedback flagged field
    const toggle = await FeedbackModel.findByIdAndUpdate(
      feedbackId,
      [
        {
          $set: {
            flagged: { $not: "$flagged" },
          },
        },
      ],
      { new: true }
    );

    if (!toggle) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Failed to toggle spam" },
        { status: 400 }
      );
    }

    // Clear cache
    await deleteByPrefix(`feedbacks:${toggle.echoId}`);

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "Toggle Success" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Toggle Spam Failed" },
      { status: 500 }
    );
  }
}
