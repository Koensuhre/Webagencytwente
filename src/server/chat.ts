import { matchFaq, needsQualification } from "@/lib/intent-matcher";

export type ChatReply = {
  answer: string;
  choices: string[];
  href?: string;
  qualify: boolean;
};

export function handleChatMessage(message: string): ChatReply | { error: string } {
  if (typeof message !== "string" || message.length > 1000) {
    return { error: "Ongeldig bericht." };
  }

  const result = matchFaq(message);
  if (result.faq) {
    return {
      answer: result.faq.answer,
      choices: result.faq.cta ? [result.faq.cta, "Ik wil iemand spreken"] : [],
      href: result.faq.href,
      qualify: needsQualification(message),
    };
  }

  return {
    answer:
      "Goede vraag. Ik weet niet zeker wat het beste antwoord is, maar een collega kan je hier goed mee helpen. Wil je je gegevens achterlaten of direct contact opnemen?",
    choices: [
      "Laat mijn gegevens achter",
      "Plan een gesprek",
      "Stuur een e-mail",
      "Bel ons",
      "Terug naar veelgestelde vragen",
    ],
    qualify: false,
  };
}
