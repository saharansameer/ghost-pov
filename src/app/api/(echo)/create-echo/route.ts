import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { EchoModel } from "@/models/echo.model";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";
import { User } from "better-auth";

export async function POST(request: NextRequest) {
  connectDB();

  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Please Sign-in and try again" },
      { status: 401 }
    );
  }

  try {
    // Get user from session
    const user = session.user as User;

    // Extract title, description and owner from Request body
    const { title, description } = await request.json();

    // Check if all fields exist
    if (!title) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    // Create and Save new echo
    const echo = await EchoModel.create({
      publicId: nanoid(6),
      title,
      description: description || "",
      owner: user.id,
    });

    if (!echo) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "Failed to create Echo",
        },
        { status: 400 }
      );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "Echo created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create Echo:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to create echo" },
      { status: 500 }
    );
  }
}
