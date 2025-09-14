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
    credits: 10,
    createdAt: now,
    updatedAt: now,
  });
}

export async function getAvailableCredits(
  userId: Types.ObjectId | string
): Promise<number | null> {
  await connectDB();

  const Profiles = mongoose.connection.collection("profiles");

  const userProfile = await Profiles.findOne(
    { userId: new Types.ObjectId(userId) },
    { projection: { _id: 0, credits: 1 } }
  );

  if (!userProfile) return null;

  return userProfile.credits;
}
