import mongoose, { Types } from "mongoose";
import connectDB from "../db/db";

export async function createUserProfile(
  userId: Types.ObjectId | string
): Promise<void> {
  await connectDB();

  const Profiles = mongoose.connection.collection("profiles");

  const now = new Date();

  await Profiles.insertOne({
    userId: new Types.ObjectId(userId),
    plan: "FREE",
    summaryCredits: 2,
    createdAt: now,
    updatedAt: now,
  });
}
