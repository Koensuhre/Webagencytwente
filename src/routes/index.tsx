import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaSection } from "@/components/site/CtaSection";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { PageShell } from "@/components/site/PageShell";
import { ScanCtaSection } from "@/components/site/ScanCtaSection";
import { Magnetic, Reveal, RevealLines } from "@/components/site/motion-primitives";

import { clients, faqs, processSteps, projects, services, testimonials } from "@/lib/site-data";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Web Agency Twente — Websites die je onthoudt" },
      {
        name: "description",
        content:
          "Wij ontwerpen en bouwen opvallende websites, merken en SEO voor ondernemers in Twente en daarbuiten. Bekijk ons werk.",
      },
      { property: "og:title", content: "Web Agency Twente — Websites die je onthoudt" },
      {
        property: "og:description",
        content: "Wij ontwerpen en bouwen opvallende websites, merken en SEO voor ondernemers in Twente en daarbuiten. Bekijk ons werk.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      <Hero />

      <section className="border-y border-ink/10 bg-background" aria-label="Klanten">
        <div className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-8">
          <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Gewerktt voor
          </p>
        </div>
        <Marquee items={clients} />
      </section>

      <ServicesSection />
      <ScanCtaSection />
      <WorkSection />
      <WhySection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </PageShell>
  );
}



function ServicesSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-36" aria-labelledby="diensten">
      <div className="grid gap-6 sm:grid-cols-2 sm:items-end">
        <h2 id="diensten" className="display display-1">
          <RevealLines lines={["Wat wij", "doen"]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-lg text-muted-foreground sm:justify-self-end">
            Van eerste schets tot vindbaarheid in AI-antwoorden. Alles onder één dak.
          </p>
        </Reveal>
      </div>

      <ul className="mt-10 sm:mt-16 border-t border-ink/15">
        {services.map((service, i) => (
          <li key={service.slug}>
            <Reveal delay={i * 0.03}>
              <Link
                to="/diensten"
                hash={service.slug}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-ink/15 py-6 transition-colors hover:bg-ink hover:text-ink-foreground sm:grid-cols-[5rem_1fr_auto] sm:px-4"
              >
                <span className="text-xs font-semibold text-muted-foreground transition-colors group-hover:text-ink-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-3xl sm:text-5xl">{service.title}</span>
                <span className="col-start-2 mt-2 text-sm text-muted-foreground transition-colors group-hover:text-ink-foreground/70 sm:col-start-3 sm:mt-0 sm:text-right">
                  {service.short}
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WorkSection() {
  return (
    <section className="bg-ink py-24 text-ink-foreground sm:py-36" aria-labelledby="werk">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <h2 id="werk" className="display display-1">
          <RevealLines lines={["Uitgelicht", "werk"]} />
        </h2>

        <div className="mt-10 sm:mt-16 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05} className={i % 2 === 1 ? "sm:mt-20" : ""}>
              <Link to="/werk" className="group block">
                <div
                  className={`relative aspect-4/3 overflow-hidden rounded-3xl ${project.color} ${
                    project.color === "bg-ink" ? "ring-1 ring-ink-foreground/20" : ""
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-8"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="display text-center text-[9vw] leading-[0.85] text-ink sm:text-[4vw]">
                      {project.name}
                    </span>
                  </motion.div>
                  <span className="absolute right-5 bottom-5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-ink-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.result}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="text-lg font-semibold">{project.tag}</span>
                  <span className="text-sm text-ink-foreground/50">{project.year}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Magnetic>
            <Link
              to="/werk"
              className="mt-9 sm:mt-14 inline-flex items-center gap-3 rounded-full border border-ink-foreground/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Bekijk al ons werk
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-secondary px-5 py-24 text-secondary-foreground sm:px-8 sm:py-36" aria-labelledby="waarom">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="waarom" className="display max-w-4xl display-1">
          <RevealLines lines={["Klein team.", "Grote uitvoering."]} />
        </h2>
        <p className="mt-8 max-w-xl text-lg text-secondary-foreground/80">
          Geen accountmanagers, geen wachtrijen. Je praat direct met de mensen die ontwerpen en
          bouwen. Daardoor gaat het sneller en blijft het scherp.
        </p>

      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-58%"]);

  return (
    <section aria-labelledby="proces">
      <div className="mx-auto max-w-[1400px] px-5 pt-16 sm:px-8 sm:pt-28 lg:pt-36">
        <h2 id="proces" className="display display-1">
          <RevealLines lines={["Zo werken", "we"]} />
        </h2>
      </div>

      <div ref={ref} className="relative hidden h-[280vh] lg:block">
        <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
          <motion.ol style={{ x }} className="flex gap-8 px-8">
            {processSteps.map((step) => (
              <li
                key={step.number}
                className="flex h-[52vh] w-[70vw] max-w-[720px] shrink-0 flex-col justify-between rounded-3xl border border-ink/15 bg-card p-10"
              >
                <span className="display text-8xl text-primary">{step.number}</span>
                <div>
                  <h3 className="display text-5xl">{step.title}</h3>
                  <p className="mt-4 max-w-md text-lg text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>

      <ol className="mx-auto mt-8 sm:mt-12 grid max-w-[1400px] gap-4 px-5 pb-24 sm:px-8 lg:hidden">
        {processSteps.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.05}>
            <li className="rounded-3xl border border-ink/15 bg-card p-6 sm:p-7">
              <span className="display text-4xl text-primary">{step.number}</span>
              <h3 className="display mt-3 text-3xl">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-36" aria-labelledby="klanten">
      <h2 id="klanten" className="display display-1">
        <RevealLines lines={["Wat klanten", "zeggen"]} />
      </h2>
      <div className="mt-9 sm:mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.07}>
            <figure className="flex h-full flex-col justify-between rounded-3xl border border-ink/15 bg-card p-6 transition-transform sm:p-8 duration-300 hover:-translate-y-2">
              <blockquote className="text-2xl leading-snug font-medium">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-sm text-muted-foreground">
                <span className="block font-semibold text-foreground">{item.name}</span>
                {item.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 sm:pb-36" aria-labelledby="faq">
      <div className="grid gap-7 sm:gap-10 lg:grid-cols-[1fr_1.3fr]">
        <h2 id="faq" className="display display-1">
          <RevealLines lines={["Veel", "gevraagd"]} />
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left text-lg font-semibold">{item.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
