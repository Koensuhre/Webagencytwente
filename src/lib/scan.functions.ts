import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const scanInputSchema = z.object({
  query: z.string().trim().min(2, "Vul je website of bedrijfsnaam in").max(200),
});

export const scanLeadSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in").max(100),
  company: z.string().trim().min(2, "Vul je bedrijfsnaam in").max(120),
  email: z.string().trim().email("Vul een geldig e-mailadres in").max(255),
  website: z.string().trim().min(2, "Vul je website in").max(200),
  wishes: z.string().trim().max(1000).optional().or(z.literal("")),
  ambition: z.string().trim().max(40).optional().or(z.literal("")),
  summary: z.string().trim().max(1500).optional().or(z.literal("")),
});

export type ScanLeadInput = z.infer<typeof scanLeadSchema>;

export const runWebsiteScan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => scanInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { buildScanResult } = await import("./scan.server");
    return buildScanResult(data.query);
  });

export const submitScanLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => scanLeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { createPublicServerClient } = await import("@/lib/supabase-public.server");
    const supabase = createPublicServerClient();
    const submissionId = crypto.randomUUID();

    const message = [
      `Website: ${data.website}`,
      data.ambition ? `Ambitie: ${data.ambition}` : null,
      data.wishes ? `Wensen: ${data.wishes}` : null,
      data.summary ? `Scan: ${data.summary}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await supabase.from("contact_requests").insert({
      name: data.name,
      email: data.email,
      company: data.company,
      service: "Website scan",
      message,
    });

    if (error) {
      console.error("[scan-lead] insert failed", error.message);
      throw new Error("Verzenden mislukt. Probeer het later opnieuw.");
    }

    // Mail is een losse stap na de opslag: de lead is nu hoe dan ook bewaard.
    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      const result = await sendTemplateEmail("scan-notification", "info@webagencytwente.nl", {
        templateData: {
          heading: "Nieuwe website scan aanvraag",
          intro: "Verstuurd via de interactieve website scan.",
          fields: [
            { label: "Naam", value: data.name },
            { label: "E-mail", value: data.email },
            { label: "Bedrijf", value: data.company },
            { label: "Website", value: data.website },
            { label: "Ambitie", value: data.ambition || "—" },
            { label: "Wensen", value: data.wishes || "—" },
          ],
          message: data.summary || "",
        },
        idempotencyKey: `scan-notification-${submissionId}`,
        replyTo: data.email,
      });
      if (!result.sent) {
        console.error("[scan-lead] notification email not sent:", result.reason);
      }
    } catch (mailError) {
      console.error(
        "[scan-lead] notification email failed:",
        mailError instanceof Error ? mailError.message : mailError,
      );
    }

    return { ok: true as const };
  });