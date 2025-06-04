import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/models/user.model";

export async function POST(request: NextRequest) {
  dbConnect();
  try {
    // Extract email and verification code from the request body
    const { email, verificationCode } = await request.json();

    // Find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "User does not exist",
        },
        { status: 404 }
      );
    }

    // Check if user is already verified
    if (user.isVerified) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "User is already verified",
        },
        { status: 400 }
      );
    }

    // Verification
    if (
      user.verification.code === verificationCode &&
      user.verification.codeExpiry > new Date()
    ) {
      user.isVerified = true;
      await user.save();

      return NextResponse.json<BaseResponse>(
        {
          success: true,
          message: "User verified successfully",
        },
        { status: 200 }
      );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Invalid Code" },
      { status: 400 }
    );
  } catch (error) {
    console.error("User Verification Error:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "User Verification Error" },
      { status: 500 }
    );
  }
}
