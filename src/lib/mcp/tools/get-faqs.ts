import { defineTool } from "@lovable.dev/mcp-js";
import { faqs, processSteps } from "@/lib/site-data";

export default defineTool({
  name: "get_faqs",
  title: "Veelgestelde vragen",
  description: "Geeft de veelgestelde vragen met antwoorden (o.a. prijzen en doorlooptijd) en de werkwijze in stappen.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ faqs, processSteps }, null, 2) }],
    structuredContent: { faqs, processSteps },
  }),
});
