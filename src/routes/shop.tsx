import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const categories = ["All", "Outerwear", "Tops", "Bottoms", "Footwear", "Bags", "Dresses", "Accessories"];

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — AURVEIL" },
      { name: "description", content: "Shop the AURVEIL collection: outerwear, knitwear, leather, and quiet essentials." },
      { property: "og:title", content: "Shop — AURVEIL" },
      { property: "og:description", content: "Editorial-grade essentials. New drop every Friday." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState("All");
  const filtered = useMemo(
    () => (cat === "All" ? products : products.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div className="flex flex-col gap-6 border-b border-border pb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">the shop</p>
        <h1 className="font-display text-5xl tracking-tight md:text-7xl">
          Everything, all at once.
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          {filtered.length} pieces. All in stock unless we say otherwise. We'll say otherwise.
        </p>
      </div>

      {/* Filters */}
      <div className="-mx-6 overflow-x-auto px-6 py-6 lg:-mx-10 lg:px-10">
        <div className="flex w-max gap-2">
          {categories.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
                  active
                    ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--charcoal)]"
                    : "border-border text-foreground/70 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry-ish grid via column-count */}
      <div className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {filtered.map((p, i) => (
          <div key={p.id} className={`mb-6 break-inside-avoid ${i % 3 === 1 ? "lg:mt-12" : ""}`}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
