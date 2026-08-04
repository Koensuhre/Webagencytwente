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

export async function summariseWithAi(
  displayUrl: string,
  scores: ScanScores,
  snapshot: PageSnapshot | null,
): Promise<Record<ScanCard["id"], string | undefined> | null> {
  const apiKey = process.env["LOVABLE_API_KEY"];
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
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(30_000),
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Je schrijft beknopt, warm en professioneel Nederlands." },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "observaties",
              description: "Geef de drie observaties terug.",
              parameters: {
                type: "object",
                properties: {
                  design: { type: "string" },
                  vindbaarheid: { type: "string" },
                  conversie: { type: "string" },
                },
                required: ["design", "vindbaarheid", "conversie"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "observaties" } },
      }),
    });

    if (!response.ok) {
      console.error("[scan] ai gateway failed", response.status);
      return null;
    }

    const json = (await response.json()) as {
      choices?: { message?: { tool_calls?: { function?: { arguments?: string } }[] } }[];
    };
    const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) return null;
    const parsed = JSON.parse(args) as Record<string, unknown>;
    const clean = (value: unknown) =>
      typeof value === "string" && value.trim().length > 0 ? value.trim().slice(0, 400) : undefined;
    return {
      design: clean(parsed["design"]),
      vindbaarheid: clean(parsed["vindbaarheid"]),
      conversie: clean(parsed["conversie"]),
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