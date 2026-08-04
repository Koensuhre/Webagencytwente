import { AnimatePresence, motion } from "motion/react";

import { ambitionTiers, type AmbitionTier } from "./scan-content";

export function AmbitionSlider({
  index,
  onChange,
}: {
  index: number;
  onChange: (index: number) => void;
}) {
  const tier = ambitionTiers[index] as AmbitionTier;

  return (
    <section
      className="mx-auto mt-20 max-w-[1200px] px-5 sm:mt-36 sm:px-8"
      aria-labelledby="scan-ambitie"
    >
      <h2 id="scan-ambitie" className="display display-1">
        Waar wil jij naartoe groeien?
      </h2>

      <div className="mt-10 rounded-3xl border border-ink/15 bg-card p-6 sm:mt-12 sm:p-12">
        <label htmlFor="ambitie" className="sr-only">
          Kies jouw ambitieniveau
        </label>
        <input
          id="ambitie"
          type="range"
          min={0}
          max={ambitionTiers.length - 1}
          step={1}
          value={index}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-valuetext={tier.label}
          className="h-2 w-full cursor-pointer touch-none appearance-none rounded-full bg-ink/10 accent-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
        />
        <div className="mt-5 grid grid-cols-3 gap-1.5 sm:gap-2">
          {ambitionTiers.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(i)}
              aria-pressed={i === index}
              className={`min-h-11 rounded-full px-1 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                i === index
                  ? "bg-ink text-ink-foreground"
                  : "text-muted-foreground hover:text-foreground"
              } ${i === 0 ? "text-left sm:text-center" : ""} ${
                i === ambitionTiers.length - 1 ? "text-right sm:text-center" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-7 sm:grid-cols-3 sm:gap-8">
          <TierBlock label="Geschatte investering">
            <AnimatePresence mode="wait">
              <motion.span
                key={tier.investment}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="display block text-4xl text-primary sm:text-5xl"
              >
                {tier.investment}
              </motion.span>
            </AnimatePresence>
          </TierBlock>

          <TierBlock label="Planning">
            <AnimatePresence mode="wait">
              <motion.span
                key={tier.planning}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block text-xl font-medium"
              >
                {tier.planning}
              </motion.span>
            </AnimatePresence>
          </TierBlock>

          <TierBlock label="Focus">
            <AnimatePresence mode="wait">
              <motion.ul key={tier.id} className="space-y-1.5">
                {tier.focus.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="flex items-center gap-2 text-base"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </TierBlock>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {tier.label}: {tier.investment}, {tier.planning}.
      </p>
    </section>
  );
}

function TierBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}