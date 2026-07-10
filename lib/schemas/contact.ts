import { z } from "zod";

export const REASONS = [
  "I'm a player",
  "I'm a retailer",
  "I'm a disc brand",
  "I need support",
  "I want to partner",
  "I found incorrect disc data",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  reason: z.enum(REASONS, { message: "Select a reason" }),
  message: z.string().trim().max(2000).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
