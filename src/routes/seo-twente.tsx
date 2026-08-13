import { createFileRoute } from "@tanstack/react-router";

import { LocalPageTemplate, localPageHead } from "@/components/site/LocalPageTemplate";
import { getLocalPage } from "@/lib/local-pages";

const page = getLocalPage("seo-twente");

export const Route = createFileRoute("/seo-twente")({
  head: () => localPageHead(page),
  component: () => <LocalPageTemplate page={page} />,
});
