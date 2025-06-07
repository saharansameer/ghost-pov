import { z } from "zod/v4";

export const emailValidator = z.email({ error: "Email is invalid" });

export const signupPasswordValidator = z
  .string()
  .min(8, { error: "Password must be at least 8 characters" })
  .max(128, { error: "Password must not exceed 128 characters" });

export const passwordValidator = z
  .string()
  .min(8, { error: "Incorrect Password" })
  .max(128, { error: "Incorrect Password" });
