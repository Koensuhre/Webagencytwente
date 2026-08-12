import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";

function safeNext(value: unknown): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/";
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({ next: safeNext(search['next']) }),
  head: () => ({
    meta: [
      { title: "Inloggen — Web Agency Twente" },
      {
        name: "description",
        content:
          "Log in of maak een account aan om verbonden apps en AI-assistenten toegang te geven tot Web Agency Twente.",
      },
      { property: "og:title", content: "Inloggen — Web Agency Twente" },
      {
        property: "og:description",
        content: "Log in bij Web Agency Twente om verbonden apps toegang te geven.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) window.location.replace(next);
    });
    return () => {
      active = false;
    };
  }, [next]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${next}` },
      });
      setBusy(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      setNotice("Check je mailbox: bevestig je e-mailadres om verder te gaan.");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    void navigate({ to: next });
  }

  async function handleGoogle() {
    setBusy(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}${next}` },
    });
    if (oauthError) {
      setBusy(false);
      setError(oauthError.message);
    }
  }

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-md px-5 pb-24 pt-36 md:pt-44">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Account</p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-foreground md:text-4xl">
          {mode === "signin" ? "Inloggen" : "Account aanmaken"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Verbonden apps en AI-assistenten krijgen alleen toegang namens een ingelogde gebruiker.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-foreground">
              E-mailadres
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-foreground">
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          ) : null}
          {notice ? <p className="text-sm font-medium text-foreground">{notice}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {mode === "signin" ? "Inloggen" : "Account aanmaken"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={busy}
          className="mt-3 w-full rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition hover:bg-accent disabled:opacity-60"
        >
          Doorgaan met Google
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setNotice(null);
          }}
          className="mt-6 text-sm font-semibold text-primary underline underline-offset-4"
        >
          {mode === "signin" ? "Nog geen account? Registreren" : "Al een account? Inloggen"}
        </button>
      </section>
    </PageShell>
  );
}