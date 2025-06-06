import Redis from "ioredis";

const redisClient = new Redis({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

redisClient.on("connect", () => {
  console.log("Redis Client Connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis Client Connected and Ready");
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("close", () => {
  console.log("Redis Client Connection Closed");
});

export default redisClient;
