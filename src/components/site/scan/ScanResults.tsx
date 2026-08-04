import { motion } from "motion/react";

import type { ScanCard } from "@/lib/scan-types";

export function ScanResults({
  cards,
  note,
  displayUrl,
}: {
  cards: ScanCard[];
  note: string;
  displayUrl: string;
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-5 sm:px-8" aria-labelledby="scan-resultaten">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase"
      >
        Eerste indruk van {displayUrl}
      </motion.p>
      <h2 id="scan-resultaten" className="display mt-4 text-[11vw] leading-[0.86] sm:text-[5vw]">
        Dit valt ons op.
      </h2>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {cards.map((card, index) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="flex h-full flex-col rounded-3xl border border-ink/15 bg-card p-8"
          >
            <span className="text-3xl" aria-hidden="true">
              {card.emoji}
            </span>
            <h3 className="display mt-4 text-3xl">{card.title}</h3>
            {typeof card.score === "number" ? (
              <div className="mt-5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${card.score}%` }}
                    transition={{ duration: 1.1, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Score {card.score}/100 op basis van een live meting
                </p>
              </div>
            ) : null}
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{card.text}</p>
          </motion.article>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 max-w-2xl text-sm text-muted-foreground"
      >
        Dit is slechts een eerste indruk. Tijdens een persoonlijk gesprek laten we je graag alle
        verbeterkansen zien. {note}
      </motion.p>
    </section>
  );
}