import { z } from "zod/v4";
import {
  emailValidator,
  passwordValidator,
  passwordValidatorLite,
} from "@/zod/validators";

// Signup Schema
export const signupSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export type SignupSchemaType = z.input<typeof signupSchema>;

// Signin Schema
export const signinSchema = z.object({
  email: emailValidator,
  password: passwordValidatorLite,
});

export type SigninSchemaType = z.input<typeof signinSchema>;
