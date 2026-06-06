import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "New Drop" },
  { to: "/shop", label: "Archive" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { setOpen, count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/60 py-3 backdrop-blur-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <button
          aria-label="Menu"
          className="md:hidden text-foreground"
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className="hidden gap-10 text-[11px] uppercase tracking-[0.22em] text-foreground/80 md:flex">
          {links.slice(0, 2).map((l) => (
            <Link key={l.label} to={l.to} className="transition hover:text-[var(--gold)]">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className={`font-display tracking-[0.35em] transition-all duration-500 ${
            scrolled ? "text-lg" : "text-2xl"
          }`}
        >
          AURVEIL
        </Link>

        <div className="flex items-center gap-5 text-foreground/80">
          <button aria-label="Search" className="hidden md:inline-flex transition hover:text-[var(--gold)]">
            <Search size={18} />
          </button>
          <button
            aria-label="Cart"
            onClick={() => setOpen(true)}
            className="relative transition hover:text-[var(--gold)]"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--gold)] text-[10px] font-medium text-[var(--charcoal)]">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobile && (
        <nav className="mt-4 flex flex-col gap-4 border-t border-border bg-background/95 px-6 py-6 text-sm uppercase tracking-[0.22em] backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setMobile(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
