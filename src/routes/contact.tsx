import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { PageShell } from "@/components/site/PageShell";
import { Magnetic, Reveal, RevealLines } from "@/components/site/motion-primitives";
import { contactSchema, submitContactRequest } from "@/lib/contact.functions";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Web Agency Twente" },
      {
        name: "description",
        content:
          "Vertel ons over jullie project. Binnen één werkdag hoor je van ons. Bellen of mailen mag ook.",
      },
      { property: "og:title", content: "Contact — Web Agency Twente" },
      { property: "og:description", content: "Start een project met Web Agency Twente." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "company" | "service" | "message", string>>;

function ContactPage() {
  const submit = useServerFn(submitContactRequest);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      service: String(form.get("service") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      await submit({ data: parsed.data });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-5 pt-36 pb-24 sm:px-8 sm:pt-48 sm:pb-36">
        <h1 className="display display-hero">
          <RevealLines lines={["Vertel ons", "over je plan"]} />
        </h1>

        <div className="mt-10 sm:mt-16 grid gap-9 sm:gap-14 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-8">
              <p className="text-lg text-muted-foreground">
                Liever direct contact? Bel of mail ons. We reageren binnen één werkdag.
              </p>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                  E-mail
                </p>
                <a
                  href="mailto:hallo@webagencytwente.nl"
                  className="text-xl font-semibold hover:text-primary"
                >
                  hallo@webagencytwente.nl
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                  Telefoon
                </p>
                <a href="tel:+31612345678" className="text-xl font-semibold hover:text-primary">
                  +31 6 12 34 56 78
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                  Werkgebied
                </p>
                <p className="text-xl font-semibold">Enschede, Hengelo, Almelo &amp; heel Nederland</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "done" ? (
              <div className="rounded-3xl bg-ink p-6 text-ink-foreground sm:p-10">
                <p className="display text-4xl">Dankjewel!</p>
                <p className="mt-4 text-lg text-ink-foreground/75">
                  Je aanvraag staat bij ons binnen. We nemen binnen één werkdag contact op.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <Field label="Naam" name="name" error={errors.name} autoComplete="name" required />
                <Field
                  label="E-mailadres"
                  name="email"
                  type="email"
                  error={errors.email}
                  autoComplete="email"
                  required
                />
                <Field label="Bedrijf" name="company" error={errors.company} autoComplete="organization" />

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-semibold">
                    Waar kunnen we mee helpen?
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full rounded-xl border border-ink/20 bg-card px-4 py-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
                  >
                    <option value="">Maak een keuze</option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Iets anders">Iets anders</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                    Je project <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="w-full rounded-xl border border-ink/20 bg-card px-4 py-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-ink-foreground transition-colors hover:bg-primary disabled:opacity-60"
                  >
                    {status === "sending" ? "Versturen…" : "Verstuur aanvraag"}
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </Magnetic>

                <p aria-live="polite" className="min-h-5 text-sm text-destructive">
                  {status === "error" ? "Verzenden mislukt. Probeer het later opnieuw." : ""}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  error?: string | undefined;
  type?: string;
  required?: boolean;
  autoComplete?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-xl border border-ink/20 bg-card px-4 py-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
