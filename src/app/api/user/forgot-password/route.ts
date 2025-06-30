import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { BaseResponse } from "@/types";
import mongoose from "mongoose";
import { getAuthProvider } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { email } = await request.json();

    // Check if user exist with the given email
    const Users = mongoose.connection.collection("user");

    const user = await Users.findOne(
      { email },
      { projection: { _id: 1, email: 1 } }
    );

    if (!user) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "No user exist with this email" },
        { status: 404 }
      );
    }

    // Check if user is registered using credentials i.e email and password
    const provider = await getAuthProvider(user._id);

    if (provider !== "credential") {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "This email is registered using social signin",
        },
        { status: 400 }
      );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "Password Reset is possible" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to check email" },
      { status: 500 }
    );
  }
}
