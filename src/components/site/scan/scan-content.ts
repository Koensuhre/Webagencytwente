export const scanChecks = [
  "Design",
  "Gebruiksvriendelijkheid",
  "Vindbaarheid",
  "AI-readiness",
  "Conversie",
  "Performance",
] as const;

export type AmbitionTier = {
  id: "starter" | "groei" | "marktleider";
  label: string;
  investment: string;
  planning: string;
  focus: string[];
};

export const ambitionTiers: AmbitionTier[] = [
  {
    id: "starter",
    label: "Starter",
    investment: "€500 – €900",
    planning: "Binnen 2 weken live",
    focus: ["Snelle professionele website", "Heldere basis", "Mobiel perfect"],
  },
  {
    id: "groei",
    label: "Groei",
    investment: "€900 – €1800",
    planning: "Binnen 3 tot 4 weken live",
    focus: ["Meer conversie", "SEO", "Uitbreidbaar"],
  },
  {
    id: "marktleider",
    label: "Marktleider",
    investment: "Vanaf €1800",
    planning: "Binnen 6 tot 8 weken live",
    focus: ["Sterke branding", "Uniek design", "AI-ready", "Maximale online zichtbaarheid"],
  },
];