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
    <div
      aria-hidden="true"
      className="hidden pointer-events-none fixed top-0 inset-x-0 z-30 overflow-hidden border-b border-ink/10 bg-background/30 py-1.5 text-foreground backdrop-blur-md select-none sm:py-2"
    >
      <ul className="sr-only">
        {statements.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background/90 to-transparent sm:w-20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background/90 to-transparent sm:w-20"
        aria-hidden="true"
      />
      <Marquee
        items={items}
        className="text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap text-ink/85 sm:text-[11px]"
      />
    </div>
  );
}
