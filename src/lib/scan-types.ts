export type ScanCard = {
  id: "design" | "vindbaarheid" | "conversie";
  emoji: string;
  title: string;
  text: string;
  score: number | null;
};

export type ScanScores = {
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
};

export type ScanResult = {
  url: string;
  displayUrl: string;
  measured: boolean;
  scores: ScanScores;
  cards: ScanCard[];
  note: string;
};