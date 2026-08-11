import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in").max(100),
  email: z.string().trim().email("Vul een geldig e-mailadres in").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Vertel iets meer over je project").max(2000),
  hp: z.string().max(200).optional(),
  startedAt: z.number().int().positive().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

const MIN_FILL_MS = 2500;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentSubmissions.set(key, hits);
  if (recentSubmissions.size > 500) {
    for (const [k, v] of recentSubmissions) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) recentSubmissions.delete(k);
    }
  }
  return hits.length > RATE_MAX;
}

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot: bots vullen dit verborgen veld in — stil accepteren, niets opslaan.
    if (data.hp && data.hp.trim().length > 0) {
      return { ok: true as const };
    }

    // Tijdcontrole: menselijke invulling duurt langer dan een paar seconden.
    if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS) {
      throw new Error("Even geduld — probeer het over een paar seconden opnieuw.");
    }

    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (isRateLimited(`${ip}`)) {
      throw new Error("Te veel aanvragen achter elkaar. Probeer het over een minuut opnieuw.");
    }

    const { createPublicServerClient } = await import("@/lib/supabase-public.server");
    const supabase = createPublicServerClient();

    // `anon` mag alleen invoegen, niet teruglezen — daarom een eigen id voor idempotency.
    const submissionId = crypto.randomUUID();

    const { error } = await supabase.from("contact_requests").insert({
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
        idempotencyKey: `contact-notification-${submissionId}`,
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
        idempotencyKey: `contact-confirmation-${submissionId}`,
        replyTo: "info@webagencytwente.nl",
      });
    } catch (mailError) {
      console.error("[contact] confirmation email failed", mailError);
    }

    return { ok: true as const };
  });
