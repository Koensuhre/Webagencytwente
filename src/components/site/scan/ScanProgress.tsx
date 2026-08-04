import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { scanChecks } from "./scan-content";

export function ScanProgress({
  displayUrl,
  onDone,
}: {
  displayUrl: string;
  onDone: () => void;
}) {
  const [step, setStep] = useState(0);
  const stepMs = 850;

  useEffect(() => {
    const timers = scanChecks.map((_, index) =>
      window.setTimeout(() => setStep(index + 1), (index + 1) * stepMs),
    );
    const finish = window.setTimeout(onDone, scanChecks.length * stepMs + 600);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(finish);
    };
  }, [onDone]);

  const progress = Math.round((step / scanChecks.length) * 100);

  return (
    <motion.section
      key="progress"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex min-h-[80svh] max-w-[900px] flex-col justify-center px-5 pt-36 pb-14 sm:px-8 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24"
      aria-labelledby="scan-progress-titel"
    >
      <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
        Bezig met scannen
      </p>
      <h2 id="scan-progress-titel" className="display display-2 mt-4 break-words">
        {displayUrl}
      </h2>

      <div
        className="mt-10 h-1.5 w-full overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label="Voortgang van de scan"
      >
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: "4%" }}
          animate={{ width: `${Math.max(progress, 4)}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <ul className="mt-10 space-y-1" aria-live="polite">
        <AnimatePresence initial={false}>
          {scanChecks.slice(0, step).map((check) => (
            <motion.li
              key={check}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 border-b border-ink/10 py-3.5 text-base sm:gap-4 sm:py-4 sm:text-lg"
            >
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
              >
                ✓
              </motion.span>
              {check}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.section>
  );
}