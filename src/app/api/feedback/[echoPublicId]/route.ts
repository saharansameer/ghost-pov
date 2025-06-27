import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { FeedbackModel } from "@/models/feedback.model";
import { EchoModel } from "@/models/echo.model";
import { getClientInfo } from "@/lib/utils";
import { filterFeedbackMessage } from "@/lib/filter";
import { BaseResponse, RequestParams } from "@/types";

export async function POST(request: NextRequest, { params }: RequestParams) {
  await connectDB();
  const ip = getClientInfo(request);
  try {
    // Extract data from request body
    const { echoPublicId } = await params;
    const { category, message } = await request.json();

    // Verify all fields exist
    if (!category || message.trim() === "") {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "All Fields are required" },
        { status: 400 }
      );
    }

    // Find echo with publicId
    const echoAggregate = await EchoModel.aggregate([
      {
        $match: {
          publicId: echoPublicId,
          isAcceptingFeedback: true,
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "owner",
          foreignField: "betterAuthUserId",
          as: "echoOwner",
          pipeline: [
            {
              $project: {
                _id: 0,
                plan: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          allowFilter: {
            $cond: {
              if: {
                $or: [
                  { $eq: [{ $arrayElemAt: ["$echoOwner.plan", 0] }, "FREE"] },
                  { $eq: [{ $size: "$echoOwner" }, 0] },
                ],
              },
              then: false,
              else: true,
            },
          },
        },
      },
    ]);
    
    // Check if echo exist and accepting feedback
    if (echoAggregate.length === 0) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "Echo is no longer accepting feedback",
        },
        { status: 400 }
      );
    }

    // Extract echo object from aggregate array
    const echo = echoAggregate[0];

    // Filter Abuse and Spam (Only for Paid Users)
    let flagged = false;
    if (echo.allowFilter) {
      const filter = await filterFeedbackMessage(message);
      if (filter.success) {
        flagged = filter.flagged;
      } else {
        flagged = true;
      }
    }

    // Save Feedback message in DB
    const feedback = await FeedbackModel.create({
      category,
      message,
      echoId: echo._id,
      ip,
      flagged,
    });

    if (!feedback) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "Failed to save feedback message",
        },
        { status: 400 }
      );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      {
        success: true,
        message: "Feedback message saved successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Send Feedback Failed:", error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Send Feedback Failed" },
      { status: 500 }
    );
  }
}
