import { defineTool } from "@lovable.dev/mcp-js";
import { projects, clients } from "@/lib/site-data";

export default defineTool({
  name: "list_projects",
  title: "Werk opvragen",
  description: "Geeft de gepubliceerde cases van Web Agency Twente en de klantenlijst.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ projects, clients }, null, 2) }],
    structuredContent: { projects, clients },
  }),
});
