import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Marquee } from "@/components/Marquee";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURVEIL — Quiet luxury, loudly worn." },
      {
        name: "description",
        content:
          "AURVEIL: editorial-grade outerwear, knitwear and leather. Made in small batches, worn for long years. New drop every Friday.",
      },
      { property: "og:title", content: "AURVEIL — Quiet luxury, loudly worn." },
      { property: "og:description", content: "Concept-store essentials. New drop every Friday." },
    ],
  }),
  component: Home,
});

function Home() {
  const hero = products[0];
  const strip = products.slice(1, 7);

  return (
    <div>
      {/* HERO */}
      <section className="grain relative -mt-[88px] flex min-h-screen items-end overflow-hidden bg-background pt-[88px]">
        <div className="grain-overlay absolute inset-0" />

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=80"
            alt="Aurveil Veil Wool Overcoat campaign"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.4fr_1fr] lg:px-10">
          <div className="flex flex-col gap-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--gold)]/60 bg-background/30 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)]" />
              New Drop · Vol. 04
            </span>

            <h1 className="font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.04em]">
              Clothes that
              <br />
              <em className="font-normal italic text-[var(--gold)]">whisper,</em> never
              <br />
              shout.
            </h1>

            <p className="max-w-md text-base leading-relaxed text-foreground/80">
              Editorial outerwear, heavyweight basics, and leather worth keeping. Made in small batches in Italy and India. Worn for the next decade.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/shop" className="btn-pill hover:btn-pill-hover">
                Shop the Drop <ArrowRight size={14} />
              </Link>
              <Link
                to="/product/$id"
                params={{ id: hero.id }}
                className="text-xs uppercase tracking-[0.28em] text-foreground/70 transition hover:text-[var(--gold)]"
              >
                The Veil Coat → {formatINR(hero.price)}
              </Link>
            </div>
          </div>

          <div className="hidden flex-col justify-end gap-6 lg:flex">
            <div className="rounded border border-border/60 bg-background/40 p-6 backdrop-blur">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">manifesto · 01</p>
              <p className="mt-3 font-display text-xl italic leading-snug">
                "Buy less. Feel more. Wear it until someone asks."
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              <span>scroll</span>
              <span>est. 2024 · india</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee
        items={[
          "Free shipping on orders over ₹2999",
          "New drop every Friday",
          "Made in small batches",
          "Worn for long years",
        ]}
      />

      {/* PRODUCT STRIP */}
      <section className="py-24">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">currently dropping</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
                Vol. 04 — <em className="italic text-foreground/70">After Hours.</em>
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.28em] text-foreground/70 transition hover:text-[var(--gold)] md:inline-flex"
            >
              See all <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="-mx-6 overflow-x-auto px-6 lg:-mx-10 lg:px-10">
            <div className="flex w-max gap-6">
              {strip.map((p) => (
                <div key={p.id} className="w-[78vw] sm:w-[42vw] lg:w-[22vw]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT — asymmetric */}
      <section className="border-y border-border bg-[oklch(0.16_0_0)] py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-5 lg:col-start-1">
            <div className="aspect-[4/5] overflow-hidden bg-card">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=80"
                alt="Aurveil atelier — fabric study"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-8 lg:col-span-6 lg:col-start-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">the house</p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
              We make midnight things, on purpose.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              Aurveil started in a Mumbai studio in 2024 — three friends, one shared sweater, and a complaint that good clothes had gotten loud. We design quietly: wool from Biella, leather from Tuscany, cotton washed in our own water. No seasons. No trends. Just things you'll keep.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-foreground/80">
              Sold to you directly. So the price is the price — not the markup.
            </p>

            <div className="flex flex-wrap gap-10 border-t border-border pt-8">
              {[
                { k: "Made in", v: "Italy · India" },
                { k: "Drops", v: "Weekly · Fridays" },
                { k: "Batches", v: "< 300 pieces" },
              ].map((s) => (
                <div key={s.k}>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{s.k}</p>
                  <p className="mt-2 font-display text-xl">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY MARQUEE */}
      <Marquee
        items={[
          "Quiet luxury, loudly worn",
          "Volume 04 — After Hours",
          "Atelier hours: midnight–2am",
        ]}
      />
    </div>
  );
}
