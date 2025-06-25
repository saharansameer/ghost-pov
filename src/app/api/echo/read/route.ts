import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { EchoModel } from "@/models/echo.model";
import { getAuthSession, unauthorized } from "@/lib/session-utils";
import { BaseResponse, EchoResponse } from "@/types";

export async function GET(request: NextRequest) {
  await connectDB();

  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }
  try {
    // Extract echo id from search params
    const searchParams = request.nextUrl.searchParams;
    const echoId = searchParams.get("echoId");

    // Find echo by id and check it's existence
    const echo = await EchoModel.findById(echoId)
    
    if (!echo) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Echo does not exist anymore" },
        { status: 404 }
      );
    }

    // Final Response
    return NextResponse.json<EchoResponse>(
      { success: true, message: "Fetched Echo Details", data: echo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch echo by id:", error);
  }
}
