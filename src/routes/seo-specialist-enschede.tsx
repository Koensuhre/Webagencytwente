import { createFileRoute } from "@tanstack/react-router";

import { LocalPageTemplate, localPageHead } from "@/components/site/LocalPageTemplate";
import { getLocalPage } from "@/lib/local-pages";

const page = getLocalPage("seo-specialist-enschede");

export const Route = createFileRoute("/seo-specialist-enschede")({
  head: () => localPageHead(page),
  component: () => <LocalPageTemplate page={page} />,
});
