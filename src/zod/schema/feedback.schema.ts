import { z } from "zod/v4";

export const feedbackSchema = z.object({
  message: z
    .string()
    .min(1, { error: "Feedback message can not be empty" })
    .max(1000, { error: "Feedback message must be at most 1000 characters" }),
});

export type FeedbackSchemaType = z.input<typeof feedbackSchema>;
