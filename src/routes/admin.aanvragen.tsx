import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { Lead } from "@/types";

export const Route = createFileRoute("/admin/aanvragen")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Aanvragen dashboard | Web Agency Twente" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Intern overzicht van alle chatbot-aanvragen." },
    ],
  }),
  component: AdminLeads,
});

const KEY_STORAGE = "waw-admin-key";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("nl-NL", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function AdminLeads() {
  const [key, setKey] = useState("");
  const [input, setInput] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_STORAGE);
    if (saved) setKey(saved);
  }, []);

  useEffect(() => {
    if (!key) return;
    let active = true;
    setLoading(true);
    setError("");
    fetch("/api/leads", { headers: { "x-admin-key": key } })
      .then(async (r) => {
        const body: unknown = await r.json();
        if (!active) return;
        if (!r.ok) {
          setKey("");
          sessionStorage.removeItem(KEY_STORAGE);
          setError("Wachtwoord klopt niet.");
          return;
        }
        setLeads(body as Lead[]);
      })
      .catch(() => active && setError("Kon de aanvragen niet laden."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [key]);

  const perDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of leads ?? []) {
      const day = l.createdAt.slice(0, 10);
      map.set(day, (map.get(day) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0])).slice(0, 7);
  }, [leads]);

  if (!key) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center gap-4 px-6 py-24">
        <h1 className="text-3xl font-bold">Aanvragen dashboard</h1>
        <p className="text-muted-foreground">Log in met je dashboardwachtwoord.</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            sessionStorage.setItem(KEY_STORAGE, input);
            setKey(input);
            setInput("");
          }}
        >
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Wachtwoord"
            className="rounded-lg border border-border bg-background px-4 py-3"
            autoComplete="current-password"
          />
          <button className="rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground">Inloggen</button>
        </form>
        {error && <p className="text-destructive">{error}</p>}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Chatbot-aanvragen</h1>
          <p className="text-muted-foreground">{leads?.length ?? 0} aanvragen</p>
        </div>
        <button
          className="rounded-lg border border-border px-4 py-2 text-sm"
          onClick={() => {
            sessionStorage.removeItem(KEY_STORAGE);
            setKey("");
            setLeads(null);
          }}
        >
          Uitloggen
        </button>
      </div>

      {perDay.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {perDay.map(([day, count]) => (
            <span key={day} className="rounded-full border border-primary/30 px-3 py-1 text-sm">
              {formatDate(`${day}T12:00:00.000Z`).split(" ").slice(0, 3).join(" ")}: <b>{count}</b>
            </span>
          ))}
        </div>
      )}

      {loading && <p>Laden…</p>}
      {error && <p className="text-destructive">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3">Naam</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Telefoon</th>
              <th className="px-4 py-3">Bericht</th>
              <th className="px-4 py-3">Actie</th>
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((lead) => {
              const message =
                lead.notes ||
                [lead.service, lead.goal, lead.budget, lead.timeline].filter(Boolean).join(" · ") ||
                "—";
              const isOpen = open === lead.id;
              return (
                <tr key={lead.id} className="border-t border-border align-top">
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(lead.createdAt)}</td>
                  <td className="px-4 py-3">
                    {lead.name}
                    {lead.company ? <span className="block text-muted-foreground">{lead.company}</span> : null}
                  </td>
                  <td className="px-4 py-3">
                    <a className="underline" href={`mailto:${lead.email}`}>
                      {lead.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {lead.phone ? (
                      <a className="underline" href={`tel:${lead.phone.replace(/\s/g, "")}`}>
                        {lead.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-left" onClick={() => setOpen(isOpen ? null : lead.id)}>
                      {isOpen ? message : message.slice(0, 80) + (message.length > 80 ? "…" : "")}
                    </button>
                    {isOpen && lead.conversation.length > 0 && (
                      <div className="mt-3 space-y-1 rounded-lg bg-muted/40 p-3 text-xs">
                        {lead.conversation.map((m) => (
                          <p key={m.id}>
                            <b>{m.role === "user" ? "Bezoeker" : "Assistent"}:</b> {m.content}
                          </p>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      className="inline-block whitespace-nowrap rounded-lg bg-primary px-3 py-2 font-semibold text-primary-foreground"
                      href={`mailto:${lead.email}?subject=${encodeURIComponent(
                        "Reactie op je aanvraag bij Web Agency Twente",
                      )}&body=${encodeURIComponent(`Hoi ${lead.name},\n\nBedankt voor je aanvraag.\n\n`)}`}
                    >
                      Antwoorden
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
