import mongoose, { Schema, Document } from "mongoose";

interface ProfileDocument extends Document {
  betterAuthUserId: Schema.Types.ObjectId;
  username: string;
  avatar: string;
}

const profileSchema = new Schema({
  betterAuthUserId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  username: {
    type: String,
    required: true,
    match: [/[a-zA-Z0-9]/, "Ghost Tag can not be empty"],
    minlength: [3, "Ghost Tag must be 3 characters long"],
    maxlength: [25, "Ghost Tag should not exceed 25 characters"],
  },
  avatar: {
    type: String,
    required: true,
  },
});

export const ProfileModel =
  (mongoose.models.Profile as mongoose.Model<ProfileDocument>) ||
  mongoose.model<ProfileDocument>("Profile", profileSchema);
