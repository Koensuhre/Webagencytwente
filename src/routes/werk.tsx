import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import { CtaSection } from "@/components/site/CtaSection";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealLines } from "@/components/site/motion-primitives";
import { projects } from "@/lib/site-data";

export const Route = createFileRoute("/werk")({
  head: () => ({
    meta: [
      { title: "Werk — Web Agency Twente" },
      {
        name: "description",
        content:
          "Een selectie van projecten: merken, websites en webshops voor ondernemers in Twente en daarbuiten.",
      },
      { property: "og:title", content: "Werk — Web Agency Twente" },
      { property: "og:description", content: "Projecten waar we trots op zijn." },
      { property: "og:url", content: "/werk" },
    ],
    links: [{ rel: "canonical", href: "/werk" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-16 sm:px-8 sm:pt-48">
        <h1 className="display display-hero">
          <RevealLines lines={["Ons werk"]} />
        </h1>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Vier recente projecten. Elk met een eigen karakter, dezelfde standaard.
          </p>
        </Reveal>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-24 sm:px-8 sm:pb-36 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05} className={i % 2 === 1 ? "lg:mt-24" : ""}>
            <article className="group">
              <div className={`relative aspect-4/3 overflow-hidden rounded-3xl ${project.color}`}>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center p-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className={`display text-center text-[10vw] leading-[0.85] sm:text-[4vw] ${
                      project.color === "bg-ink" ? "text-ink-foreground" : "text-ink"
                    }`}
                  >
                    {project.name}
                  </span>
                </motion.div>
              </div>
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="display text-3xl">{project.name}</h2>
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>
              <p className="mt-1 text-lg">{project.tag}</p>
              <p className="mt-1 font-semibold text-primary">{project.result}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <CtaSection />
    </PageShell>
  );
}
