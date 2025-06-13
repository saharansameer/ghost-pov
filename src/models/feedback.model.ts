import mongoose, { Schema, Document, AggregatePaginateModel } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

enum FeedbackCategory {
  GENERAL = "GENERAL-FEEDBACK",
  FEATURE = "FEATURE-REQUEST",
  BUG = "BUG-REPORT",
  ERROR = "ERROR-REPORT",
}

export interface FeedbackDocument extends Document {
  category: FeedbackCategory;
  message: string;
  ip: string;
}

const feedbackSchema = new Schema({
  category: {
    type: String,
    enum: Object.values(FeedbackCategory),
    required: true,
    default: FeedbackCategory.GENERAL,
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
});

feedbackSchema.plugin(mongooseAggregatePaginate);

export const FeedbackModel =
  (mongoose.models.Feedback as mongoose.Model<FeedbackDocument>) ||
  mongoose.model<FeedbackDocument, AggregatePaginateModel<FeedbackDocument>>(
    "Feedback",
    feedbackSchema
  );
