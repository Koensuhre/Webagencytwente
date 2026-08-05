export type Option = { id: string; label: string; emoji?: string; hint?: string };

export const projectOptions: Option[] = [
  { id: "website", label: "Nieuwe website", emoji: "🌐", hint: "Van concept tot livegang" },
  { id: "branding", label: "Branding / huisstijl", emoji: "🎨", hint: "Merk, logo en tone of voice" },
  { id: "webshop", label: "Webshop", emoji: "🛒", hint: "Verkopen die soepel verlopen" },
  { id: "groei", label: "Online groei / SEO", emoji: "🚀", hint: "Beter gevonden worden" },
  { id: "anders", label: "Ik heb een ander idee", emoji: "💡", hint: "Vertel het ons straks" },
];

export const situationOptions: Option[] = [
  { id: "geen-website", label: "Ik heb nog geen website" },
  { id: "verouderd", label: "Mijn website is verouderd" },
  { id: "meer-klanten", label: "Ik wil meer klanten bereiken" },
  { id: "professioneler", label: "Mijn merk mag professioneler worden" },
  { id: "opnieuw", label: "Ik wil volledig opnieuw beginnen" },
];

export const ambitionSteps = [
  {
    id: "aanwezig",
    label: "Aanwezig zijn",
    text: "Een strakke, professionele basis waar je trots op bent en die vertrouwen wekt.",
  },
  {
    id: "groeien",
    label: "Online groeien",
    text: "Meer bezoekers, betere vindbaarheid en een site die actief aanvragen oplevert.",
  },
  {
    id: "marktleider",
    label: "Marktleider worden",
    text: "Onderscheidend design, sterke branding en maximale zichtbaarheid in jouw markt.",
  },
] as const;

export const timingOptions: Option[] = [
  { id: "asap", label: "Zo snel mogelijk" },
  { id: "1-2-maanden", label: "Binnen 1-2 maanden" },
  { id: "dit-jaar", label: "Dit jaar" },
  { id: "orienteren", label: "Ik oriënteer mij nog" },
];

export const budgetOptions: Option[] = [
  { id: "500-1000", label: "€500 - €1000" },
  { id: "1000-2500", label: "€1000 - €2500" },
  { id: "2500plus", label: "€2500+" },
  { id: "onbekend", label: "Nog onbekend" },
];

export type IntakeAnswers = {
  firstName: string;
  company: string;
  website: string;
  project: string;
  situation: string;
  ambition: number;
  timing: string;
  budget: string;
  story: string;
  name: string;
  email: string;
  phone: string;
};

export const emptyAnswers: IntakeAnswers = {
  firstName: "",
  company: "",
  website: "",
  project: "",
  situation: "",
  ambition: 1,
  timing: "",
  budget: "",
  story: "",
  name: "",
  email: "",
  phone: "",
};

export function labelOf(options: Option[], id: string) {
  return options.find((option) => option.id === id)?.label ?? "";
}

export function buildIntakeMessage(a: IntakeAnswers) {
  return [
    `Project: ${labelOf(projectOptions, a.project)}`,
    `Huidige situatie: ${labelOf(situationOptions, a.situation)}`,
    `Ambitie: ${ambitionSteps[a.ambition]?.label ?? ""}`,
    `Planning: ${labelOf(timingOptions, a.timing)}`,
    `Budget: ${labelOf(budgetOptions, a.budget)}`,
    a.website ? `Website: ${a.website}` : "",
    a.phone ? `Telefoon: ${a.phone}` : "",
    "",
    "Toelichting:",
    a.story,
  ]
    .filter(Boolean)
    .join("\n");
}
