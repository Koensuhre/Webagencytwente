import { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, X } from "lucide-react";
import type { ChatMessage, Lead } from "@/types";
import { LeadForm } from "./lead-form";

const initial: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hallo! 👋 Ik help je graag met vragen over websites, webshops, branding, marketing en samenwerking. Waarmee kan ik je helpen?",
  createdAt: new Date().toISOString(),
  choices: [
    "Ik wil een nieuwe website",
    "Ik wil meer leads",
    "Wat kost een website?",
    "Bekijk jullie diensten",
    "Ik wil iemand spreken",
  ],
};

export function ChatPanel({
  onClose,
  embedded = false,
}: {
  onClose?: () => void;
  embedded?: boolean;
}) {
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

  const add = (role: ChatMessage["role"], content: string, choices?: string[]) =>
    setMessages((p) => [
      ...p,
      { id: crypto.randomUUID(), role, content, createdAt: new Date().toISOString(), choices },
    ]);

  async function send(value = text) {
    if (!value.trim() || typing) return;
    setText("");
    add("user", value);
    if (/iemand spreken|gegevens achterlaten|offerte|nieuwe website|meer leads|prijs|kosten/i.test(value.toLowerCase())) {
      setForm(true);
      return;
    }
    setTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });
      const data = (await res.json()) as { answer: string; choices?: string[]; qualify?: boolean };
      if (!res.ok) throw Error();
      add("assistant", data.answer, data.choices);
      if (data.qualify) setForm(true);
    } catch {
      add(
        "assistant",
        "Er is technisch iets misgegaan. Je kunt ons bereiken via info@webagencytwente.nl.",
      );
    } finally {
      setTyping(false);
    }
  }

  function choice(value: string) {
    if (value === "Plan een gesprek") window.open("https://cal.com", "_blank", "noopener,noreferrer");
    else if (value === "Stuur een e-mail") window.location.href = "mailto:hello@studionoord.example";
    else if (value === "Bel ons") window.location.href = "tel:+31201234567";
    else if (value === "Terug naar veelgestelde vragen") add("assistant", "Kies een onderwerp of stel je vraag.", initial.choices);
    else send(value);
  }

  function success(lead: Lead) {
    setForm(false);
    add("assistant", `Bedankt, ${lead.name}! We hebben je aanvraag ontvangen. We nemen zo snel mogelijk contact met je op.`, [
      "Plan een gesprek",
      "Bekijk ons portfolio",
      "Terug naar de website",
    ]);
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
                m.role === "user" ? "bg-brand text-white" : "bg-slate-100 text-slate-800"
              }`}
            >
              {m.content}
            </div>
            <time className="mt-1 block text-xs text-slate-500">
              {new Date(m.createdAt).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}
            </time>
            {m.choices && (
              <div className="mt-2 flex flex-wrap gap-2">
                {m.choices.map((c) => (
                  <button
                    key={c}
                    onClick={() => choice(c)}
                    className="rounded-full border border-brand px-3 py-1.5 text-sm font-medium text-brand hover:bg-teal-50"
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
          <div className="mt-3 rounded-xl border border-teal-100 p-4">
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
          <button aria-label="Verstuur bericht" className="rounded-md bg-brand p-2 text-white">
            <ArrowUp />
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-500">Enter om te versturen · Shift+Enter voor een nieuwe regel</p>
      </form>
    </section>
  );
}
