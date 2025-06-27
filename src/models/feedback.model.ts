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
    feedbackMessage: {
      type: String,
      required: [true, "Feedback message is required"],
      minLength: [1, "Feedback message can not be empty"],
      maxlength: [5000, "Feedback message must not exceed 5000 characters"],
    },
    echoId: {
      type: Schema.Types.ObjectId,
      ref: "Echo",
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
