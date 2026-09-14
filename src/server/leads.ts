import { leadSchema } from "@/lib/validation";
import { scoreLead } from "@/lib/lead-score";
import { getLeads, saveLead, updateLeadStatus } from "@/lib/storage";
import type { Lead, LeadStatus } from "@/types";

const statuses: LeadStatus[] = ["nieuw", "opgevolgd", "gekwalificeerd", "afgewezen"];

function readEnv(name: string) {
  return process.env[name] || (import.meta.env as Record<string, string | undefined>)[name] || "";
}

export function isAdminKey(key: string | null) {
  const expected = readEnv("ADMIN_DASHBOARD_PASSWORD") || readEnv("ADMIN_DEMO_PASSWORD");
  if (!expected || !key) return false;
  return key === expected;
}

export async function listLeadsForAdmin(adminKey: string | null) {
  if (!isAdminKey(adminKey)) {
    return { status: 401 as const, body: { error: "Niet geautoriseerd." } };
  }
  return { status: 200 as const, body: await getLeads() };
}

export async function createLeadFromBody(raw: unknown) {
  try {
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        status: 400 as const,
        body: { error: "Controleer de ingevulde gegevens.", fields: parsed.error.flatten().fieldErrors },
      };
    }
    if (parsed.data.website) {
      return { status: 200 as const, body: { ok: true } };
    }

    const { score, label } = scoreLead(parsed.data);
    const lead: Lead = {
      ...parsed.data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      phone: parsed.data.phone || undefined,
      company: parsed.data.company || undefined,
      websiteUrl: parsed.data.websiteUrl || undefined,
      notes: parsed.data.notes || undefined,
      score,
      label,
      status: "nieuw",
    };
    await saveLead(lead);

    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      const conversationText = (lead.conversation ?? [])
        .map((m) => `${m.role === "user" ? "Bezoeker" : "Assistent"}: ${m.content}`)
        .join("\n");
      await sendTemplateEmail("contact-notification", "info@webagencytwente.nl", {
        templateData: {
          heading: "Nieuwe aanvraag via de chatbot",
          intro: "Verstuurd via de chatbot op de website.",
          fields: [
            { label: "Naam", value: lead.name },
            { label: "E-mail", value: lead.email },
            { label: "Telefoon", value: lead.phone || "—" },
            { label: "Bedrijf", value: lead.company || "—" },
            { label: "Dienst", value: lead.service || "—" },
            { label: "Doel", value: lead.goal || "—" },
            { label: "Huidige website", value: lead.hasWebsite || "—" },
            { label: "Website URL", value: lead.websiteUrl || "—" },
            { label: "Budget", value: lead.budget || "—" },
            { label: "Startmoment", value: lead.timeline || "—" },
            { label: "Score", value: `${lead.score} (${lead.label})` },
          ],
          message: [lead.notes ? `Toelichting: ${lead.notes}` : "", conversationText ? `Gesprek:\n${conversationText}` : ""]
            .filter(Boolean)
            .join("\n\n"),
        },
        idempotencyKey: `chat-lead-${lead.id}`,
        replyTo: lead.email,
      });
    } catch (mailError) {
      console.error("[leads] chat notification email failed", mailError);
    }

    const hook = readEnv("LEAD_WEBHOOK_URL");
    if (hook) {
      fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).catch(() => undefined);
    }

    return { status: 201 as const, body: lead };
  } catch {
    return {
      status: 500 as const,
      body: {
        error: "Er ging iets mis. Probeer opnieuw of neem contact op via info@webagencytwente.nl.",
      },
    };
  }
}

export async function patchLeadStatus(adminKey: string | null, id?: string, status?: LeadStatus) {
  if (!isAdminKey(adminKey)) {
    return { status: 401 as const, body: { error: "Niet geautoriseerd." } };
  }
  if (!id || !status || !statuses.includes(status)) {
    return { status: 400 as const, body: { error: "Ongeldige wijziging." } };
  }
  const lead = await updateLeadStatus(id, status);
  return lead
    ? { status: 200 as const, body: lead }
    : { status: 404 as const, body: { error: "Lead niet gevonden." } };
}
