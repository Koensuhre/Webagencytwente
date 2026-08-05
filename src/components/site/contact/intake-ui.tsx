import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const fieldClass =
  "mt-2 w-full min-w-0 rounded-2xl border border-ink/15 bg-card px-4 py-3.5 text-base outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/25 sm:px-5";

export function TextField({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  optional = false,
  textarea = false,
  autoFocusField = false,
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "email" | "url" | "tel" | "text";
  optional?: boolean;
  textarea?: boolean;
  autoFocusField?: boolean;
  error?: string | undefined;
}) {
  const shared = {
    id,
    value,
    placeholder,
    className: fieldClass,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? `${id}-fout` : undefined,
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-muted-foreground">
        {label}
        {optional ? <span className="text-muted-foreground/70"> (optioneel)</span> : null}
      </label>
      {textarea ? (
        <textarea
          {...shared}
          rows={5}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          autoCapitalize={inputMode === "email" || inputMode === "url" ? "none" : undefined}
          autoFocus={autoFocusField}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {error ? (
        <p id={`${id}-fout`} role="alert" className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ChoiceCard({
  selected,
  onSelect,
  emoji,
  label,
  hint,
  className,
}: {
  selected: boolean;
  onSelect: () => void;
  emoji?: string | undefined;
  label: string;
  hint?: string | undefined;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn(
        "group flex min-h-16 w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none",
        selected
          ? "border-primary bg-primary/10"
          : "border-ink/15 bg-card hover:border-ink/35",
        className,
      )}
    >
      {emoji ? (
        <span aria-hidden="true" className="text-2xl">
          {emoji}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "h-3 w-3 shrink-0 rounded-full border transition-colors",
            selected ? "border-primary bg-primary" : "border-ink/30",
          )}
        />
      )}
      <span className="min-w-0">
        <span className="block text-base font-semibold">{label}</span>
        {hint ? <span className="block text-sm text-muted-foreground">{hint}</span> : null}
      </span>
    </motion.button>
  );
}

export function StepShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      {intro ? <p className="text-base text-muted-foreground sm:text-lg">{intro}</p> : null}
      <h2 className="display display-2 mt-3">{title}</h2>
      <div className="mt-8 space-y-5">{children}</div>
    </div>
  );
}
