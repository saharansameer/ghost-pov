import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { SummaryModel } from "@/models/summary.model";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { RequestParams, SummaryResponse } from "@/types";

export async function GET(request: NextRequest, { params }: RequestParams) {
  await connectDB();

  // Check auth
  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    const { summaryId } = await params;

    // Find summary
    const summary = await SummaryModel.findOne({
      _id: summaryId,
      echoOwner: session.userId,
    });

    if (!summary) {
      return NextResponse.json(
        { success: false, message: "Summary does not exist" },
        { status: 404 }
      );
    }

    // Final Response
    return NextResponse.json<SummaryResponse>(
      { success: true, message: "Summary Fetched", content: summary.content },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch summary" },
      { status: 500 }
    );
  }
}
