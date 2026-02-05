import { BaseResponse } from "@/types/server";

export type RazorpayOrderAmount = 24900 | 49900; // currently not used anywhere

export type RazorpayOrderVariant = "249" | "499";

export type RazorpayOrderStatus = "pending" | "completed";

export interface OrderResponse extends BaseResponse {
  data: {
    orderId: string;
    amount: number;
    currency: string;
    key: string;
    user: {
      name: string;
      email: string;
    };
  };
}
