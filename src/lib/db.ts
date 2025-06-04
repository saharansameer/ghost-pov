import mongoose from "mongoose";
import { env } from "@/config/env.server";

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(env.MONGO_URI, {
      dbName: "ghostpovdb",
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Failed:", err);
    process.exit(1);
  }
}

export default connectDB;
