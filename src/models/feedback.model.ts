import mongoose, { Schema, Document, AggregatePaginateModel } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export enum FeedbackCategories {
  GENERAL = "General",
  FEATURE = "Feature Request",
  BUG = "Bug Report",
  ERROR = "Error Report",
}

export interface FeedbackDocument extends Document {
  category: FeedbackCategories;
  message: string;
  echoId: Schema.Types.ObjectId;
  ip: string;
  flagged: boolean;
}

const feedbackSchema = new Schema(
  {
    category: {
      type: String,
      enum: Object.values(FeedbackCategories),
      required: true,
      default: FeedbackCategories.GENERAL,
    },
    message: {
      type: String,
      required: [true, "Feedback message is required"],
      minLength: [1, "Feedback message can not be empty"],
      maxlength: [2000, "Feedback message must not exceed 2000 characters"],
    },
    echoId: {
      type: Schema.Types.ObjectId,
      ref: "Echo",
    },
    ip: {
      type: String,
      required: [true, "IP is required"],
    },
    flagged: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

feedbackSchema.plugin(mongooseAggregatePaginate);

export type FeedbackAggregate = AggregatePaginateModel<FeedbackDocument>;

export const FeedbackModel =
  (mongoose.models.Feedback as FeedbackAggregate) ||
  mongoose.model<FeedbackDocument, FeedbackAggregate>(
    "Feedback",
    feedbackSchema
  );
