import mongoose, { Schema, Types, Document } from "mongoose";
import { RazorpayOrderVariant, RazorpayOrderStatus } from "@/types";

interface OrderDocument extends Document {
  userId: Types.ObjectId;
  orderId: string;
  orderDate: number;
  amount: number;
  status: RazorpayOrderStatus;
  variant: RazorpayOrderVariant;
}

const orderSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "user",
  },
  orderId: {
    type: String,
  },
  orderDate: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
  },
  variant: {
    type: String,
  },
});

export const OrderModel =
  (mongoose.models.Order as mongoose.Model<OrderDocument>) ||
  mongoose.model("Order", orderSchema);
