import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_URI as string);

export default mongoClient;
