import { BaseResponse } from "@/types/server";

export type RazorpayOrderAmount = 24900 | 49900;

export type RazorpayOrderVariant = "249" | "499";

export type RazorpayOrderStatus = "pending" | "completed";

export interface OrderResponse extends BaseResponse {
  data: {
    orderId: string;
    amount: RazorpayOrderAmount;
    currency: string;
    key: string;
    user: {
      name: string;
      email: string;
    };
  };
}
