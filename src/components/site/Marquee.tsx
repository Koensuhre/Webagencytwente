export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-6" aria-hidden="true">
      <div className="marquee-track flex w-max shrink-0 items-center gap-12 pr-12">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="display text-2xl whitespace-nowrap text-ink/35 sm:text-3xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
