import { createFileRoute } from "@tanstack/react-router";
import { handleChatMessage } from "@/server/chat";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { message?: unknown };
        const result = handleChatMessage(typeof body.message === "string" ? body.message : "");
        if ("error" in result && result.error && !("answer" in result)) {
          return Response.json({ error: result.error }, { status: 400 });
        }
        return Response.json(result);
      },
    },
  },
});
