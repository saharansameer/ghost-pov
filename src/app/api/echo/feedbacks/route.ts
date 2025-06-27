import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { FeedbackModel, FeedbackAggregate } from "@/models/feedback.model";
import { EchoModel } from "@/models/echo.model";
import { AggregatePaginateResult } from "mongoose";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import redis from "@/lib/db/redis";
import { BaseResponse, FeedbackResponse } from "@/types";

export async function GET(request: NextRequest) {
  await connectDB();

  // Re-check auth
  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    // Extract query parameters from url
    const searchParams = request.nextUrl.searchParams;
    const echoId = searchParams.get("echoId");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 15);

    // Check cached storage
    const cache = await redis.get(`feedbacks:${echoId}:${page}`);
    if (cache) {
      return NextResponse.json<FeedbackResponse>(
        {
          success: true,
          message: "Feedbacks fetched from redis cache",
          data: cache as AggregatePaginateResult<FeedbackAggregate>,
        },
        { status: 200 }
      );
    }

    // Find Echo by public-Id
    const echo = await EchoModel.findOne({
      _id: echoId,
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

    // Aggregate Query
    const feedbackAggregateQuery = FeedbackModel.aggregate([
      {
        $match: {
          echoId: echo._id,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 1,
          category: 1,
          feedbackMessage: 1,
          flagged: 1,
          createdAt: 1,
        },
      },
    ]);

    // Paginated Result
    const paginatedFeedback = await FeedbackModel.aggregatePaginate(
      feedbackAggregateQuery,
      {
        page,
        limit,
      }
    );

    // Validate Page Number
    if (paginatedFeedback.page! > paginatedFeedback.totalPages) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Invalid Page Selection" },
        { status: 404 }
      );
    }

    // Cache Feedbacks
    await redis.setex(
      `feedbacks:${echoId}:${page}`,
      60,
      JSON.stringify(paginatedFeedback)
    );

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
