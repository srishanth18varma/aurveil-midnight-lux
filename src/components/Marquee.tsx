export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-[oklch(0.21_0_0)] py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            {t}
            <span className="text-[var(--gold)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
