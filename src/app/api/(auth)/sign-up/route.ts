import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ProfileModel } from "@/models/profile.model";
import { getRandomUsername, getRandomAvatar } from "@/lib/ghost";
import { authClient } from "@/lib/auth-client";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    // Extract email and password from the request body
    const { email, password } = await request.json();

    // Register user with Better Auth
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: email.split("@")[0],
    });

    // Handler Error
    if (error) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: error.message as string },
        { status: 400 }
      );
    }

    // Generate Username and Avatar
    const username = getRandomUsername();
    const avatar = getRandomAvatar();

    // Create custom user profile
    await ProfileModel.create({
      betterAuthUserId: data.user.id,
      username,
      avatar,
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
