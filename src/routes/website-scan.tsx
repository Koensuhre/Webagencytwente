import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { PageShell } from "@/components/site/PageShell";

const WebsiteScanExperience = lazy(() =>
  import("@/components/site/scan/WebsiteScanExperience").then((module) => ({
    default: module.WebsiteScanExperience,
  })),
);

export const Route = createFileRoute("/website-scan")({
  head: () => ({
    meta: [
      { title: "Gratis website scan — beter gevonden worden in Google" },
      {
        name: "description",
        content:
          "Binnen één minuut zie je waar de kansen liggen om hoger in Google te komen. Een live meting van je website SEO plus persoonlijk advies van Web Agency Twente.",
      },
      { property: "og:title", content: "Gratis website scan — beter gevonden worden in Google" },
      {
        property: "og:description",
        content:
          "Scan jouw website op design, vindbaarheid en conversie en ontvang persoonlijk advies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/website-scan" },
    ],
    links: [{ rel: "canonical", href: "/website-scan" }],
  }),
  component: WebsiteScanPage,
});

function WebsiteScanPage() {
  return (
    <PageShell>
      <div className="relative overflow-hidden">
        <div className="grain-blob floaty pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/25" />
        <div className="grain-blob floaty pointer-events-none absolute top-1/3 -right-40 h-[26rem] w-[26rem] rounded-full bg-accent/20" />
        <Suspense fallback={<div className="min-h-[78vh]" aria-hidden="true" />}>
          <WebsiteScanExperience />
        </Suspense>
      </div>
    </PageShell>
  );
}