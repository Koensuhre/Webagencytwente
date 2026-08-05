import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { PageShell } from "@/components/site/PageShell";
import {
  readConfirmationSummary,
  type ConfirmationSummary,
} from "@/lib/contact-confirmation-store";

export const Route = createFileRoute("/bedankt")({
  head: () => ({
    meta: [
      { title: "Bedankt voor je aanvraag — Web Agency Twente" },
      {
        name: "description",
        content:
          "We hebben je aanvraag ontvangen. Bekijk hier de samenvatting van je gegevens — je hoort binnen één werkdag persoonlijk van ons.",
      },
      { property: "og:title", content: "Bedankt voor je aanvraag — Web Agency Twente" },
      {
        property: "og:description",
        content: "Je aanvraag is ontvangen. We nemen binnen één werkdag persoonlijk contact op.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BedanktPage,
});

function BedanktPage() {
  const [summary, setSummary] = useState<ConfirmationSummary | null>(null);

  useEffect(() => {
    setSummary(readConfirmationSummary());
  }, []);

  const firstName = summary?.name?.trim().split(" ")[0] ?? "";

  return (
    <PageShell>
      <section className="mx-auto max-w-[860px] px-5 pt-36 pb-16 sm:px-8 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.1 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl text-primary-foreground"
          >
            ✓
          </motion.span>
          <h1 className="display display-2 mt-10">
            Bedankt{firstName ? ` ${firstName}` : ""}! 🚀
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            We hebben je aanvraag ontvangen en sturen een bevestiging naar
            {summary?.email ? ` ${summary.email}` : " je e-mailadres"}. Een van ons bekijkt je
            idee persoonlijk en neemt meestal binnen één werkdag contact op.
          </p>
        </motion.div>

        {summary ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              Samenvatting van je gegevens
            </h2>
            <dl className="mt-5 divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/15 bg-card">
              {summary.fields.map((field) => (
                <div
                  key={field.label}
                  className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <dt className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                    {field.label}
                  </dt>
                  <dd className="text-base font-semibold sm:text-right">{field.value || "—"}</dd>
                </div>
              ))}
              {summary.message ? (
                <div className="flex flex-col gap-2 px-6 py-5">
                  <dt className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                    Jouw antwoorden
                  </dt>
                  <dd className="text-base whitespace-pre-wrap text-muted-foreground">
                    {summary.message}
                  </dd>
                </div>
              ) : null}
            </dl>
          </motion.div>
        ) : null}

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-13 items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-ink-foreground transition-transform duration-300 hover:scale-105 hover:bg-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
          >
            Terug naar homepage
          </Link>
          <Link
            to="/werk"
            className="inline-flex min-h-13 items-center rounded-full border border-ink/20 px-7 py-4 text-base font-semibold transition-colors hover:border-ink focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none"
          >
            Bekijk ons werk
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
