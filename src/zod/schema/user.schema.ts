import { z } from "zod/v4";
import { emailValidator, passwordValidator } from "@/zod/validators";

export const emailSchema = z.object({
  email: emailValidator,
});

export type EmailSchemaType = z.input<typeof emailSchema>;

export const passwordSchema = z
  .object({
    newPassword: passwordValidator,
    confirmNewPassword: passwordValidator,
  })
  .refine((val) => val.newPassword === val.confirmNewPassword, {
    error: "Password do not match",
    path: ["confirmNewPassword"],
  });

export type PasswordSchemaType = z.input<typeof passwordSchema>;
