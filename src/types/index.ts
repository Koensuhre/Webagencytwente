export type MessageRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  choices?: string[];
};

export type LeadLabel = "Koud" | "Warm" | "Heet";
export type LeadStatus = "nieuw" | "opgevolgd" | "gekwalificeerd" | "afgewezen";

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string | undefined;
  company?: string | undefined;
  service: string;
  goal: string;
  hasWebsite: string;
  websiteUrl?: string | undefined;
  budget: string;
  timeline: string;
  notes?: string | undefined;
  consent: boolean;
  score: number;
  label: LeadLabel;
  status: LeadStatus;
  conversation: ChatMessage[];
};

export type Faq = {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  cta?: string;
  href?: string;
};
