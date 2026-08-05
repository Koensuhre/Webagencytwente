import { motion } from "motion/react";

export function RouteChooser({
  onChoose,
}: {
  onChoose: (route: "intake" | "quick") => void;
}) {
  return (
    <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
      <Card
        emoji="🚀"
        title="Ik wil mijn project bespreken"
        text="Beantwoord een paar korte vragen en ontdek samen met ons wat de beste volgende stap is."
        cta="Start intake"
        delay={0}
        highlight
        onClick={() => onChoose("intake")}
      />
      <Card
        emoji="💬"
        title="Ik heb een korte vraag"
        text="Geen tijd voor een intake? Stuur ons direct je vraag en we reageren persoonlijk."
        cta="Stuur een bericht"
        delay={0.1}
        onClick={() => onChoose("quick")}
      />
    </div>
  );
}

function Card({
  emoji,
  title,
  text,
  cta,
  onClick,
  delay,
  highlight = false,
}: {
  emoji: string;
  title: string;
  text: string;
  cta: string;
  onClick: () => void;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col items-start overflow-hidden rounded-[1.75rem] border p-7 text-left transition-colors duration-300 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none sm:p-10 ${
        highlight
          ? "border-transparent bg-ink text-ink-foreground"
          : "border-ink/15 bg-card hover:border-ink/40"
      }`}
    >
      {highlight ? (
        <span
          aria-hidden="true"
          className="grain-blob floaty pointer-events-none absolute -top-20 -right-12 h-56 w-56 rounded-full bg-primary/50"
        />
      ) : null}
      <span aria-hidden="true" className="relative text-4xl">
        {emoji}
      </span>
      <span className="display relative mt-6 text-3xl leading-tight sm:text-4xl">{title}</span>
      <span
        className={`relative mt-4 text-base sm:text-lg ${
          highlight ? "text-ink-foreground/75" : "text-muted-foreground"
        }`}
      >
        {text}
      </span>
      <span
        className={`relative mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-base font-semibold transition-all duration-300 group-hover:gap-4 ${
          highlight
            ? "bg-primary text-primary-foreground"
            : "bg-ink text-ink-foreground group-hover:bg-primary"
        }`}
      >
        {cta}
        <span aria-hidden="true">&rarr;</span>
      </span>
    </motion.button>
  );
}
