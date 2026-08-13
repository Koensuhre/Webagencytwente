import { createFileRoute } from "@tanstack/react-router";

import { LocalPageTemplate, localPageHead } from "@/components/site/LocalPageTemplate";
import { getLocalPage } from "@/lib/local-pages";

const page = getLocalPage("webshop-laten-maken-almelo");

export const Route = createFileRoute("/webshop-laten-maken-almelo")({
  head: () => localPageHead(page),
  component: () => <LocalPageTemplate page={page} />,
});
