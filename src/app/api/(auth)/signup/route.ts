import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { getRandomGhostTag, getRandomGhostAvatar } from "@/lib/ghost";
import { genVerificationCode } from "@/lib/utils";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    // Extract email and password from the request body
    const { email, password } = await request.json();

    // Check if a User with the given email already exists
    const userExist = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (userExist) {
      if (userExist.isVerified) {
        return NextResponse.json<BaseResponse>(
          { success: false, message: "Email already in use" },
          { status: 400 }
        );
      }
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Email verification is pending" },
        { status: 409 }
      );
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Ghost Tag and Avatar
    const ghostTag = getRandomGhostTag();
    const ghostAvatar = getRandomGhostAvatar();

    // Verification Code and Expiry
    const { code, codeExpiry } = genVerificationCode();

    // Create and Save new user to the database
    await UserModel.create({
      email,
      password: hashedPassword,
      ghostTag,
      ghostAvatar,
      verification: {
        code,
        codeExpiry,
      },
    });

    // Final Response
    return NextResponse.json<BaseResponse>(
      {
        success: true,
        message: "Account created successfully. Please verify your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json<BaseResponse>(
      {
        success: false,
        message: "Failed to create new account",
      },
      { status: 500 }
    );
  }
}
