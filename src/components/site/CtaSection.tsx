import { Link } from "@tanstack/react-router";

import { Magnetic, RevealLines } from "./motion-primitives";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-accent px-5 py-24 text-accent-foreground sm:px-8 sm:py-36">
      <div className="grain-blob floaty pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full bg-primary/60" />
      <div className="relative mx-auto max-w-[1400px]">
        <h2 className="display display-hero">
          <RevealLines lines={["Klaar voor iets", "spectaculairs?"]} />
        </h2>
        <p className="mt-8 max-w-md text-lg text-accent-foreground/80">
          Vertel ons in het kort wat jullie willen bereiken. Binnen één werkdag hoor je van ons.
        </p>
        <Magnetic strength={0.4}>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Start een project
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
