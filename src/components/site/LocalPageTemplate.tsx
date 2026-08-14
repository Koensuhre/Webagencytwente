import { Link } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { PageShell } from "@/components/site/PageShell";
import { Magnetic, Reveal, RevealLines } from "@/components/site/motion-primitives";
import type { LocalPage } from "@/lib/local-pages";
import { processSteps } from "@/lib/site-data";

const BASE_URL = "https://webagencytwente.nl";

export function localPageHead(page: LocalPage) {
  const url = `${BASE_URL}/${page.slug}`;
  const businessId = `${BASE_URL}/#organization`;
  return {
    meta: [
      { title: page.metaTitle },
      { name: "description", content: page.metaDescription },
      { property: "og:title", content: page.ogTitle },
      { property: "og:description", content: page.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
              "@id": businessId,
              name: "Web Agency Twente",
              url: BASE_URL,
              email: "hallo@webagencytwente.nl",
              telephone: "+31612345678",
              image: `${BASE_URL}/favicon.png`,
              priceRange: "€€",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Enschede",
                addressRegion: "Overijssel",
                addressCountry: "NL",
              },
              areaServed: page.areaServed.map((name) => ({ "@type": "Place", name })),
              knowsAbout: [
                "webdesign",
                "web development",
                "webshop laten maken",
                "branding",
                "SEO",
                "local SEO",
                "answer engine optimalisation",
              ],
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
                { "@type": "ListItem", position: 2, name: "Diensten", item: `${BASE_URL}/diensten` },
                { "@type": "ListItem", position: 3, name: page.breadcrumbLabel, item: url },
              ],
            },
            {
              "@type": "Service",
              name: page.serviceName,
              serviceType: page.serviceName,
              url,
              areaServed: page.areaServed.map((name) => ({ "@type": "Place", name })),
              provider: { "@id": businessId },
            },
            {
              "@type": "FAQPage",
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ],
        }),
      },
    ],
  };
}

export function LocalPageTemplate({ page }: { page: LocalPage }) {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-12 sm:px-8 sm:pt-40 sm:pb-16 lg:pt-48">
        <nav aria-label="Kruimelpad" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/diensten" className="hover:text-foreground">
                Diensten
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {page.breadcrumbLabel}
            </li>
          </ol>
        </nav>
        <Reveal>
          <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{page.eyebrow}</p>
        </Reveal>
        <h1 className="display display-hero mt-4">
          <RevealLines lines={page.h1Lines} />
        </h1>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{page.intro}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.4}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Plan een kennismaking
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </Magnetic>
            <Link
              to="/website-scan"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-4 text-base font-semibold transition-colors hover:bg-ink hover:text-ink-foreground"
            >
              Doe de gratis scan
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <h2 className="display text-4xl sm:text-6xl">{page.blocksTitle}</h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-ink/15 sm:grid-cols-2">
          {page.blocks.map((block, i) => (
            <Reveal key={block.title} delay={0.04 * i}>
              <article className="h-full bg-background p-7 sm:p-10">
                <h3 className="text-xl font-bold sm:text-2xl">{block.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{block.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink px-5 py-20 text-ink-foreground sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="display text-4xl sm:text-6xl">{page.contextTitle}</h2>
          </Reveal>
          <div className="mt-8 grid max-w-4xl gap-6">
            {page.contextParagraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.05 * i}>
                <p className="text-lg leading-relaxed text-ink-foreground/75">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <h2 className="display text-4xl sm:text-6xl">Zo werken we</h2>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={0.04 * i}>
              <div className="border-t border-ink/15 pt-5">
                <span className="text-xs font-semibold text-muted-foreground">{step.number}</span>
                <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <h2 className="display text-4xl sm:text-6xl">{page.priceTitle}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{page.priceIntro}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {page.priceRows.map((row, i) => (
            <Reveal key={row.label} delay={0.04 * i}>
              <div className="h-full rounded-3xl border border-ink/15 p-7 sm:p-8">
                <p className="text-sm font-semibold text-muted-foreground">{row.label}</p>
                <p className="display mt-2 text-3xl sm:text-4xl">{row.price}</p>
                <p className="mt-3 text-base text-muted-foreground">{row.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <h2 className="display text-4xl sm:text-6xl">Veelgestelde vragen</h2>
        </Reveal>
        <div className="mt-10 max-w-3xl">
          {page.faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={0.03 * i}>
              <details className="group border-t border-ink/15 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </PageShell>
  );
}
