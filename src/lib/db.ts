import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function connectDB(): Promise<void> {
  if (connection.isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "ghostpovdb",
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Failed:", err);
    process.exit(1);
  }
}

export default connectDB;
