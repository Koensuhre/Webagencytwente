import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { runWebsiteScan } from "@/lib/scan.functions";
import type { ScanResult } from "@/lib/scan-types";

import { AmbitionSlider } from "./AmbitionSlider";
import { ScanIntro } from "./ScanIntro";
import { ScanLeadForm } from "./ScanLeadForm";
import { ScanProgress } from "./ScanProgress";
import { ScanResults } from "./ScanResults";
import { ambitionTiers, type AmbitionTier } from "./scan-content";

type Phase = "intro" | "scanning" | "results";

export function WebsiteScanExperience() {
  const scan = useServerFn(runWebsiteScan);
  const [phase, setPhase] = useState<Phase>("intro");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const [ambitionIndex, setAmbitionIndex] = useState(1);

  const start = useCallback(
    (value: string) => {
      setQuery(value);
      setPhase("scanning");
      setAnimationDone(false);
      setResult(null);
      void scan({ data: { query: value } })
        .then((data) => setResult(data as ScanResult))
        .catch(() => setResult(null));
    },
    [scan],
  );

  useEffect(() => {
    if (animationDone && result !== null && phase === "scanning") setPhase("results");
  }, [animationDone, result, phase]);

  const tier = ambitionTiers[ambitionIndex] as AmbitionTier;

  return (
    <AnimatePresence mode="wait">
      {phase === "intro" ? (
        <ScanIntro key="intro" onStart={start} />
      ) : phase === "scanning" ? (
        <ScanProgress
          key="scanning"
          displayUrl={query}
          onDone={() => setAnimationDone(true)}
        />
      ) : result ? (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pt-26 sm:pt-36 lg:pt-44"
        >
          <ScanResults cards={result.cards} note={result.note} displayUrl={result.displayUrl} />
          <AmbitionSlider index={ambitionIndex} onChange={setAmbitionIndex} />
          <ScanLeadForm
            defaultWebsite={result.displayUrl}
            ambition={`${tier.label} (${tier.investment})`}
            summary={result.cards.map((card) => `${card.title}: ${card.text}`).join(" | ")}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}