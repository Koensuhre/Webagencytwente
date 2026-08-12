import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { services } from "@/lib/site-data";

export default defineTool({
  name: "get_service",
  title: "Dienst opvragen",
  description: "Geeft de details van één dienst op basis van de slug (bijv. 'seo' of 'webshops').",
  inputSchema: { slug: z.string().trim().min(1).describe("Slug van de dienst, zoals 'web-design'.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const service = services.find((s) => s.slug === slug.toLowerCase());
    if (!service) {
      throw new ToolError(`Onbekende dienst '${slug}'. Beschikbaar: ${services.map((s) => s.slug).join(", ")}`);
    }
    return {
      content: [{ type: "text", text: JSON.stringify(service, null, 2) }],
      structuredContent: { service },
    };
  },
});
