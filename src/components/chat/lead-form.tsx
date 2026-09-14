import { useState } from "react";
import { leadSchema, type LeadInput } from "@/lib/validation";
import type { ChatMessage, Lead } from "@/types";

const steps: [keyof LeadInput, string, string[]][] = [
  [
    "service",
    "Waar kunnen we je mee helpen?",
    ["Nieuwe website", "Webshop", "SEO", "Online marketing", "Branding", "Onderhoud / optimalisatie", "Anders"],
  ],
  [
    "goal",
    "Wat wil je met dit project bereiken?",
    [
      "Meer aanvragen",
      "Online verkopen",
      "Professionelere uitstraling",
      "Beter vindbaar worden",
      "Een bestaande website verbeteren",
    ],
  ],
  [
    "hasWebsite",
    "Heb je al een website?",
    ["Ja, en ik wil deze verbeteren", "Ja, maar ik wil opnieuw beginnen", "Nee, nog niet", "Weet ik niet"],
  ],
  [
    "budget",
    "Wat is je indicatieve budget?",
    ["Minder dan €2.500", "€2.500–€5.000", "€5.000–€10.000", "Meer dan €10.000", "Ik wil eerst advies"],
  ],
  ["timeline", "Wanneer wil je ongeveer starten?", ["Zo snel mogelijk", "Binnen 1 maand", "Binnen 3 maanden", "Later / oriënterend"]],
];

const empty: LeadInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  goal: "",
  hasWebsite: "",
  websiteUrl: "",
  budget: "",
  timeline: "",
  notes: "",
  consent: false,
  website: "",
  conversation: [],
};

export function LeadForm({
  conversation,
  onSuccess,
  onCancel,
}: {
  conversation: ChatMessage[];
  onSuccess: (l: Lead) => void;
  onCancel: () => void;
}) {
  const [d, setD] = useState<LeadInput>({ ...empty, conversation });
  const [i, setI] = useState(0);
  const [review, setReview] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const set = (k: keyof LeadInput, v: string | boolean) => setD((x) => ({ ...x, [k]: v }));
  const validate = () => leadSchema.safeParse({ ...d, conversation });

  const send = async () => {
    const p = validate();
    if (!p.success) return setError(p.error.issues[0]?.message || "Controleer je gegevens.");
    setSending(true);
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, conversation }),
      });
      const x = (await r.json()) as Lead | { error: string };
      if (!r.ok) throw Error("error" in x ? x.error : "Opslaan mislukt");
      const lead = x as Lead;
      trackEvent("chatbot_lead", {
        method: "chatbot",
        service: lead.service,
        budget: lead.budget,
        timeline: lead.timeline,
        lead_label: lead.label,
        lead_score: lead.score,
      });
      trackEvent("generate_lead", { method: "chatbot", value: lead.score, currency: "EUR" });
      onSuccess(lead);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Er ging iets mis.");
    } finally {
      setSending(false);
    }
  };

  if (review) {
    return (
      <section className="space-y-3 rounded bg-slate-50 p-4 text-sm">
        <b>Controleer je aanvraag</b>
        <p>
          {d.service} · {d.goal}
          <br />
          {d.budget} · {d.timeline}
          <br />
          {d.name} · {d.email}
        </p>
        {error && (
          <p role="alert" className="text-red-700">
            {error}
          </p>
        )}
        <button disabled={sending} onClick={send} className="rounded bg-primary px-4 py-2 text-white">
          {sending ? "Versturen…" : "Verstuur aanvraag"}
        </button>{" "}
        <button onClick={() => setReview(false)} className="underline">
          Gegevens aanpassen
        </button>
      </section>
    );
  }

  if (i < 5) {
    const [k, q, opts] = steps[i] as [keyof LeadInput, string, string[]];
    return (
      <section className="space-y-3">
        <p className="text-sm text-slate-600">Vraag {i + 1} van 5. Dit helpt ons je gerichter te adviseren.</p>
        <h3 className="font-semibold">{q}</h3>
        {i === 2 && d.hasWebsite.startsWith("Ja") ? (
          <>
            <input
              value={d.websiteUrl}
              onChange={(e) => set("websiteUrl", e.target.value)}
              placeholder="https://jouwdomein.nl (optioneel)"
              className="w-full rounded border p-2"
            />
            <button onClick={() => setI(3)} className="rounded bg-primary px-4 py-2 text-white">
              Volgende
            </button>
          </>
        ) : (
          <div className="flex flex-wrap gap-2">
            {opts.map((x) => (
              <button
                key={x}
                onClick={() => {
                  set(k, x);
                  setI((n) => n + 1);
                }}
                className="rounded-full border border-primary px-3 py-2 text-sm text-primary"
              >
                {x}
              </button>
            ))}
          </div>
        )}
        <button onClick={() => (i ? setI((n) => n - 1) : onCancel())} className="text-sm underline">
          {i ? "Vorige vraag" : "Terug"}
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <p className="text-sm text-slate-600">Bijna klaar. Naam en e-mail zijn nodig voor opvolging.</p>
      {(
        [
          ["name", "Naam *"],
          ["email", "E-mail *"],
          ["phone", "Telefoonnummer (optioneel)"],
          ["company", "Bedrijfsnaam (optioneel)"],
          ["notes", "Extra toelichting (optioneel)"],
        ] as const
      ).map(([k, label]) => (
        <label key={k} className="block text-sm">
          {label}
          <input
            value={String(d[k] || "")}
            onChange={(e) => set(k, e.target.value)}
            className="mt-1 w-full rounded border p-2"
          />
        </label>
      ))}
      <input
        value={d.website}
        onChange={(e) => set("website", e.target.value)}
        aria-hidden="true"
        tabIndex={-1}
        className="hidden"
      />
      <label className="flex gap-2 text-sm">
        <input checked={d.consent} onChange={(e) => set("consent", e.target.checked)} type="checkbox" />
        Ik geef toestemming om contact op te nemen.{" "}
        <a className="underline" href="/#privacy">
          Privacyverklaring
        </a>
      </label>
      {error && (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      )}
      <button
        onClick={() => {
          const p = validate();
          p.success ? setReview(true) : setError(p.error.issues[0]?.message || "Controleer je gegevens.");
        }}
        className="rounded bg-primary px-4 py-2 text-white"
      >
        Bekijk samenvatting
      </button>
    </section>
  );
}
