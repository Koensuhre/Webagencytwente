import { faqs } from "@/data/faq";
import type { Faq } from "@/types";

const normalize = (value: string) =>
  value.toLocaleLowerCase("nl-NL").replace(/[^a-z0-9à-ÿ€\s-]/g, " ");

export function matchFaq(input: string): { faq?: Faq; confidence: number } {
  const text = normalize(input);
  if (!text.trim()) return { confidence: 0 };

  const words = new Set(text.split(/\s+/));
  let best: Faq | undefined;
  let high = 0;

  for (const faq of faqs) {
    const score = faq.keywords.reduce((sum, keyword) => {
      const k = normalize(keyword);
      return (
        sum +
        (text.includes(k) ? 3 : k.split(" ").filter((w) => words.has(w)).length / k.split(" ").length)
      );
    }, 0);
    if (score > high) {
      high = score;
      best = faq;
    }
  }

  return { faq: high >= 1.5 ? best : undefined, confidence: Math.min(1, high / 3) };
}

export const needsQualification = (input: string) =>
  /offerte|voorstel|nieuwe website|webshop|seo|marketing|prijs|kosten|planning|iemand spreken|contact/i.test(
    normalize(input),
  );
