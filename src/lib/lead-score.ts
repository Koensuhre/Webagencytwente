import type { LeadLabel } from "@/types";

type ScoreInput = {
  budget: string;
  timeline: string;
  service: string;
  goal: string;
  websiteUrl?: string | undefined;
  phone?: string | undefined;
  notes?: string | undefined;
};

export function scoreLead(lead: ScoreInput): { score: number; label: LeadLabel } {
  let score = 0;
  if (/€5\.000|€10\.000|Meer/.test(lead.budget)) score += 25;
  if (/Zo snel|1 maand/.test(lead.timeline)) score += 25;
  if (lead.service && lead.service !== "Anders") score += 10;
  if (lead.goal) score += 10;
  if (lead.websiteUrl) score += 10;
  if (lead.phone) score += 10;
  if (lead.notes) score += 10;
  return { score, label: score >= 70 ? "Heet" : score >= 40 ? "Warm" : "Koud" };
}
