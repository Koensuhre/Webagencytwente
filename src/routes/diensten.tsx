import { Link, createFileRoute } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, RevealLines } from "@/components/site/motion-primitives";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/diensten")({
  head: () => ({
    meta: [
      { title: "Diensten — webdesign, webshops & SEO in Twente" },
      {
        name: "description",
        content:
          "Webdesign, web development, webshops, branding, logo laten ontwerpen, SEO, local SEO en AI search. Alles wat jullie merk online nodig heeft, vanuit Twente.",
      },
      { property: "og:title", content: "Diensten — webdesign, webshops & SEO in Twente" },
      {
        property: "og:description",
        content: "Webdesign, development, webshops, merk en online vindbaarheid onder één dak.",
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
      <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-12 sm:px-8 sm:pt-40 sm:pb-16 lg:pt-48">
        <h1 className="display display-hero">
          <RevealLines lines={["Diensten"]} />
        </h1>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Wij nemen het hele digitale plaatje: hoe het eruitziet, hoe het werkt en hoe mensen het
            vinden. Een website of webshop laten maken in Twente, een logo laten ontwerpen of
            zoekmachine optimalisatie — het kan los, en het werkt het beste samen..
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

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 sm:pb-36">
        <h2 className="display text-4xl sm:text-6xl">In de regio</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Zoek je iets specifieks in jouw plaats? Deze pagina&apos;s gaan er dieper op in.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            to="/webdesign-enschede"
            className="rounded-3xl border border-ink/15 p-6 text-lg font-semibold transition-colors hover:bg-ink hover:text-ink-foreground"
          >
            Webdesign Enschede <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            to="/seo-twente"
            className="rounded-3xl border border-ink/15 p-6 text-lg font-semibold transition-colors hover:bg-ink hover:text-ink-foreground"
          >
            SEO Twente <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            to="/webshop-laten-maken-almelo"
            className="rounded-3xl border border-ink/15 p-6 text-lg font-semibold transition-colors hover:bg-ink hover:text-ink-foreground"
          >
            Webshop laten maken Almelo <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <CtaSection />
    </PageShell>
  );
}
