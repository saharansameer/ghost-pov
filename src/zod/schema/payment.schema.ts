import { z } from "zod/v4";

export const paymentSchema = z.object({
  variant: z.string().refine((val) => ["249", "499"].includes(val), {
    error: "Invalid Amount",
    path: ["amount"],
  }),
});

export type PaymentSchemaType = z.input<typeof paymentSchema>;
