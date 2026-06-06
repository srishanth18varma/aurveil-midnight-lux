import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="border-t border-border bg-[oklch(0.16_0_0)]">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <h3 className="font-display text-3xl tracking-tight">AURVEIL</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Quiet luxury for people who scroll fast and dress slow. Made in small batches, worn for long years.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
            className="mt-8 flex max-w-sm items-center gap-0 border-b border-border pb-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email, please"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
            <button className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">
              {done ? "in" : "join"}
            </button>
          </form>
          <p className="mt-2 text-[11px] text-muted-foreground/70">
            No spam. Just drops, on Fridays.
          </p>
        </div>

        {[
          { title: "Shop", links: ["New Drop", "Outerwear", "Knitwear", "Footwear", "Archive"] },
          { title: "House", links: ["About", "Journal", "Stores", "Sustainability"] },
          { title: "Care", links: ["Shipping", "Returns", "Sizing", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">{col.title}</h4>
            <ul className="mt-6 space-y-3 text-sm text-foreground/80">
              {col.links.map((l) => (
                <li key={l}>
                  <Link to="/shop" className="transition hover:text-[var(--gold)]">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row lg:px-10">
          <span>© {new Date().getFullYear()} Aurveil Atelier</span>
          <span className="text-[var(--gold)]/80">midnight things, made on purpose.</span>
          <span>Mumbai · Paris · Internet</span>
        </div>
      </div>
    </footer>
  );
}
