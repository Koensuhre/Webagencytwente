import type { ChatMessage, Lead, LeadLabel, LeadStatus } from "@/types";

type Row = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  goal: string | null;
  has_website: string | null;
  website_url: string | null;
  budget: string | null;
  timeline: string | null;
  notes: string | null;
  score: number | null;
  label: string | null;
  status: string;
  conversation: unknown;
};

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

function toLead(row: Row): Lead {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    company: row.company ?? undefined,
    service: row.service ?? "",
    goal: row.goal ?? "",
    hasWebsite: row.has_website ?? "",
    websiteUrl: row.website_url ?? undefined,
    budget: row.budget ?? "",
    timeline: row.timeline ?? "",
    notes: row.notes ?? undefined,
    consent: true,
    score: row.score ?? 0,
    label: (row.label as LeadLabel) ?? "Koud",
    status: (row.status as LeadStatus) ?? "nieuw",
    conversation: Array.isArray(row.conversation) ? (row.conversation as ChatMessage[]) : [],
  };
}

export async function getLeads(): Promise<Lead[]> {
  const db = await admin();
  const { data, error } = await db
    .from("chat_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as Row[]).map(toLead);
}

export async function saveLead(lead: Lead) {
  const db = await admin();
  const { error } = await db.from("chat_leads").insert({
    id: lead.id,
    created_at: lead.createdAt,
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? null,
    company: lead.company ?? null,
    service: lead.service,
    goal: lead.goal,
    has_website: lead.hasWebsite,
    website_url: lead.websiteUrl ?? null,
    budget: lead.budget,
    timeline: lead.timeline,
    notes: lead.notes ?? null,
    score: lead.score,
    label: lead.label,
    status: lead.status,
    conversation: lead.conversation as unknown as never,
  });
  if (error) throw new Error(error.message);
  return lead;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const db = await admin();
  const { data, error } = await db
    .from("chat_leads")
    .update({ status })
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toLead(data as unknown as Row) : undefined;
}
