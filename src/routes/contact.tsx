import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { PageShell } from "@/components/site/PageShell";
import { RevealLines } from "@/components/site/motion-primitives";
import { IntakeFlow } from "@/components/site/contact/IntakeFlow";
import { QuickMessageForm } from "@/components/site/contact/QuickMessageForm";
import { RouteChooser } from "@/components/site/contact/RouteChooser";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — website laten maken in Twente" },
      {
        name: "description",
        content:
          "Website, webshop of SEO nodig in Twente? Doe de korte intake of stuur ons direct een bericht — je hoort binnen één werkdag persoonlijk van ons.",
      },
      { property: "og:title", content: "Contact — website laten maken in Twente" },
      {
        property: "og:description",
        content: "Start een project met Web Agency Twente via onze korte intake of een kort bericht.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type Mode = "choose" | "intake" | "quick";

function ContactPage() {
  const [mode, setMode] = useState<Mode>("choose");

  return (
    <PageShell>
      <section className="mx-auto max-w-[1200px] px-5 pt-36 pb-16 sm:px-8 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36">
        <AnimatePresence mode="wait" initial={false}>
          {mode === "choose" ? (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="display display-hero">
                <RevealLines lines={["Vertel ons over", "jouw idee."]} />
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:mt-8 sm:text-xl">
                Heb je een concreet plan, een vraag of wil je gewoon even sparren? Kies wat bij jou
                past.
              </p>
              <div className="mt-12 sm:mt-16">
                <RouteChooser onChoose={setMode} />
              </div>
              <p className="mt-12 text-base text-muted-foreground">
                Liever direct contact?{" "}
                <a href="mailto:info@webagencytwente.nl" className="font-semibold hover:text-primary">
                  info@webagencytwente.nl
                </a>{" "}
                ·{" "}
                <a href="tel:+31623816297" className="font-semibold hover:text-primary">
                  +31 6 23 81 62 97
                </a>
              </p>
            </motion.div>
          ) : mode === "intake" ? (
            <motion.div
              key="intake"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="sr-only">Creatieve intake — Web Agency Twente</h1>
              <IntakeFlow onBack={() => setMode("choose")} />
            </motion.div>
          ) : (
            <motion.div
              key="quick"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="sr-only">Stuur ons een bericht — Web Agency Twente</h1>
              <QuickMessageForm onBack={() => setMode("choose")} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageShell>
  );
}
