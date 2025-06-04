import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/models/user.model";
import { sendVerificationEmail } from "@/helpers/email";
import { genVerificationCode } from "@/lib/utils";

export async function POST(request: NextRequest) {
  dbConnect();
  try {
    // Extract email from the request body
    const { email } = await request.json();

    // Generate New Code and Expiry
    const { code, codeExpiry } = genVerificationCode();

    // Update User with New Code and Expiry
    await UserModel.findOneAndUpdate(
      { email },
      { $set: { verification: { code, codeExpiry } } },
      { new: true, runValidators: true }
    );

    // Send Verification Email
    const emailResponse = await sendVerificationEmail(email, code);

    if (!emailResponse.success) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "New Code Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("User Verify Code Error:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "User Verify Code Error" },
      { status: 500 }
    );
  }
}
