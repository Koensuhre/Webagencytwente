import { createFileRoute } from "@tanstack/react-router";

/**
 * Diagnose-endpoint: laat zien of de mail- en databaseconfiguratie op deze
 * omgeving compleet is. Alleen bereikbaar met de juiste token, en alleen als
 * HEALTH_CHECK_TOKEN is ingesteld. Geeft nooit sleutelwaardes terug.
 */
export const Route = createFileRoute("/api/public/health/email")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const expected = process.env["HEALTH_CHECK_TOKEN"];
        const provided =
          request.headers.get("x-health-token") ??
          new URL(request.url).searchParams.get("token");

        if (!expected || provided !== expected) {
          return new Response("Not found", { status: 404 });
        }

        const has = (name: string) => Boolean(process.env[name]);
        const body = {
          email: {
            resendApiKey: has("RESEND_API_KEY"),
            from: process.env["EMAIL_FROM"] || "Web Agency Twente <info@webagencytwente.nl>",
          },
          database: {
            supabaseUrl: has("SUPABASE_URL"),
            supabasePublishableKey: has("SUPABASE_PUBLISHABLE_KEY"),
          },
          scan: {
            geminiApiKey: has("GEMINI_API_KEY"),
            pagespeedApiKey: has("PAGESPEED_API_KEY"),
          },
        };

        return new Response(JSON.stringify(body, null, 2), {
          status: 200,
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        });
      },
    },
  },
});