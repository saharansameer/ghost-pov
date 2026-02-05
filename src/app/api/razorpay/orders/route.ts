import razorpay from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import { OrderModel } from "@/models/order.model";
import { getAuthUser, unauthorized, getAuthSession } from "@/lib/auth/session";
import { BaseResponse, OrderResponse, RazorpayOrderVariant } from "@/types";

// POST
export async function POST(request: NextRequest) {
  await connectDB();

  // Check Auth
  const user = await getAuthUser(request.headers);
  if (!user) {
    return unauthorized();
  }

  try {
    // Extract order variant
    const { variant }: { variant: RazorpayOrderVariant } = await request.json();

    if (!variant) {
      return NextResponse.json(
        { success: false, message: "Invalid Amount" },
        { status: 400 }
      );
    }

    // Create Razorpay Order
    const order = await razorpay.orders.create({
      amount: Number(variant) * 100,
      currency: "INR",
      receipt: `receipt-${Date.now()}`,
      notes: {
        variant,
      },
    });

    // Store Order Details in database
    await OrderModel.create({
      userId: user.id,
      orderId: order.id,
      orderDate: order.created_at,
      amount: Number(order.amount),
      status: "pending",
      variant,
    });

    // Final Response
    return NextResponse.json<OrderResponse>(
      {
        success: true,
        message: "Order Created",
        data: {
          orderId: order.id,
          amount: Number(order.amount),
          currency: order.currency,
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          user: {
            name: user.name,
            email: user.email,
          },
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Unexpected Razorpay Order Error" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  await connectDB();

  // Check Auth
  const session = await getAuthSession(request.headers);
  if (!session) {
    return unauthorized();
  }

  try {
    // Extract orderId from search params
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get("orderId");

    // Delete Order from database
    await OrderModel.deleteOne({ userId: session.userId, orderId });

    // Send Response
    return NextResponse.json<BaseResponse>(
      { success: true, message: "Order Deleted" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to Delete Order" },
      { status: 500 }
    );
  }
}
