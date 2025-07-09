import mongoose, { Schema, Document } from "mongoose";

enum Plan {
  FREE = "FREE",
}

interface ProfileDocument extends Document {
  userId: Schema.Types.ObjectId;
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
    default: 2,
  },
  maxTokenLimit: {
    type: Number,
    default: 5000,
  },
});

export const ProfileModel =
  (mongoose.models.Profile as mongoose.Model<ProfileDocument>) ||
  mongoose.model<ProfileDocument>("Profile", profileSchema);
