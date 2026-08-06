import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { PageShell } from "@/components/site/PageShell";
import { sendAuthTestEmailFn } from "@/lib/auth-email-test.functions";
import {
  AUTH_EMAIL_LABELS,
  AUTH_EMAIL_TYPES,
  type AuthEmailType,
} from "@/lib/auth-email-test.shared";

export const Route = createFileRoute("/email-test")({
  head: () => ({
    meta: [
      { title: "Auth e-mail test — Web Agency Twente" },
      {
        name: "description",
        content:
          "Interne testpagina om alle zes authenticatie-e-mails te versturen en de volledige flow te verifiëren.",
      },
      { property: "og:title", content: "Auth e-mail test — Web Agency Twente" },
      {
        property: "og:description",
        content: "Verstuur testmails voor alle zes authenticatie-e-mailtypen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EmailTestPage,
});

type Status = { state: "ok" | "error"; message: string };

function EmailTestPage() {
  const send = useServerFn(sendAuthTestEmailFn);
  const [to, setTo] = useState("info@webagencytwente.nl");
  const [pending, setPending] = useState<AuthEmailType | null>(null);
  const [status, setStatus] = useState<Partial<Record<AuthEmailType, Status>>>({});

  async function handleSend(type: AuthEmailType) {
    setPending(type);
    setStatus((s) => ({ ...s, [type]: undefined }));
    try {
      const result = await send({ data: { type, to } });
      setStatus((s) => ({
        ...s,
        [type]: result.sent
          ? { state: "ok", message: `Verstuurd naar ${to}` }
          : { state: "error", message: result.reason ?? "Niet verstuurd" },
      }));
    } catch (error) {
      setStatus((s) => ({
        ...s,
        [type]: {
          state: "error",
          message: error instanceof Error ? error.message : "Versturen mislukt",
        },
      }));
    } finally {
      setPending(null);
    }
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-[900px] px-5 pt-36 pb-16 sm:px-8 sm:pt-40 sm:pb-28">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Intern
        </p>
        <h1 className="display display-2 mt-4">Auth e-mail test</h1>
        <p className="mt-4 max-w-[52ch] text-muted-foreground">
          Verstuur een testversie van elk van de zes authenticatie-e-mails. De links en codes zijn
          voorbeeldwaarden — zo controleer je opmaak, afzender en aflevering zonder een echte
          account-actie uit te voeren.
        </p>

        <label className="mt-10 block text-sm font-semibold" htmlFor="test-recipient">
          Ontvanger
        </label>
        <input
          id="test-recipient"
          type="email"
          inputMode="email"
          value={to}
          onChange={(event) => setTo(event.target.value)}
          className="mt-2 w-full max-w-md rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Alleen adressen op webagencytwente.nl zijn toegestaan.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {AUTH_EMAIL_TYPES.map((type) => {
            const label = AUTH_EMAIL_LABELS[type];
            const result = status[type];
            return (
              <div
                key={type}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5"
              >
                <div>
                  <h2 className="text-lg font-semibold">{label.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{label.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSend(type)}
                  disabled={pending !== null}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                >
                  {pending === type ? "Versturen…" : "Stuur testmail"}
                </button>
                {result ? (
                  <p
                    role="status"
                    className={`mt-3 text-sm ${
                      result.state === "ok" ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {result.message}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
