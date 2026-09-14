import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in.").max(100),
  email: z.string().trim().email("Vul een geldig e-mailadres in.").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().min(1),
  goal: z.string().min(1),
  hasWebsite: z.string().min(1),
  websiteUrl: z.string().trim().url("Vul een geldige URL in.").optional().or(z.literal("")),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.boolean().refine((value) => value, "Je toestemming is nodig om contact op te nemen."),
  website: z.string().max(0).optional(),
  conversation: z
    .array(
      z.object({
        id: z.string(),
        role: z.enum(["assistant", "user"]),
        content: z.string(),
        createdAt: z.string(),
        choices: z.array(z.string()).optional(),
      }),
    )
    .default([]),
});

export type LeadInput = z.infer<typeof leadSchema>;
