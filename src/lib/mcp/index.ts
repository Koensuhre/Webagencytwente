import { auth, defineMcp } from "@lovable.dev/mcp-js";

import getFaqsTool from "./tools/get-faqs";
import getServiceTool from "./tools/get-service";
import listProjectsTool from "./tools/list-projects";
import listServicesTool from "./tools/list-services";
import scanWebsiteTool from "./tools/scan-website";

// The OAuth issuer must be the direct Supabase host (the proxy URL fails RFC 8414
// issuer matching). The project ref is inlined by Vite at build time.
const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "web-agency-twente",
  title: "Web Agency Twente",
  version: "0.1.0",
  instructions:
    "Tools van Web Agency Twente (webdesign, development, branding en SEO in Twente). Gebruik list_services en get_service voor het dienstenaanbod, list_projects voor cases, get_faqs voor prijzen en werkwijze, en scan_website om een website snel te laten analyseren.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listServicesTool, getServiceTool, listProjectsTool, getFaqsTool, scanWebsiteTool] as unknown as Parameters<typeof defineMcp>[0]["tools"],
});
