import { Ratelimit } from "@upstash/ratelimit";
import redisClient from "@/lib/db/redis";

export const rateLimiter = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.fixedWindow(5, "10s"),
  analytics: false,
  prefix: "ratelimit",
});
