export const env = {
  MONGO_URI: String(process.env.MONGO_URI),
  RESEND_API_KEY: String(process.env.RESEND_API_KEY),
  REDIS_USERNAME: String(process.env.REDIS_USERNAME),
  REDIS_PASSWORD: String(process.env.REDIS_PASSWORD),
  REDIS_HOST: String(process.env.REDIS_HOST),
  REDIS_PORT: Number(process.env.REDIS_PORT),
};
