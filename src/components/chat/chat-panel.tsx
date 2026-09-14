import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUp, Bot, X } from "lucide-react";
import type { ChatMessage, Lead } from "@/types";
import { LeadForm } from "./lead-form";

const welcomeChoices = [
  "Kunnen jullie een nieuwe website maken?",
  "Maken jullie ook webshops?",
  "Helpen jullie met SEO?",
  "Wat kost een website?",
];

const welcomeActions = ["Laat mijn gegevens achter", "Gratis website scan"];

const initial: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hallo! 👋 Ik beantwoord vragen over websites, webshops, SEO, prijzen en samenwerken. Kies een vraag hieronder of typ je eigen vraag.",
  createdAt: new Date().toISOString(),
  choices: welcomeChoices,
  actions: welcomeActions,
};

export function ChatPanel({
  onClose,
  embedded = false,
}: {
  onClose?: () => void;
  embedded?: boolean;
}) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([initial]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [form, setForm] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bureau-chat-history");
    if (saved) {
      try {
        setMessages(JSON.parse(saved) as ChatMessage[]);
      } catch {
        /* ignore corrupt history */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bureau-chat-history", JSON.stringify(messages));
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, form]);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const add = (
    role: ChatMessage["role"],
    content: string,
    choices?: string[],
    actions?: string[],
  ) =>
    setMessages((p) => [
      ...p,
      { id: crypto.randomUUID(), role, content, createdAt: new Date().toISOString(), choices, actions },
    ]);

  async function send(value = text) {
    if (!value.trim() || typing) return;
    setText("");
    setForm(false);
    add("user", value);
    setTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });
      const data = (await res.json()) as { answer: string; choices?: string[]; actions?: string[] };
      if (!res.ok) throw Error();
      add("assistant", data.answer, data.choices, data.actions);
    } catch {
      add(
        "assistant",
        "Er is technisch iets misgegaan. Je kunt ons bereiken via info@webagencytwente.nl of 06 23 81 62 97.",
        [],
        ["Stuur een e-mail", "Bel ons"],
      );
    } finally {
      setTyping(false);
    }
  }

  const actionHandlers: Record<string, () => void> = {
    "Laat mijn gegevens achter": () => {
      setForm(true);
      add("assistant", "Top! Ik stel je een paar korte vragen, dan kan een collega je gericht helpen.");
    },
    "Gratis website scan": () => {
      onClose?.();
      void navigate({ to: "/website-scan" });
    },
    "Bekijk onze diensten": () => {
      onClose?.();
      void navigate({ to: "/diensten" });
    },
    "Bekijk ons werk": () => {
      onClose?.();
      void navigate({ to: "/werk" });
    },
    "Naar de contactpagina": () => {
      onClose?.();
      void navigate({ to: "/contact" });
    },
    "Stuur een e-mail": () => {
      window.location.href = "mailto:info@webagencytwente.nl";
    },
    "Bel ons": () => {
      window.location.href = "tel:+31623816297";
    },
    "Terug naar het begin": () => {
      setForm(false);
      add("assistant", "Geen probleem. Kies een onderwerp of stel je eigen vraag.", welcomeChoices, welcomeActions);
    },
  };

  function choice(value: string) {
    const handler = actionHandlers[value];
    if (handler) handler();
    else send(value);
  }

  function success(lead: Lead) {
    setForm(false);
    add(
      "assistant",
      `Bedankt, ${lead.name}! Je aanvraag staat bij ons binnen. We nemen zo snel mogelijk contact met je op via ${lead.email}.`,
      ["Hoe werkt samenwerken?", "Hoe lang duurt een websiteproject?"],
      ["Bekijk ons werk", "Terug naar het begin"],
    );
  }

  return (
    <section
      aria-label="Chat met Web Agency Twente"
      className={`flex h-full flex-col overflow-hidden bg-white ${
        embedded ? "rounded-xl border shadow-sm" : "rounded-2xl shadow-2xl"
      }`}
    >
      <header className="flex items-center justify-between bg-ink px-4 py-3 text-white">
        <span className="flex items-center gap-2 font-semibold">
          <Bot aria-hidden="true" /> Web Agency Twente assistent
        </span>
        {onClose && (
          <button onClick={onClose} aria-label="Chat sluiten" className="rounded p-1 hover:bg-white/15">
            <X />
          </button>
        )}
      </header>
      <div className="flex-1 overflow-y-auto p-4" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block max-w-[90%] rounded-2xl px-3 py-2 text-left text-sm ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-slate-100 text-slate-800"
              }`}
            >
              {m.content}
            </div>
            <time className="mt-1 block text-xs text-slate-500">
              {new Date(m.createdAt).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}
            </time>
            {m.choices && m.choices.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {m.choices.map((c) => (
                  <button
                    key={c}
                    onClick={() => choice(c)}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-primary hover:text-primary"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            {m.actions && m.actions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {m.actions.map((c) => (
                  <button
                    key={c}
                    onClick={() => choice(c)}
                    className="rounded-full border border-primary bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-accent hover:border-accent"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {typing && <div className="inline-block rounded-2xl bg-slate-100 px-3 py-2 text-sm">Aan het typen…</div>}
        {form && (
          <div className="mt-3 rounded-xl border border-primary/30 p-4">
            <LeadForm conversation={messages} onSuccess={success} onCancel={() => setForm(false)} />
          </div>
        )}
        <div ref={bottom} />
      </div>
      <form
        className="border-t p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <label className="sr-only" htmlFor="chat-input">
          Je bericht
        </label>
        <div className="flex gap-2">
          <textarea
            id="chat-input"
            ref={input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Typ je vraag…"
            className="min-h-10 flex-1 resize-none rounded-md border border-slate-300 p-2"
          />
          <button aria-label="Verstuur bericht" className="rounded-md bg-primary p-2 text-white">
            <ArrowUp />
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-500">Enter om te versturen · Shift+Enter voor een nieuwe regel</p>
      </form>
    </section>
  );
}
