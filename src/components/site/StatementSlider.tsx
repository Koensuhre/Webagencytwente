import { Marquee } from "./Marquee";

const statements = [
  "Een nieuwe generatie van digitale makers",
  "10x sneller dan standaard bureaus",
  "Altijd unieke designs",
  "Zichtbaar bij jouw doelgroep",
  "Voor ieder budget",
];

export function StatementSlider() {
  const items = statements.flatMap((text) => [
    text,
    "•",
  ]);
  items.pop();
  return (
    <section className="overflow-hidden bg-ink py-5 text-ink-foreground" aria-label="Kernboodschappen">
      <Marquee items={items} />
    </section>
  );
}
