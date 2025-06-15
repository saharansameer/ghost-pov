import mongoose, { Schema, Document, AggregatePaginateModel } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface EchoDocument extends Document {
  publicId: string;
  title: string;
  description: string;
  owner: Schema.Types.ObjectId;
  isAcceptingFeedback: boolean;
}

const echoSchema = new Schema({
  publicId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    match: [/[a-zA-Z0-9]/, "Title can not be empty"],
    maxlength: [100, "Title must not exceed 100 characters"],
  },
  description: {
    type: String,
    default: "",
    maxlength: [2000, "Description must not exceed 2000 characters"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  isAcceptingFeedback: {
    type: Boolean,
    default: true,
  },
});

echoSchema.plugin(mongooseAggregatePaginate);

export const EchoModel =
  (mongoose.models.Echo as mongoose.Model<EchoDocument>) ||
  mongoose.model<EchoDocument, AggregatePaginateModel<EchoDocument>>(
    "Echo",
    echoSchema
  );
