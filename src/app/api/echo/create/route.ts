import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { EchoModel } from "@/models/echo.model";
import { nanoid } from "nanoid";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import redis from "@/lib/db/redis";
import { BaseResponse } from "@/types";
import { trimAndClean } from "@/lib/utils";

export async function POST(request: NextRequest) {
  await connectDB();

  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    // Extract title, description and owner from Request body
    const { title, description } = await request.json();
    const trimmedTitle = trimAndClean(title || " ");

    // Check if all fields exist
    if (!trimmedTitle) {
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
      owner: session.userId,
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

    // Clear Dashboard Cache
    await redis.del(`echos:${session.userId}:1`);

    // Final Response
    return NextResponse.json(
      {
        success: true,
        message: "Echo Created",
        data: { echoId: echo._id },
      },
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
