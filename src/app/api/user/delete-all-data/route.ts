import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { EchoModel } from "@/models/echo.model";
import { FeedbackModel } from "@/models/feedback.model";

export async function GET(request: NextRequest) {
  await connectDB();

  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    // Delete Echos and Feedbacks related to user
    const deleteEchos = await EchoModel.deleteMany({ owner: session.userId });
    const deleteFeedbacks = await FeedbackModel.deleteMany({
      echoOwner: session.userId,
    });

    if (!deleteEchos || !deleteFeedbacks) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Failed to Delete Echos and Feedbacks" },
        { status: 400 }
      );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "User Data Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete user data:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to Delete User Data" },
      { status: 500 }
    );
  }
}
