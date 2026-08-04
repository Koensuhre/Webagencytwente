import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { Magnetic, RevealLines } from "./motion-primitives";

export function ScanCtaSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-ink/10 bg-background px-5 py-28 sm:px-8 sm:py-40"
      aria-labelledby="scan-cta"
    >
      <motion.div
        aria-hidden="true"
        className="grain-blob pointer-events-none absolute -top-40 left-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/25"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="grain-blob pointer-events-none absolute -bottom-48 right-1/5 h-[26rem] w-[26rem] rounded-full bg-accent/20"
        animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1100px] text-center">
        <h2 id="scan-cta" className="display text-[12vw] leading-[0.86] sm:text-[6vw]">
          <RevealLines lines={["Benieuwd hoe jouw", "website ervoor staat?"]} />
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Binnen één minuut laten we zien waar jouw grootste online kansen liggen. Geen
          verkooppraatje, maar een eerste professionele blik op jouw website.
        </p>
        <Magnetic strength={0.35}>
          <Link
            to="/website-scan"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-ink px-9 py-5 text-base font-semibold text-ink-foreground transition-all duration-300 hover:scale-105 hover:bg-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
          >
            Start gratis website scan
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}