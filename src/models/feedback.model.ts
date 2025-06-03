import mongoose, { Schema, Document, AggregatePaginateModel } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface FeedbackDocument extends Document {
  message: string;
  ip: string;
}

const feedbackSchema = new Schema({
  message: {
    type: String,
    required: [true, "Feedback message can not be empty"],
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
