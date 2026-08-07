import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { contactSchema, submitContactRequest } from "@/lib/contact.functions";
import { trackEvent } from "@/lib/analytics";
import { saveConfirmationSummary } from "@/lib/contact-confirmation-store";

import { TextField } from "./intake-ui";
import { useSpamGuard } from "./spam-guard";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function QuickMessageForm({ onBack }: { onBack: () => void }) {
  const submit = useServerFn(submitContactRequest);
  const { getGuardValues, HoneypotField } = useSpamGuard();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", website: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (key: keyof typeof values) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      name: values.name,
      email: values.email,
      company: "",
      service: "Korte vraag",
      message: values.website
        ? `${values.message}\n\nWebsite: ${values.website}`
        : values.message,
      ...getGuardValues(),
    };
    const parsed = contactSchema.safeParse(payload);
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
      trackEvent("generate_lead", { form: "quick_message" });
      saveConfirmationSummary({
        name: parsed.data.name,
        email: parsed.data.email,
        fields: [
          { label: "Naam", value: parsed.data.name },
          { label: "E-mail", value: parsed.data.email },
          { label: "Website", value: values.website || "—" },
          { label: "Onderwerp", value: parsed.data.service || "—" },
        ],
        message: parsed.data.message,
      });
      setStatus("done");
      void navigate({ to: "/bedankt" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-[720px]">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none"
      >
        <span aria-hidden="true">&larr;</span> Terug
      </button>

      <h2 className="display display-2 mt-6">Stuur ons je vraag</h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Kort en bondig mag. We reageren persoonlijk, meestal binnen één werkdag.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-10 space-y-5">
        <HoneypotField />
        <TextField
          id="quick-naam"
          label="Naam"
          value={values.name}
          onChange={set("name")}
          autoComplete="name"
          error={errors.name}
        />
        <TextField
          id="quick-email"
          label="E-mailadres"
          type="email"
          value={values.email}
          onChange={set("email")}
          autoComplete="email"
          inputMode="email"
          error={errors.email}
        />
        <TextField
          id="quick-website"
          label="Website"
          optional
          value={values.website}
          onChange={set("website")}
          inputMode="url"
          placeholder="jouwbedrijf.nl"
        />
        <TextField
          id="quick-bericht"
          label="Bericht"
          textarea
          value={values.message}
          onChange={set("message")}
          error={errors.message}
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-13 items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-ink-foreground transition-colors hover:bg-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none disabled:opacity-60"
        >
          {status === "sending" ? "Versturen…" : "Verstuur bericht"}
          <span aria-hidden="true">&rarr;</span>
        </button>

        {status === "error" ? (
          <p role="alert" className="text-sm text-destructive">
            Verzenden mislukt. Probeer het zo nog eens of mail ons direct.
          </p>
        ) : null}
      </form>
    </div>
  );
}
