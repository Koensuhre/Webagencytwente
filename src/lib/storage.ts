import { promises as fs } from "node:fs";
import path from "node:path";
import type { Lead, LeadStatus } from "@/types";

const file = path.join(process.cwd(), "data", "leads.json");

const demo: Lead[] = [
  {
    id: "demo-1",
    createdAt: "2026-09-09T10:30:00.000Z",
    name: "Sanne de Boer",
    email: "sanne@atelierflora.nl",
    phone: "0612345678",
    company: "Atelier Flora",
    service: "Nieuwe website",
    goal: "Meer aanvragen",
    hasWebsite: "Ja, en ik wil deze verbeteren",
    websiteUrl: "https://atelierflora.example",
    budget: "€5.000–€10.000",
    timeline: "Binnen 1 maand",
    notes: "Graag ook hulp met fotografie.",
    consent: true,
    score: 90,
    label: "Heet",
    status: "nieuw",
    conversation: [],
  },
];

async function read(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as Lead[];
  } catch {
    return demo;
  }
}

async function write(leads: Lead[]) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(leads, null, 2), "utf8");
}

export async function getLeads() {
  return read();
}

export async function saveLead(lead: Lead) {
  const leads = await read();
  leads.unshift(lead);
  await write(leads);
  return lead;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const leads = await read();
  const lead = leads.find((x) => x.id === id);
  if (!lead) return undefined;
  lead.status = status;
  await write(leads);
  return lead;
}
