import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CustomCursor } from "@/components/CustomCursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <h2 className="mt-4 text-xl">This page ghosted us.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for isn't here. Probably for the best.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-pill hover:btn-pill-hover">
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something cracked.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Refresh or head home — we'll pretend this didn't happen.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-pill hover:btn-pill-hover"
          >
            Try again
          </button>
          <a href="/" className="btn-pill hover:btn-pill-hover">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AURVEIL" },
      {
        name: "description",
        content:
          "AURVEIL is a luxury fashion & lifestyle house. Quiet luxury for people who scroll fast and dress slow. New drop every Friday.",
      },
      { name: "author", content: "AURVEIL" },
      { property: "og:title", content: "AURVEIL" },
      { property: "og:description", content: "AURVEIL: The Midnight Edit is a luxury e-commerce website for premium fashion and lifestyle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AURVEIL" },
      { name: "description", content: "AURVEIL: The Midnight Edit is a luxury e-commerce website for premium fashion and lifestyle." },
      { name: "twitter:description", content: "AURVEIL: The Midnight Edit is a luxury e-commerce website for premium fashion and lifestyle." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bf999bc0-bdf3-410b-b0bb-de6a3e2097ff/id-preview-8af9aaa3--414cb314-640e-44b0-8e61-aeb422cc26a8.lovable.app-1780730377176.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bf999bc0-bdf3-410b-b0bb-de6a3e2097ff/id-preview-8af9aaa3--414cb314-640e-44b0-8e61-aeb422cc26a8.lovable.app-1780730377176.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={pathname} className="animate-fade-up">
      {children}
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen pt-[88px]">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </QueryClientProvider>
  );
}
