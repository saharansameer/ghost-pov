import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "@/lib/redis";

const generalLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl:general",
  points: 5,
  duration: 60,
});

const feedbackLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl:feedback",
  points: 15,
  duration: 60,
});

const emailLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl:email",
  points: 1,
  duration: 600,
});

const rateLimiterType = {
  general: generalLimiter,
  feedback: feedbackLimiter,
  email: emailLimiter,
};

type RateLimiterType = keyof typeof rateLimiterType;

export async function applyRateLimit(uniqueKey: string, type: RateLimiterType) {
  const limiter = rateLimiterType[type];
  try {
    await limiter.consume(uniqueKey);
    return { success: true, message: "Rate Limit Check Passed" };
  } catch {
    return { success: false, message: "Too many requests, Please slow down" };
  }
}
