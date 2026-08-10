/** Server-only helpers for the website scan. */

import type { ScanCard, ScanResult, ScanScores } from "./scan-types";

const FALLBACK_CARDS: ScanCard[] = [
  {
    id: "design",
    emoji: "🎨",
    title: "Design",
    text: "Je website oogt professioneel, maar er zijn kansen om meer op te vallen en bezoekers sneller te overtuigen.",
    score: null,
  },
  {
    id: "vindbaarheid",
    emoji: "📈",
    title: "Vindbaarheid",
    text: "Er liggen kansen om beter gevonden te worden in Google én AI-platformen zoals ChatGPT.",
    score: null,
  },
  {
    id: "conversie",
    emoji: "🚀",
    title: "Conversie",
    text: "Met een sterkere structuur en duidelijkere call-to-actions kunnen meer bezoekers klant worden.",
    score: null,
  },
];

export function normalizeInput(raw: string): { url: string; displayUrl: string } | null {
  const trimmed = raw.trim().replace(/\s+/g, "");
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    if (!parsed.hostname.includes(".")) return null;
    return { url: parsed.toString(), displayUrl: parsed.hostname.replace(/^www\./, "") };
  } catch {
    return null;
  }
}

export async function fetchPageSpeed(url: string): Promise<ScanScores | null> {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", "mobile");
  for (const category of ["performance", "seo", "accessibility", "best-practices"]) {
    endpoint.searchParams.append("category", category);
  }
  const apiKey = process.env["PAGESPEED_API_KEY"];
  if (apiKey) endpoint.searchParams.set("key", apiKey);

  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(45_000) });
    if (!response.ok) {
      console.error("[scan] pagespeed failed", response.status);
      return null;
    }
    const json = (await response.json()) as {
      lighthouseResult?: { categories?: Record<string, { score?: number | null }> };
    };
    const categories = json.lighthouseResult?.categories ?? {};
    const pick = (key: string) => {
      const score = categories[key]?.score;
      return typeof score === "number" ? Math.round(score * 100) : null;
    };
    return {
      performance: pick("performance"),
      seo: pick("seo"),
      accessibility: pick("accessibility"),
      bestPractices: pick("best-practices"),
    };
  } catch (error) {
    console.error("[scan] pagespeed error", error);
    return null;
  }
}

export type PageSnapshot = {
  title: string;
  description: string;
  headings: string[];
  hasViewport: boolean;
  wordCount: number;
  imagesWithoutAlt: number;
  excerpt: string;
};

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Fetches the homepage HTML and extracts a few plain-language signals for the AI analysis. */
export async function fetchPageSnapshot(url: string): Promise<PageSnapshot | null> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(15_000),
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; WebAgencyTwenteScan/1.0)" },
    });
    if (!response.ok) return null;
    const html = (await response.text()).slice(0, 400_000);

    const title = decode(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "");
    const description = decode(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i.exec(html)?.[1] ?? "",
    );
    const headings = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
      .map((match) => decode((match[1] ?? "").replace(/<[^>]+>/g, " ")))
      .filter(Boolean)
      .slice(0, 4);
    const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
    const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
    const imagesWithoutAlt = images.filter((tag) => !/\balt\s*=\s*["'][^"']+["']/i.test(tag)).length;

    const text = decode(
      html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " "),
    );
    const wordCount = text ? text.split(" ").length : 0;

    return {
      title,
      description,
      headings,
      hasViewport,
      wordCount,
      imagesWithoutAlt,
      excerpt: text.slice(0, 1200),
    };
  } catch (error) {
    console.error("[scan] snapshot error", error);
    return null;
  }
}

export async function summariseWithAi(
  displayUrl: string,
  scores: ScanScores,
  snapshot: PageSnapshot | null,
): Promise<Record<ScanCard["id"], string | undefined> | null> {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) return null;

  const prompt = `Website: ${displayUrl}
Lighthouse-scores (0-100, mobiel): performance ${scores.performance ?? "onbekend"}, SEO ${scores.seo ?? "onbekend"}, toegankelijkheid ${scores.accessibility ?? "onbekend"}, best practices ${scores.bestPractices ?? "onbekend"}.
${
  snapshot
    ? `Paginatitel: ${snapshot.title || "ontbreekt"}
