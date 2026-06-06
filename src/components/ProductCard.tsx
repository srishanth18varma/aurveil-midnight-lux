import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { formatINR, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-card">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        {product.stock === "low" && (
          <span className="absolute left-3 top-3 rounded-full border border-[var(--gold)]/60 bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)] backdrop-blur">
            low stock
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            add(product, "M", 1);
          }}
          className="absolute inset-x-3 bottom-3 translate-y-[140%] rounded-full border border-[var(--gold)] bg-background/70 py-3 text-[11px] uppercase tracking-[0.25em] text-[var(--gold)] backdrop-blur transition-all duration-500 group-hover:translate-y-0 hover:bg-[var(--gold)] hover:text-[var(--charcoal)]"
        >
          Add to Cart
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-display text-lg leading-tight">{product.name}</h3>
        </div>
        <p className="font-sans text-sm text-foreground/80">{formatINR(product.price)}</p>
      </div>
    </Link>
  );
}
