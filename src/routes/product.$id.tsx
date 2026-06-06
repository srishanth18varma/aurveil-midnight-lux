import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { formatINR, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: p
        ? [
            { title: `${p.name} — AURVEIL` },
            { name: "description", content: p.description },
            { property: "og:title", content: `${p.name} — AURVEIL` },
            { property: "og:description", content: p.description },
            { property: "og:image", content: p.image },
            { name: "twitter:image", content: p.image },
          ]
        : [],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl py-32 text-center">
      <h1 className="font-display text-4xl">Couldn't find that one.</h1>
      <p className="mt-3 text-muted-foreground">Probably sold out. Or never existed.</p>
      <Link to="/shop" className="btn-pill hover:btn-pill-hover mt-6 inline-flex">
        Back to shop
      </Link>
    </div>
  ),
});

const sizes = ["XS", "S", "M", "L", "XL"];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div>
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-10 lg:py-16">
        <div className="space-y-6">
          <div className="aspect-[3/4] overflow-hidden bg-card">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-[3/4] overflow-hidden bg-card">
              <img
                src={product.image + "&sat=-30"}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden bg-card">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
                alt="Detail study"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-light">{formatINR(product.price)}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--gold)]">
            {product.stock === "low" ? "low stock. just saying." : "in stock · ships in 48h"}
          </p>

          <p className="mt-8 text-base leading-relaxed text-foreground/80">{product.description}</p>
          <p className="mt-3 font-display text-lg italic text-[var(--gold)]">"{product.micro}"</p>

          <div className="mt-10 space-y-6">
            <div>
              <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>Size</span>
                <button className="text-foreground/70 hover:text-[var(--gold)]">Size guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-12 min-w-12 rounded-full border px-4 text-xs tracking-[0.18em] transition ${
                      size === s
                        ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--charcoal)]"
                        : "border-border text-foreground/80 hover:border-[var(--gold)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Quantity</p>
              <div className="inline-flex items-center gap-4 rounded-full border border-border px-4 py-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button
              onClick={() => add(product, size, qty)}
              className="group flex w-full items-center justify-center gap-3 rounded-full border border-[var(--gold)] py-5 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--charcoal)]"
            >
              <ShoppingBag size={14} />
              Add to Bag
            </button>

            <div className="grid grid-cols-2 gap-4 border-t border-border pt-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <p>Free ship over ₹2999</p>
              <p>30-day returns</p>
              <p>Made in Italy / India</p>
              <p>Carbon-neutral delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">You might also like.</h2>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-[0.28em] text-foreground/70 hover:text-[var(--gold)]"
            >
              See all
            </Link>
          </div>
          <div className="-mx-6 overflow-x-auto px-6 lg:-mx-10 lg:px-10">
            <div className="flex w-max gap-6">
              {related.map((p) => (
                <div key={p.id} className="w-[78vw] sm:w-[42vw] lg:w-[22vw]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
