import { z } from "zod/v4";

export const echoSchema = z.object({
  title: z
    .string()
    .min(1, { error: "Title can not be empty" })
    .max(100, { error: "Title must not exceed 100 characters" }),
  description: z
    .string()
    .max(2000, { error: "Description must not exceed 2000 characters" })
    .optional()
    .or(z.literal("")),
});

export type EchoSchemaType = z.input<typeof echoSchema>;
