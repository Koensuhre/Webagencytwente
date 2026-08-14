import { createFileRoute } from "@tanstack/react-router";

import { LocalPageTemplate, localPageHead } from "@/components/site/LocalPageTemplate";
import { getLocalPage } from "@/lib/local-pages";

const page = getLocalPage("website-laten-maken-twente");

export const Route = createFileRoute("/website-laten-maken-twente")({
  head: () => localPageHead(page),
  component: () => <LocalPageTemplate page={page} />,
});
