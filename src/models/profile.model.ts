import mongoose, { Schema, Document } from "mongoose";

enum Plan {
  FREE = "FREE",
  PLUS = "PLUS",
  PRO = "PRO"
}

interface ProfileDocument extends Document {
  userId: Schema.Types.ObjectId;
  plan: Plan;
  summaryCredits: number;
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
  summaryCredits: {
    type: Number,
    default: 2,
  },
});

export const ProfileModel =
  (mongoose.models.Profile as mongoose.Model<ProfileDocument>) ||
  mongoose.model<ProfileDocument>("Profile", profileSchema);
