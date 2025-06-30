import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { EchoModel } from "@/models/echo.model";
import { BaseResponse, RequestParams, EchoResponse } from "@/types";
import redis from "@/lib/db/redis";

export async function GET(request: NextRequest, { params }: RequestParams) {
  await connectDB();
  try {
    // Extract echoPublicId from params
    const { echoPublicId } = await params;

    // Check cached storage
    const cacheKey = `echo:${echoPublicId}`;
    const cache: EchoResponse | null  = await redis.get(cacheKey);
    if (cache) {
      return NextResponse.json(
        {
          success: true,
          message: "Echo fetched from redis cache",
          data: cache,
        },
        { status: 200 }
      );
    }

    // Find echo with publicId
    const echo = await EchoModel.findOne({
      publicId: echoPublicId,
      isAcceptingFeedback: true,
    }).select("-_id -__v");

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

    // Cache echo
    await redis.setex(cacheKey, 60, JSON.stringify(echo));

    // Final Response
    return NextResponse.json<EchoResponse>(
      { success: true, message: "Echo fetched successfully", data: echo },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Echo is unavailable" },
      { status: 500 }
    );
  }
}
