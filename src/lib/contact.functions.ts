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

    const { data: inserted, error } = await supabaseAdmin
      .from("contact_requests")
      .insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      service: data.service || null,
      message: data.message,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[contact] insert failed", error.message);
      throw new Error("Verzenden mislukt. Probeer het later opnieuw.");
    }

    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      const summaryFields = [
        { label: "Naam", value: data.name },
        { label: "E-mail", value: data.email },
        { label: "Bedrijf", value: data.company || "—" },
        { label: "Onderwerp", value: data.service || "—" },
      ];
      await sendTemplateEmail("contact-notification", "info@webagencytwente.nl", {
        templateData: {
          heading: "Nieuwe contactaanvraag",
          intro: "Verstuurd via het contactformulier op de website.",
          fields: summaryFields,
          message: data.message,
        },
        idempotencyKey: `contact-notification-${inserted?.id ?? data.email}`,
        replyTo: data.email,
      });
    } catch (mailError) {
      console.error("[contact] notification email failed", mailError);
    }

    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("contact-confirmation", data.email, {
        templateData: {
          name: data.name.split(" ")[0] ?? data.name,
          fields: [
            { label: "Naam", value: data.name },
            { label: "E-mail", value: data.email },
            { label: "Bedrijf", value: data.company || "—" },
            { label: "Onderwerp", value: data.service || "—" },
          ],
          message: data.message,
        },
        idempotencyKey: `contact-confirmation-${inserted?.id ?? data.email}`,
        replyTo: "info@webagencytwente.nl",
      });
    } catch (mailError) {
      console.error("[contact] confirmation email failed", mailError);
    }

    return { ok: true as const };
  });
