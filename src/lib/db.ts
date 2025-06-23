import mongoose from "mongoose";

const cached =
  global.mongoose ?? (global.mongoose = { connection: null, promise: null });

async function connectDB(): Promise<void> {
  try {
    if (cached.connection) return;

    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGO_URI as string, {
        dbName: "ghostpovdb",
      });
    }

    cached.connection = await cached.promise;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Failed:", error);
    process.exit(1);
  }
}

export default connectDB;
