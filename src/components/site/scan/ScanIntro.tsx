import { motion } from "motion/react";
import { useState } from "react";

import { RevealLines } from "../motion-primitives";

export function ScanIntro({ onStart }: { onStart: (query: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <motion.section
      key="intro"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex min-h-[80svh] max-w-[1100px] flex-col justify-center px-5 pt-28 pb-14 sm:px-8 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24"
      aria-labelledby="scan-intro-titel"
    >
      <h1 id="scan-intro-titel" className="display display-1">
        <RevealLines lines={["Laten we alvast met", "jouw website meekijken."]} />
      </h1>
      <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
        Vul jouw website of bedrijfsnaam in.
      </p>

      <form
        className="mt-8 sm:mt-12 max-w-3xl"
        onSubmit={(event) => {
          event.preventDefault();
          if (value.trim().length < 2) {
            setError("Vul jouw website of bedrijfsnaam in.");
            return;
          }
          setError(null);
          onStart(value.trim());
        }}
        noValidate
      >
        <label htmlFor="scan-query" className="sr-only">
          Jouw website of bedrijfsnaam
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <input
            id="scan-query"
            name="query"
            autoComplete="url"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="bijvoorbeeld: webagencytwente.nl"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "scan-query-fout" : undefined}
            className="w-full min-w-0 rounded-full border border-ink/15 bg-card px-5 py-4 text-base outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 sm:px-7 sm:py-5 sm:text-2xl"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-ink-foreground transition-colors hover:bg-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none sm:w-auto sm:py-5"
          >
            Start scan
            <span aria-hidden="true">&rarr;</span>
          </motion.button>
        </div>
        {error ? (
          <p id="scan-query-fout" role="alert" className="mt-3 pl-2 text-sm text-primary">
            {error}
          </p>
        ) : null}
        <p className="mt-5 pl-2 text-sm text-muted-foreground">
          Duurt ongeveer één minuut. Geen account, geen verkooppraatje.
        </p>
      </form>
    </motion.section>
  );
}