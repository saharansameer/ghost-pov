import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { FeedbackModel } from "@/models/feedback.model";
import { EchoModel } from "@/models/echo.model";
import { filterFeedbackMessage } from "@/lib/filter";
import { BaseResponse, RequestParams } from "@/types";

export async function POST(request: NextRequest, { params }: RequestParams) {
  await connectDB();

  try {
    // Extract data from request body
    const { echoPublicId } = await params;
    const { category, feedbackMessage } = await request.json();

    // Verify all fields exist
    if (!category || feedbackMessage.trim() === "") {
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
      /*
      {
        $lookup: {
          from: "profiles",
          localField: "owner",
          foreignField: "userId",
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
      */
      {
        $addFields: {
          allowFilter: true,
          /* 
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
          */
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
      const filter = await filterFeedbackMessage(feedbackMessage);
      if (filter.success) {
        flagged = filter.flagged;
      } else {
        flagged = true;
      }
    }

    // Save Feedback message in DB
    const feedback = await FeedbackModel.create({
      category,
      feedbackMessage,
      echoId: echo._id,
      echoOwner: echo.owner,
      flagged,
    });

    if (!feedback) {
      return NextResponse.json<BaseResponse>(
        {
          success: false,
          message: "Feedback not saved",
        },
        { status: 400 }
      );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      {
        success: true,
        message: "Feedback Sent",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to send feedback" },
      { status: 500 }
    );
  }
}
