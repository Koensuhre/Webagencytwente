import { createFileRoute } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { PageShell } from "@/components/site/PageShell";
import { Counter, Reveal, RevealLines } from "@/components/site/motion-primitives";
import { processSteps, stats } from "@/lib/site-data";

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    meta: [
      { title: "Over ons — Web Agency Twente" },
      {
        name: "description",
        content:
          "Wij zijn een klein digital agency uit Twente. Direct contact, snelle rondes en werk waar we onze naam aan verbinden.",
      },
      { property: "og:title", content: "Over ons — Web Agency Twente" },
      { property: "og:description", content: "Klein team, grote uitvoering. Dit is hoe wij werken." },
      { property: "og:url", content: "/over-ons" },
    ],
    links: [{ rel: "canonical", href: "/over-ons" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-16 sm:px-8 sm:pt-48">
        <h1 className="display display-hero">
          <RevealLines lines={["Wij zijn", "Web Agency", "Twente"]} />
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-2xl leading-snug font-medium">
            We maken digitale merken voor ondernemers die iets te vertellen hebben. Vanuit Twente,
            voor klanten door heel Nederland.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              We geloven dat een website meer is dan een digitaal visitekaartje. Het is vaak het
              eerste gesprek dat iemand met jullie merk heeft. Dat gesprek maken we scherp, snel en
              memorabel.
            </p>
            <p>
              Onze aanpak is direct: korte lijnen, wekelijkse rondes en eerlijke adviezen. Als iets
              niet werkt, zeggen we dat. Als iets beter kan, laten we het zien.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="bg-accent px-5 py-20 text-accent-foreground sm:px-8 sm:py-28">
        <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <dt className="display text-5xl sm:text-7xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </dt>
              <dd className="mt-2 text-sm text-accent-foreground/70">{stat.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <h2 className="display display-1">
          <RevealLines lines={["Onze aanpak"]} />
        </h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.05}>
              <li className="h-full rounded-3xl border border-ink/15 bg-card p-8">
                <span className="display text-4xl text-primary">{step.number}</span>
                <h3 className="display mt-3 text-3xl">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaSection />
    </PageShell>
  );
}
