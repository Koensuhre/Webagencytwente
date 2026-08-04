import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in").max(100),
  email: z.string().trim().email("Vul een geldig e-mailadres in").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Vertel iets meer over je project").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_requests").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      service: data.service || null,
      message: data.message,
    });

    if (error) {
      console.error("[contact] insert failed", error.message);
      throw new Error("Verzenden mislukt. Probeer het later opnieuw.");
    }

    return { ok: true as const };
  });
