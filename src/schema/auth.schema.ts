import { z } from "zod/v4";

// Signup Schema
export const signupSchema = z.object({
  email: z.email({ error: "Email is invalid" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .max(128, { error: "Password must not exceed 128 characters" }),
});

export type SignupSchemaType = z.input<typeof signupSchema>;

// Login Schema
export const loginSchema = signupSchema;

export type LoginSchemaType = z.input<typeof loginSchema>;
