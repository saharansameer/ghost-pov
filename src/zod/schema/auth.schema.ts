import { z } from "zod/v4";
import {
  emailValidator,
  signupPasswordValidator,
  passwordValidator,
} from "@/zod/validators";

// Signup Schema
export const signupSchema = z.object({
  email: emailValidator,
  password: signupPasswordValidator,
});

export type SignupSchemaType = z.input<typeof signupSchema>;

// Login Schema
export const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export type LoginSchemaType = z.input<typeof loginSchema>;
