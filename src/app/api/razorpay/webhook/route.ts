import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { OrderModel } from "@/models/order.model";
import { ProfileModel } from "@/models/profile.model";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { BaseResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    // Extract raw body, and signature
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature")!;

    // Validate Webhook
    const isValid = validateWebhookSignature(
      body,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET!
    );

    if (!isValid) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Invalid Webhook" },
        { status: 400 }
      );
    }

    // Parse raw body to JSON
    const event = JSON.parse(body);

    await connectDB();

    // Handle Webhook Events
    switch (event.event) {
      // If Payment Success
      case "payment.captured":
        const payment = event.payload.payment.entity;

        // Update order's payment status
        const updatedOrder = await OrderModel.findOneAndUpdate(
          { orderId: payment.order_id },
          {
            status: "completed",
          },
          { new: true }
        );

        if (!updatedOrder) {
          return NextResponse.json<BaseResponse>(
            { success: false, message: "Failed to update order details" },
            { status: 400 }
          );
        }

        // Add credits to user profile
        const credits = updatedOrder.variant === "499" ? 50 : 20;
        await ProfileModel.findOneAndUpdate(
          { userId: updatedOrder.userId },
          { $inc: { credits: credits } },
          { new: true }
        );
        break;

      // If Payment Failed
      case "payment.failed":
        return NextResponse.json<BaseResponse>(
          { success: false, message: "Payment Failed" },
          { status: 400 }
        );

      // If Undefined Event Occrus
      default:
        return NextResponse.json<BaseResponse>(
          { success: false, message: "Unknown Event Occured" },
          { status: 400 }
        );
    }

    // Final Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "Payment Successfull" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Unexpected Razorpay Webhook Error" },
      { status: 500 }
    );
  }
}
