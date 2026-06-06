import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { formatINR } from "@/lib/products";
import { Minus, Plus, X } from "lucide-react";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-border bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-2xl tracking-tight">Your Bag</SheetTitle>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {items.length === 0 ? "currently: vibes only" : `${items.length} piece${items.length > 1 ? "s" : ""}`}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="font-display text-2xl">It's empty in here.</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Nothing wrong with browsing. We've all been there.
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((it) => (
                <li key={it.product.id + it.size} className="flex gap-4">
                  <div className="h-28 w-20 flex-shrink-0 overflow-hidden bg-card">
                    <img src={it.product.image} alt={it.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display text-base leading-tight">{it.product.name}</h4>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          Size {it.size}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(it.product.id, it.size)}
                        aria-label="Remove"
                        className="text-muted-foreground transition hover:text-foreground"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center gap-3 border border-border px-2 py-1">
                        <button
                          onClick={() => setQty(it.product.id, it.size, it.qty - 1)}
                          className="text-foreground/70 hover:text-[var(--gold)]"
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.product.id, it.size, it.qty + 1)}
                          className="text-foreground/70 hover:text-[var(--gold)]"
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-sm">{formatINR(it.product.price * it.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-5">
          <div className="flex items-center justify-between text-sm">
            <span className="uppercase tracking-[0.22em] text-muted-foreground">Subtotal</span>
            <span className="font-display text-xl">{formatINR(subtotal)}</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Tax in. Shipping calculated at checkout.
          </p>
          <button
            disabled={items.length === 0}
            className="mt-5 w-full rounded-full border border-[var(--gold)] py-4 text-[11px] uppercase tracking-[0.28em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--charcoal)] disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
