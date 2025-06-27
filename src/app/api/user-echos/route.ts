import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { EchoAggregate, EchoModel } from "@/models/echo.model";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { Types, AggregatePaginateResult } from "mongoose";
import redis from "@/lib/db/redis";
import { BaseResponse, EchoResponse } from "@/types";

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
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 15);

    // Check cached storage
    const cache = await redis.get(`echos:${session.userId}:${page}`);
    if (cache) {
      return NextResponse.json<EchoResponse>(
        {
          success: true,
          message: "Echos fetched from redis cache",
          data: cache as AggregatePaginateResult<EchoAggregate>,
        },
        { status: 200 }
      );
    }

    // Aggregate Query
    const echoAggregateQuery = EchoModel.aggregate([
      {
        $match: {
          owner: new Types.ObjectId(session.userId),
        },
      },
      {
        $lookup: {
          from: "feedbacks",
          localField: "_id",
          foreignField: "echoId",
          as: "feedbacks",
          pipeline: [
            {
              $project: {
                _id: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          feedbackCount: {
            $size: "$feedbacks",
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 1,
          publicId: 1,
          title: 1,
          description: 1,
          isAcceptingFeedback: 1,
          feedbackCount: 1,
          createdAt: 1,
        },
      },
    ]);

    // Paginated Result
    const paginatedEchos = await EchoModel.aggregatePaginate(
      echoAggregateQuery,
      { page, limit }
    );

    // Validate Page Number
    if (paginatedEchos.page! > paginatedEchos.totalPages) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Invalid Page Selection" },
        { status: 404 }
      );
    }

    // Cache echos
    await redis.setex(
      `echos:${session.userId}`,
      60,
      JSON.stringify(paginatedEchos)
    );

    // Final Response
    return NextResponse.json<EchoResponse>(
      {
        success: true,
        message: "Echos fetched successfully",
        data: paginatedEchos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to GET Echos:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to GET Echos" },
      { status: 500 }
    );
  }
}
