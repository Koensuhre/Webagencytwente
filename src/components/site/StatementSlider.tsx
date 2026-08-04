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
    <div className="relative overflow-hidden bg-ink py-2 text-ink-foreground">
      <ul className="sr-only">
        {statements.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent"
        aria-hidden="true"
      />
      <Marquee
        items={items}
        className="text-xs font-medium tracking-wide whitespace-nowrap text-ink-foreground/80"
      />
    </div>
  );
}
