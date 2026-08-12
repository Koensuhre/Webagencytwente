import { defineMcp } from "@lovable.dev/mcp-js";

import getFaqsTool from "./tools/get-faqs";
import getServiceTool from "./tools/get-service";
import listProjectsTool from "./tools/list-projects";
import listServicesTool from "./tools/list-services";
import scanWebsiteTool from "./tools/scan-website";

export default defineMcp({
  name: "web-agency-twente",
  title: "Web Agency Twente",
  version: "0.1.0",
  instructions:
    "Tools van Web Agency Twente (webdesign, development, branding en SEO in Twente). Gebruik list_services en get_service voor het dienstenaanbod, list_projects voor cases, get_faqs voor prijzen en werkwijze, en scan_website om een website snel te laten analyseren.",
  tools: [listServicesTool, getServiceTool, listProjectsTool, getFaqsTool, scanWebsiteTool] as unknown as Parameters<typeof defineMcp>[0]["tools"],
});
