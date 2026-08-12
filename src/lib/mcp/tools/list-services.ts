import { defineTool } from "@lovable.dev/mcp-js";
import { services } from "@/lib/site-data";

export default defineTool({
  name: "list_services",
  title: "Diensten opvragen",
  description: "Geeft alle diensten van Web Agency Twente met slug, titel, korte omschrijving en speerpunten.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const rows = services.map((s) => ({ slug: s.slug, title: s.title, short: s.short, body: s.body, points: s.points }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { services: rows },
    };
  },
});
