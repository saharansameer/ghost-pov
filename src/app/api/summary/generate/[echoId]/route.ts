import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { EchoModel } from "@/models/echo.model";
import { SummaryModel } from "@/models/summary.model";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { RequestParams, BaseResponse, SummaryResponse } from "@/types";
import { Types } from "mongoose";
import openai from "@/lib/ai/openai";
import { getPrompt } from "@/lib/ai/prompts";
import { generateText } from "ai";
import { ProfileModel } from "@/models/profile.model";
import { deleteByPrefix } from "@/lib/db/redis";

export async function POST(request: NextRequest, { params }: RequestParams) {
  await connectDB();

  // Check Auth
  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    const { echoId } = await params;

    // Echo Aggregation Pipeline
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
                userId: 1,
                plan: 1,
                credits: 1,
                maxTokenLimit: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "feedbacks",
          localField: "_id",
          foreignField: "echoId",
          as: "feedbacks",
          pipeline: [
            { $match: { flagged: false } },
            {
              $group: {
                _id: "$category",
                messages: { $push: "$feedbackMessage" },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          owner: {
            $first: "$owner",
          },
          hasFeedbacks: { $gt: [{ $size: "$feedbacks" }, 0] },
          feedbacks: {
            $arrayToObject: {
              $map: {
                input: "$feedbacks",
                as: "f",
                in: {
                  k: "$$f._id",
                  v: "$$f.messages",
                },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          owner: 1,
          feedbacks: 1,
          hasFeedbacks: 1,
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

    if (echo.credits <= 0) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "No Summary Credits Left" },
        { status: 400 }
      );
    }

    if (!echo.hasFeedbacks) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Echo has not sufficient feedbacks" },
        { status: 400 }
      );
    }

    // AI Summary Logic --> IMPORTANT <--

    // Format Feedback Messages
    const formattedFeedbacks = Object.entries(
      echo.feedbacks as Record<string, string[]>
    )
      .map(([category, messages]) => {
        const lines = messages
          .map((msg, index) => `${index}- ${msg}`)
          .join("\n");
        return `${category}:\n${lines}`;
      })
      .join("\n\n");

    // Create Prompt
    const prompt = getPrompt({
      title: echo.title,
      description: echo.description,
      feedbacks: formattedFeedbacks,
    });

    // Generate AI Summary & Insights
    const { text } = await generateText({
      model: openai("gpt-4.1-nano"),
      prompt,
      maxTokens: echo.owner.maxTokenLimit,
    });

    // Decrement summary credit
    await ProfileModel.findOneAndUpdate(
      { userId: session.userId },
      { $inc: { credits: -1 } }
    );

    // Store Summary in Database
    const summary = await SummaryModel.create({
      echoId: echo._id,
      echoOwner: echo.owner.userId,
      content: text,
    });

    if (!summary) {
      return NextResponse.json<BaseResponse>(
        {
          success: true,
          message: "Failed to save summary in Database",
        },
        { status: 400 }
      );
    }

    // Clear cache
    await deleteByPrefix(`feedbacks:${echo._id}`);

    // Final Response
    return NextResponse.json<SummaryResponse>({
      success: true,
      message: "Summary Generated and Stored",
      summaryId: summary._id as string,
    });
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Summary Generation Failed" },
      { status: 500 }
    );
  }
}
