import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { FeedbackModel } from "@/models/feedback.model";
import { EchoModel } from "@/models/echo.model";
import { getAuthSession, unauthorized } from "@/lib/session-utils";

export async function GET(request: NextRequest) {
  await connectDB();

  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const echoPublicId = searchParams.get("echoPublicId");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 15);

    // Find Echo by public-Id
    const echo = await EchoModel.findOne({
      publicId: echoPublicId,
      owner: session.userId,
    });

    // Check authorization
    if (!echo) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "You are unauthorized",
        },
        { status: 403 }
      );
    }

    // Match Stage
    const matchStage = {
      echoId: echo._id,
    };

    // Aggregate Query
    const feedbackAggregateQuery = FeedbackModel.aggregate([
      {
        $match: matchStage,
      },
      {
        $project: {
          _id: 0,
          category: 1,
          message: 1,
          createdAt: 1,
        },
      },
    ]);

    // Paginate Options
    const options = {
      page,
      limit,
    };

    // Paginated Response
    const paginatedFeedback = await FeedbackModel.aggregatePaginate(
      feedbackAggregateQuery,
      options
    );

    // Validate Page Number
    if (paginatedFeedback.page! > paginatedFeedback.totalPages) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Invalid Page Selection" },
        { status: 404 }
      );
    }

    // Final Response
    return NextResponse.json<FeedbackResponse>(
      {
        success: true,
        message: "Feedbacks fetched successfully",
        data: paginatedFeedback,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to GET feedbacks:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to GET feedbacks" },
      { status: 500 }
    );
  }
}
