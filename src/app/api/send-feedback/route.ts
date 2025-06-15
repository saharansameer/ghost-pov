import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { FeedbackModel } from "@/models/feedback.model";
import { EchoModel } from "@/models/echo.model";
import { getClientInfo } from "@/lib/utils";

export async function POST(request: NextRequest) {
  connectDB();
  const ip = getClientInfo(request);
  try {
    // Extract data from request body
    const { category, message, echoPublicId } = await request.json();

    // Verify all fields exist
    if (!category || message.trim() === "" || !echoPublicId) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "All Fields are required" },
        { status: 400 }
      );
    }

    // Find echo with publicId
    const echo = await EchoModel.findOne({
      publicId: echoPublicId,
      isAcceptingFeedback: true,
    });

    // Check if echo exist and accepting feedback
    if (!echo) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "Echo is no longer accepting feedback",
        },
        { status: 400 }
      );
    }

    // Save Feedback message in DB
    const feedback = await FeedbackModel.create({
      category,
      message,
      echoId: echo._id,
      ip,
    });

    if (!feedback) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "Failed to save feedback message",
        },
        { status: 400 }
      );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      {
        success: true,
        message: "Feedback message saved successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Send Feedback Failed:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Send Feedback Failed" },
      { status: 500 }
    );
  }
}
