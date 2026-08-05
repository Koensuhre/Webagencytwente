import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import { contactSchema, submitContactRequest } from "@/lib/contact.functions";
import { useSpamGuard } from "./spam-guard";
import { saveConfirmationSummary } from "@/lib/contact-confirmation-store";

import { ChoiceCard, StepShell, TextField } from "./intake-ui";
import {
  ambitionSteps,
  budgetOptions,
  buildIntakeMessage,
  emptyAnswers,
  labelOf,
  projectOptions,
  situationOptions,
  timingOptions,
  type IntakeAnswers,
} from "./intake-content";
const TOTAL = 8;

export function IntakeFlow({ onBack }: { onBack: () => void }) {
  const submit = useServerFn(submitContactRequest);
  const { getGuardValues, HoneypotField } = useSpamGuard();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<IntakeAnswers>(emptyAnswers);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [direction, setDirection] = useState(1);

  const set = <K extends keyof IntakeAnswers>(key: K, value: IntakeAnswers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const canContinue = useMemo(() => {
    switch (step) {
      case 1:
        return answers.firstName.trim().length >= 2;
      case 2:
        return answers.company.trim().length >= 2;
      case 3:
        return Boolean(answers.project);
      case 4:
        return Boolean(answers.situation);
      case 5:
        return true;
      case 6:
        return Boolean(answers.timing) && Boolean(answers.budget);
      case 7:
        return answers.story.trim().length >= 10;
      case 8:
        return (
          (answers.name.trim() || answers.firstName.trim()).length >= 2 &&
          /.+@.+\..+/.test(answers.email.trim())
        );
      default:
        return true;
    }
  }, [answers, step]);

  function go(next: number) {
    setDirection(next > step ? 1 : -1);
    setError(null);
    setStep(next);
  }

  async function send() {
    const values = {
      name: (answers.name.trim() || answers.firstName.trim()),
      email: answers.email.trim(),
      company: answers.company.trim(),
      service: labelOf(projectOptions, answers.project),
      message: buildIntakeMessage(answers),
      ...getGuardValues(),
    };
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Controleer je gegevens.");
      return;
    }
    setStatus("sending");
    try {
      await submit({ data: parsed.data });
      saveConfirmationSummary({
        name: parsed.data.name,
        email: parsed.data.email,
        fields: [
          { label: "Naam", value: parsed.data.name },
          { label: "E-mail", value: parsed.data.email },
          { label: "Bedrijf", value: parsed.data.company || "—" },
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

  const isSummary = step === TOTAL + 1;

  return (
    <div className="mx-auto max-w-[860px]">
      <HoneypotField />
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => (step === 1 ? onBack() : go(step - 1))}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none"
        >
          <span aria-hidden="true">&larr;</span> Terug
        </button>
        <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
          {isSummary ? "Overzicht" : `Stap ${step} van ${TOTAL}`}
        </p>
      </div>

      <div
        className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={TOTAL + 1}
        aria-valuenow={step}
        aria-label="Voortgang intake"
      >
        <motion.div
          className="h-full rounded-full bg-primary"
          animate={{ width: `${(step / (TOTAL + 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="mt-10 sm:mt-14">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -32 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <StepShell title="Met wie hebben we het genoegen?" intro="Hoi 👋 Leuk dat je er bent.">
                <TextField
                  id="intake-voornaam"
                  label="Voornaam"
                  value={answers.firstName}
                  onChange={(value) => set("firstName", value)}
                  autoComplete="given-name"
                  placeholder="Bijv. Sanne"
                />
              </StepShell>
            )}

            {step === 2 && (
              <StepShell
                title="Voor welk bedrijf of idee wil je iets bouwen?"
                intro={`Leuk je te ontmoeten, ${answers.firstName}!`}
              >
                <TextField
                  id="intake-bedrijf"
                  label="Bedrijfsnaam"
                  value={answers.company}
                  onChange={(value) => set("company", value)}
                  autoComplete="organization"
                  placeholder="Bijv. Studio Noord"
                />
                <TextField
                  id="intake-website"
                  label="Website"
                  optional
                  value={answers.website}
                  onChange={(value) => set("website", value)}
                  inputMode="url"
                  placeholder="jouwbedrijf.nl"
                />
              </StepShell>
            )}

            {step === 3 && (
              <StepShell
                title="Waar kunnen we je mee helpen?"
                intro="Interessant. We zijn benieuwd hoe we kunnen helpen."
              >
                <div role="radiogroup" aria-label="Type project" className="grid gap-3 sm:grid-cols-2">
                  {projectOptions.map((option) => (
                    <ChoiceCard
                      key={option.id}
                      selected={answers.project === option.id}
                      onSelect={() => set("project", option.id)}
                      emoji={option.emoji}
                      label={option.label}
                      hint={option.hint}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="Hoe ziet jouw huidige situatie eruit?">
                <div role="radiogroup" aria-label="Huidige situatie" className="grid gap-3">
                  {situationOptions.map((option) => (
                    <ChoiceCard
                      key={option.id}
                      selected={answers.situation === option.id}
                      onSelect={() => set("situation", option.id)}
                      label={option.label}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell title="Wat wil je bereiken?">
                <label htmlFor="intake-ambitie" className="sr-only">
                  Ambitieniveau
                </label>
                <input
                  id="intake-ambitie"
                  type="range"
                  min={0}
                  max={ambitionSteps.length - 1}
                  step={1}
                  value={answers.ambition}
                  aria-valuetext={ambitionSteps[answers.ambition]?.label}
                  onChange={(event) => set("ambition", Number(event.target.value))}
                  className="h-2 w-full cursor-pointer touch-none appearance-none rounded-full bg-ink/10 accent-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
                />
                <div className="grid grid-cols-3 gap-1.5">
                  {ambitionSteps.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => set("ambition", index)}
                      aria-pressed={answers.ambition === index}
                      className={`min-h-11 rounded-full px-1 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                        answers.ambition === index
                          ? "bg-ink text-ink-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={answers.ambition}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    aria-live="polite"
                    className="rounded-2xl border border-ink/15 bg-card p-5 text-base text-muted-foreground"
                  >
                    {ambitionSteps[answers.ambition]?.text}
                  </motion.p>
                </AnimatePresence>
              </StepShell>
            )}

            {step === 6 && (
              <StepShell title="Wanneer wil je starten?">
                <div role="radiogroup" aria-label="Planning" className="grid gap-3 sm:grid-cols-2">
                  {timingOptions.map((option) => (
                    <ChoiceCard
                      key={option.id}
                      selected={answers.timing === option.id}
                      onSelect={() => set("timing", option.id)}
                      label={option.label}
                    />
                  ))}
                </div>
                <p className="pt-4 text-lg font-semibold">Heb je al een idee van het budget?</p>
                <div role="radiogroup" aria-label="Budget" className="grid gap-3 sm:grid-cols-2">
                  {budgetOptions.map((option) => (
                    <ChoiceCard
                      key={option.id}
                      selected={answers.budget === option.id}
                      onSelect={() => set("budget", option.id)}
                      label={option.label}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 7 && (
              <StepShell title="Vertel ons iets meer over jouw idee.">
                <TextField
                  id="intake-verhaal"
                  label="Jouw verhaal"
                  textarea
                  value={answers.story}
                  onChange={(value) => set("story", value)}
                  placeholder="Wat wil je bereiken? Wat maakt jouw bedrijf bijzonder?"
                />
              </StepShell>
            )}

            {step === 8 && (
              <StepShell title="Waar kunnen we je bereiken?">
                <TextField
                  id="intake-naam"
                  label="Naam"
                  value={answers.name || answers.firstName}
                  onChange={(value) => set("name", value)}
                  autoComplete="name"
                />
                <TextField
                  id="intake-email"
                  label="E-mailadres"
                  type="email"
                  value={answers.email}
                  onChange={(value) => set("email", value)}
                  autoComplete="email"
                  inputMode="email"
                />
                <TextField
                  id="intake-telefoon"
                  label="Telefoonnummer"
                  optional
                  value={answers.phone}
                  onChange={(value) => set("phone", value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </StepShell>
            )}

            {isSummary && (
              <div>
                <h2 className="display display-2">Klopt alles?</h2>
                <dl className="mt-8 divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/15 bg-card">
                  <SummaryRow label="Project" value={labelOf(projectOptions, answers.project)} />
                  <SummaryRow
                    label="Doel"
                    value={`${labelOf(situationOptions, answers.situation)} · ${ambitionSteps[answers.ambition]?.label}`}
                  />
                  <SummaryRow label="Planning" value={labelOf(timingOptions, answers.timing)} />
                  <SummaryRow label="Budget" value={labelOf(budgetOptions, answers.budget)} />
                  <SummaryRow label="Contact" value={`${answers.name || answers.firstName} · ${answers.email}`} />
                </dl>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {error || status === "error" ? (
        <p role="alert" className="mt-6 text-sm text-destructive">
          {error ?? "Verzenden mislukt. Probeer het zo nog eens of mail ons direct."}
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {isSummary ? (
          <>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex min-h-13 items-center rounded-full border border-ink/20 px-7 py-4 text-base font-semibold transition-colors hover:border-ink focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none"
            >
              Aanpassen
            </button>
            <motion.button
              type="button"
              onClick={send}
              disabled={status === "sending"}
              whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-13 items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-ink-foreground transition-colors hover:bg-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none disabled:opacity-60"
            >
              {status === "sending" ? "Versturen…" : "Versturen"}
              <span aria-hidden="true">&rarr;</span>
            </motion.button>
          </>
        ) : (
          <motion.button
            type="button"
            onClick={() => go(step + 1)}
            disabled={!canContinue}
            whileHover={{ scale: canContinue ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-13 items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-ink-foreground transition-colors hover:bg-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === TOTAL ? "Bekijk overzicht" : "Volgende"}
            <span aria-hidden="true">&rarr;</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-base font-semibold sm:text-right">{value || "—"}</dd>
    </div>
  );
}
