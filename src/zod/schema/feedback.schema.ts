import { z } from "zod/v4";

export const feedbackSchema = z.object({
  category: z.enum([
    "General",
    "Feature Request",
    "Bug Report",
    "Error Report",
  ]),
  feedbackMessage: z
    .string()
    .min(1, { error: "Feedback Message can not be empty" })
    .max(5000, { error: "Character limit exceeded" }),
});

export type FeedbackSchemaType = z.input<typeof feedbackSchema>;
