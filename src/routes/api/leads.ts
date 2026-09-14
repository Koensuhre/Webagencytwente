import { createFileRoute } from "@tanstack/react-router";
import { createLeadFromBody, listLeadsForAdmin, patchLeadStatus } from "@/server/leads";
import type { LeadStatus } from "@/types";

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const result = await listLeadsForAdmin(request.headers.get("x-admin-key"));
        return Response.json(result.body, { status: result.status });
      },
      POST: async ({ request }) => {
        const raw: unknown = await request.json();
        const result = await createLeadFromBody(raw);
        return Response.json(result.body, { status: result.status });
      },
      PATCH: async ({ request }) => {
        const body = (await request.json()) as { id?: string; status?: LeadStatus };
        const result = await patchLeadStatus(request.headers.get("x-admin-key"), body.id, body.status);
        return Response.json(result.body, { status: result.status });
      },
    },
  },
});
