import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartItem = {
  product: Product;
  size: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product, size: string, qty?: number) => void;
  remove: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  subtotal: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((product: Product, size: string, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((it) => it.product.id === product.id && it.size === size);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { product, size, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((id: string, size: string) => {
    setItems((prev) => prev.filter((it) => !(it.product.id === id && it.size === size)));
  }, []);

  const setQty = useCallback((id: string, size: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((it) => (it.product.id === id && it.size === size ? { ...it, qty: Math.max(0, qty) } : it))
        .filter((it) => it.qty > 0),
    );
  }, []);

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.product.price * it.qty, 0), [items]);
  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  return (
    <Ctx.Provider value={{ items, open, setOpen, add, remove, setQty, subtotal, count }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
