import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { EchoModel } from "@/models/echo.model";

type Params = {
  params: {
    echoPublicId: string;
  };
};

export async function GET(request: NextRequest, { params }: Params) {
  await connectDB();
  try {
    // Extract echoPublicId from params
    const { echoPublicId } = params;

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

    // Final Response
    return NextResponse.json<EchoResponse>(
      { success: true, message: "Echo fetched successfully", data: echo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to GET Echo:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to GET Echo" },
      { status: 500 }
    );
  }
}
