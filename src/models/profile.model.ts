import mongoose, { Schema, Document, Types } from "mongoose";

enum Plan {
  FREE = "FREE",
}

interface ProfileDocument extends Document {
  userId: Types.ObjectId;
  plan: Plan;
  credits: number;
  maxTokenLimit: number;
}

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  plan: {
    type: String,
    enum: Object.values(Plan),
    default: Plan.FREE,
  },
  credits: {
    type: Number,
    default: 10,
  },
  maxTokenLimit: {
    type: Number,
    default: 10000,
  },
});

export const ProfileModel =
  (mongoose.models.Profile as mongoose.Model<ProfileDocument>) ||
  mongoose.model<ProfileDocument>("Profile", profileSchema);
