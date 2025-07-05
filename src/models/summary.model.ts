import mongoose, { Schema, Types, Document } from "mongoose";

interface SummaryDocument extends Document {
  content: string;
  echoId: Types.ObjectId;
  echoOwner: Types.ObjectId;
}

const summarySchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    echoId: {
      type: Types.ObjectId,
      ref: "echos",
      required: true,
    },
    echoOwner: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

export const SummaryModel =
  (mongoose.models.Summary as mongoose.Model<SummaryDocument>) ||
  mongoose.model<SummaryDocument>("Summary", summarySchema);
