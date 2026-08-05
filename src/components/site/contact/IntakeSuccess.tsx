import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function IntakeSuccess({ name, quick = false }: { name?: string; quick?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-live="polite"
      className="mx-auto flex max-w-[760px] flex-col items-center text-center"
    >
      <motion.span
        aria-hidden="true"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.1 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl text-primary-foreground"
      >
        ✓
      </motion.span>
      <h2 className="display display-2 mt-10">
        {quick ? "Bedankt!" : `Bedankt ${name?.trim() || ""}! 🚀`}
      </h2>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        {quick
          ? "We komen zo snel mogelijk persoonlijk bij je terug."
          : "Wij bekijken jouw idee en nemen persoonlijk contact met je op. Geen automatische reactie, maar een gesprek met iemand uit ons team."}
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-semibold text-ink-foreground transition-transform duration-300 hover:scale-105 hover:bg-primary focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
      >
        Terug naar homepage
      </Link>
    </motion.div>
  );
}
