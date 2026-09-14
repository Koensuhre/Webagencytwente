import { matchFaq } from "@/lib/intent-matcher";

export type ChatReply = {
  answer: string;
  choices: string[];
  actions: string[];
  href?: string | undefined;
  qualify: boolean;
};

const fallbackTopics = [
  "Welke diensten bieden jullie?",
  "Wat kost een website?",
  "Hoe lang duurt een websiteproject?",
  "Kan ik jullie werk bekijken?",
];

export function handleChatMessage(message: string): ChatReply | { error: string } {
  if (typeof message !== "string" || message.length > 1000) {
    return { error: "Ongeldig bericht." };
  }

  const result = matchFaq(message);
  if (result.faq) {
    return {
      answer: result.faq.answer,
      choices: result.faq.follow ?? [],
      actions: result.faq.actions ?? ["Laat mijn gegevens achter"],
      href: result.faq.href,
      qualify: false,
    };
  }

  return {
    answer:
      "Die vraag begrijp ik niet helemaal. Kies hieronder een onderwerp, of laat je gegevens achter — dan reageert een collega persoonlijk.",
    choices: fallbackTopics,
    actions: ["Laat mijn gegevens achter", "Stuur een e-mail", "Bel ons"],
    qualify: false,
  };
}
