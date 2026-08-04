import { Marquee } from "./Marquee";

const statements = [
  "Een nieuwe generatie van digitale makers",
  "10x sneller dan standaard bureaus",
  "Altijd unieke designs",
  "Zichtbaar bij jouw doelgroep",
  "Voor ieder budget",
];

export function StatementSlider() {
  const items = statements.flatMap((text) => [text, "•"]);
  items.pop();
  return (
    <section className="overflow-hidden bg-ink py-4 text-ink-foreground" aria-label="Kernboodschappen">
      <Marquee
        items={items}
        className="display text-2xl whitespace-nowrap text-ink-foreground/90 sm:text-4xl"
      />
    </section>
  );
}
