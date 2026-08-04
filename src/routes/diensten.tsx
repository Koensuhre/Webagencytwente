import { createFileRoute } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealLines } from "@/components/site/motion-primitives";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/diensten")({
  head: () => ({
    meta: [
      { title: "Diensten — Web Agency Twente" },
      {
        name: "description",
        content:
          "Web design, development, branding, logo, huisstijl, SEO, local SEO, AI search en onderhoud. Alles wat jullie merk online nodig heeft.",
      },
      { property: "og:title", content: "Diensten — Web Agency Twente" },
      {
        property: "og:description",
        content: "Design, development, merk en vindbaarheid onder één dak.",
      },
      { property: "og:url", content: "/diensten" },
    ],
    links: [{ rel: "canonical", href: "/diensten" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-16 sm:px-8 sm:pt-48">
        <h1 className="display display-hero">
          <RevealLines lines={["Diensten"]} />
        </h1>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Wij nemen het hele digitale plaatje: hoe het eruitziet, hoe het werkt en hoe mensen het
            vinden.
          </p>
        </Reveal>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 sm:pb-36">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={0.03 * i}>
            <article
              id={service.slug}
              className="grid scroll-mt-28 gap-6 border-t border-ink/15 py-12 lg:grid-cols-[1fr_1.2fr]"
            >
              <div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display mt-2 text-4xl sm:text-6xl">{service.title}</h2>
              </div>
              <div>
                <p className="text-2xl leading-snug font-medium">{service.short}</p>
                <p className="mt-4 text-lg text-muted-foreground">{service.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-ink/20 px-4 py-1.5 text-sm font-medium"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <CtaSection />
    </PageShell>
  );
}
