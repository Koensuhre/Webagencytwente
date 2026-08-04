import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { useState } from "react";

import { scanLeadSchema, submitScanLead } from "@/lib/scan.functions";

type FieldKey = "name" | "company" | "email" | "website" | "wishes";
type Errors = Partial<Record<FieldKey, string>>;

export function ScanLeadForm({
  defaultWebsite,
  ambition,
  summary,
}: {
  defaultWebsite: string;
  ambition: string;
  summary: string;
}) {
  const submit = useServerFn(submitScanLead);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      website: String(form.get("website") ?? ""),
      wishes: String(form.get("wishes") ?? ""),
      ambition,
      summary,
    };

    const parsed = scanLeadSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldKey;
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

  if (status === "done") return <ScanSuccess />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-20 max-w-[1200px] px-5 pb-24 sm:mt-36 sm:px-8 sm:pb-28"
      aria-labelledby="scan-advies"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-5 py-10 text-ink-foreground sm:rounded-[2rem] sm:px-14 sm:py-16">
        <div className="grain-blob floaty pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-primary/50" />
        <div className="relative grid gap-7 sm:gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-8 sm:gap-12">
          <div>
            <h2 id="scan-advies" className="display display-2">
              Wij hebben nu al ideeën voor jouw website.
            </h2>
            <p className="mt-6 max-w-md text-base text-ink-foreground/75 sm:text-lg">
              Laat hieronder je gegevens achter. We nemen persoonlijk contact met je op en laten zien
              welke verbeteringen wij als eerste zouden doorvoeren.
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <Field label="Naam" name="name" autoComplete="name" error={errors.name} />
            <Field
              label="Bedrijfsnaam"
              name="company"
              autoComplete="organization"
              error={errors.company}
            />
            <Field
              label="E-mailadres"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              error={errors.email}
            />
            <Field
              label="Website"
              name="website"
              autoComplete="url"
              inputMode="url"
              defaultValue={defaultWebsite}
              error={errors.website}
            />
            <Field
              label="Extra wensen (optioneel)"
              name="wishes"
              textarea
              error={errors.wishes}
              className="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:outline-none disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Versturen…" : "Ontvang mijn persoonlijke advies"}
              </motion.button>
              {status === "error" ? (
                <p role="alert" className="mt-3 text-sm text-secondary">
                  Verzenden lukte niet. Probeer het zo nog eens of mail ons direct.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  defaultValue,
  error,
  textarea = false,
  className,
}: {
  label: string;
  name: FieldKey;
  type?: string;
  autoComplete?: string | undefined;
  inputMode?: "email" | "url" | "text" | undefined;
  defaultValue?: string | undefined;
  error?: string | undefined;
  textarea?: boolean;
  className?: string | undefined;
}) {
  const id = `scan-${name}`;
  const shared =
    "mt-2 w-full min-w-0 rounded-2xl border border-ink-foreground/20 bg-ink-foreground/5 px-4 py-3.5 text-base text-ink-foreground outline-none transition-all duration-300 placeholder:text-ink-foreground/40 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/30 sm:px-5";

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-ink-foreground/70">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          className={shared}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-fout` : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          autoCapitalize={inputMode === "email" || inputMode === "url" ? "none" : undefined}
          defaultValue={defaultValue}
          className={shared}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-fout` : undefined}
        />
      )}
      {error ? (
        <p id={`${id}-fout`} role="alert" className="mt-1.5 text-sm text-secondary">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ScanSuccess() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-24 flex max-w-[900px] flex-col items-center px-5 pb-32 text-center sm:mt-36 sm:px-8"
      aria-live="polite"
    >
      <motion.span
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        aria-hidden="true"
        className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-5xl text-primary-foreground"
      >
        ✓
      </motion.span>
      <h2 className="display mt-10 display-2">
        Top! Wij gaan met jouw website aan de slag.
      </h2>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Binnen korte tijd ontvang je van ons een persoonlijke eerste indruk met concrete
        verbeterpunten en ideeën. Geen automatisch rapport, maar een advies dat speciaal voor jouw
        bedrijf is samengesteld.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-ink-foreground transition-transform duration-300 hover:scale-105 hover:bg-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
      >
        Terug naar homepage
      </Link>
    </motion.section>
  );
}