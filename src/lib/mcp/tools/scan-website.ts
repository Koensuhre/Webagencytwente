import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "scan_website",
  title: "Website scan",
  description: "Draait dezelfde gratis website scan als op de site: geeft per onderdeel (design, vindbaarheid, conversie) een korte analyse en waar beschikbaar scores.",
  inputSchema: { query: z.string().trim().min(2).max(200).describe("Website-URL of bedrijfsnaam om te scannen.") },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async ({ query }) => {
    const { buildScanResult } = await import("@/lib/scan.server");
    try {
      const result = await buildScanResult(query);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: { result },
      };
    } catch (error) {
      throw new ToolError(`Scan mislukt: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});
