import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { FeedbackModel } from "@/models/feedback.model";
import { EchoModel } from "@/models/echo.model";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import redis from "@/lib/db/redis";
import { BaseResponse, FeedbackResponse } from "@/types";
import { Types } from "mongoose";

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
    const filter = searchParams.get("filter");
    const filterOptions: Record<
      "general" | "feature" | "bug" | "error",
      string
    > = {
      general: "General",
      feature: "Feature Request",
      bug: "Bug Report",
      error: "Error Report",
    };

    const filterBy = filter as keyof typeof filterOptions | null;

    // Check cached storage
    const cacheKey = filter
      ? `feedbacks:${echoId}:${filter}:${page}`
      : `feedbacks:${echoId}:${page}`;
    const cache: FeedbackResponse | null = await redis.get(cacheKey);
    if (cache) {
      return NextResponse.json<FeedbackResponse>(
        {
          success: true,
          message: "Feedbacks fetched from redis cache",
          data: cache.data,
          echo: cache.echo,
        },
        { status: 200 }
      );
    }

    // Find Echo by public-Id
    const echoAggregate = await EchoModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(String(echoId)),
          owner: new Types.ObjectId(session.userId),
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "owner",
          foreignField: "userId",
          as: "owner",
          pipeline: [
            {
              $project: {
                _id: 0,
                plan: 1,
                credits: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "summaries",
          localField: "_id",
          foreignField: "echoId",
          as: "summaries",
          pipeline: [
            {
              $project: {
                _id: 1,
                createdAt: 1,
                content: 1,
              },
            },
            {
              $sort: { createdAt: -1 },
            },
          ],
        },
      },
      {
        $addFields: {
          owner: {
            $first: "$owner",
          },
          hasSummaries: { $gt: [{ $size: "$summaries" }, 0] },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          owner: 1,
          summaries: 1,
          hasSummaries: 1,
        },
      },
    ]);

    // Check authorization
    if (echoAggregate.length === 0) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "You are unauthorized",
        },
        { status: 403 }
      );
    }

    // Extract echo from aggreate
    const echo = echoAggregate[0];

    const echoDetails = {
      _id: echo._id,
      title: echo.title,
      description: echo.description,
      owner: echo.owner,
      summaries: echo.summaries,
      hasSummaries: echo.hasSummaries,
    };

    // Feedback Aggregate Logic
    const matchStage: {
      echoId: Types.ObjectId | string;
      category?: string;
      flagged?: boolean;
    } = {
      echoId: new Types.ObjectId(echo._id as string),
      flagged: false,
    };

    if (filterBy) {
      if (filter === "spam") {
        matchStage.flagged = true;
      } else {
        matchStage.category = filterOptions[filterBy];
        matchStage.flagged = false;
      }
    }

    // Aggregate Query
    const feedbackAggregateQuery = FeedbackModel.aggregate([
      {
        $match: matchStage,
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
      cacheKey,
      60,
      JSON.stringify({
        data: paginatedFeedback,
        echo: echoDetails,
      })
    );

    // Final Response
    return NextResponse.json<FeedbackResponse>(
      {
        success: true,
        message: "Feedbacks fetched successfully",
        data: paginatedFeedback,
        echo: echoDetails,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Feedbacks are unavailable" },
      { status: 500 }
    );
  }
}