Meta-omschrijving: ${snapshot.description || "ontbreekt"}
H1-koppen: ${snapshot.headings.join(" / ") || "geen"}
Mobiele viewport ingesteld: ${snapshot.hasViewport ? "ja" : "nee"}
Aantal woorden op de homepage: ${snapshot.wordCount}
Aantal afbeeldingen zonder alt-tekst: ${snapshot.imagesWithoutAlt}
Tekstfragment: ${snapshot.excerpt}`
    : "Er kon geen live paginainhoud worden opgehaald."
}

Schrijf voor een Nederlands webdesignbureau drie korte, positief-kritische observaties voor de eigenaar van deze website. Niet technisch, geen jargon, geen verkooppraatje. Maximaal 30 woorden per observatie. Onderwerpen: design (uitstraling en overtuigingskracht), vindbaarheid (Google en AI-platformen zoals ChatGPT), conversie (structuur en call-to-actions).`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(30_000),
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "Je schrijft beknopt, warm en professioneel Nederlands." }],
          },
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          tools: [
            {
              functionDeclarations: [
                {
                  name: "observaties",
                  description: "Geef de drie observaties terug.",
                  parameters: {
                    type: "OBJECT",
                    properties: {
                      design: { type: "STRING" },
                      vindbaarheid: { type: "STRING" },
                      conversie: { type: "STRING" },
                    },
                    required: ["design", "vindbaarheid", "conversie"],
                  },
                },
              ],
            },
          ],
          toolConfig: { functionCallingConfig: { mode: "ANY" } },
        }),
      },
    );

    if (!response.ok) {
      console.error("[scan] gemini api failed", response.status);
      return null;
    }

    const json = (await response.json()) as {
      candidates?: {
        content?: {
          parts?: { functionCall?: { args?: Record<string, unknown> } }[];
        };
      }[];
    };
    const parts = json.candidates?.[0]?.content?.parts ?? [];
    const args = parts.find((part) => part.functionCall?.args)?.functionCall?.args;
    if (!args) return null;
    const clean = (value: unknown) =>
      typeof value === "string" && value.trim().length > 0 ? value.trim().slice(0, 400) : undefined;
    return {
      design: clean(args["design"]),
      vindbaarheid: clean(args["vindbaarheid"]),
      conversie: clean(args["conversie"]),
    };
  } catch (error) {
    console.error("[scan] ai error", error);
    return null;
  }
}

export async function buildScanResult(raw: string): Promise<ScanResult> {
  const normalized = normalizeInput(raw);
  const displayUrl = normalized?.displayUrl ?? raw.trim().slice(0, 80);
  const emptyScores: ScanScores = {
    performance: null,
    seo: null,
    accessibility: null,
    bestPractices: null,
  };

  if (!normalized) {
    return {
      url: "",
      displayUrl,
      measured: false,
      scores: emptyScores,
      cards: FALLBACK_CARDS,
      note: "We konden geen website-adres herkennen, dus dit is een algemene eerste indruk.",
    };
  }

  const [psi, snapshot] = await Promise.all([
    fetchPageSpeed(normalized.url),
    fetchPageSnapshot(normalized.url),
  ]);
  const scores = psi ?? emptyScores;
  const hasScores = Object.values(scores).some((value) => value !== null);
  const measured = hasScores || snapshot !== null;
  const ai = measured ? await summariseWithAi(normalized.displayUrl, scores, snapshot) : null;

  const cards: ScanCard[] = FALLBACK_CARDS.map((card) => ({
    ...card,
    text: ai?.[card.id] ?? card.text,
    score:
      card.id === "design"
        ? scores.accessibility
        : card.id === "vindbaarheid"
          ? scores.seo
          : scores.performance,
  }));

  return {
    url: normalized.url,
    displayUrl: normalized.displayUrl,
    measured,
    scores,
    cards,
    note: hasScores
      ? "Gemeten met Google Lighthouse en aangevuld met een AI-analyse van jouw website."
      : measured
        ? "Op basis van een live AI-analyse van jouw website."
        : "We konden jouw website nu niet live bekijken, dus dit is een eerste indruk op basis van ervaring.",
  };
}