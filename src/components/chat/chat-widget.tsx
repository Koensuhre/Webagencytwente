import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatPanel } from "./chat-panel";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setNotice(true), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`mb-3 h-[min(600px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] origin-bottom-right transition ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <ChatPanel
          onClose={() => {
            setOpen(false);
            setTimeout(() => button.current?.focus(), 100);
          }}
        />
      </div>
      <button
        ref={button}
        onClick={() => {
          setOpen((v) => !v);
          setNotice(false);
        }}
        aria-label={open ? "Sluit chat" : "Open chat"}
        aria-expanded={open}
        className="relative ml-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/40 ring-4 ring-secondary/60 transition hover:scale-105 hover:bg-accent hover:ring-primary/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
      >
        {notice && !open && (
          <span
            aria-label="Nieuw bericht"
            className="absolute right-1 top-1 h-3.5 w-3.5 animate-pulse rounded-full bg-accent ring-2 ring-background"
          />
        )}
        <MessageCircle aria-hidden="true" />
      </button>
    </div>
  );
}
