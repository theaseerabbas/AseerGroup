import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { useRouterState } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Aseer Group",
  url: "https://theaseergroup.com",
  logo: "https://theaseergroup.com/favicon.svg",
  email: "info@theleappakistan.com",
  telephone: "+92-51-6145307",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Makka Heights, H-13",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "NSTP, NUST H-12 Campus",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
  ],
  subOrganization: [
    {
      "@type": "Organization",
      name: "Aseer Transport Services",
      url: "https://transport.theaseergroup.com",
    },
    {
      "@type": "Organization",
      name: "Aseer Travel & Tours",
      url: "https://travel.theaseergroup.com",
    },
    { "@type": "Organization", name: "The Leap Pakistan", url: "https://theleappakistan.com/" },
    { "@type": "Organization", name: "The Rise", url: "https://rise.theaseergroup.com" },
  ],
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Aseer Group | One Vision, Endless Possibilities." },
      {
        name: "description",
        content:
          "The Aseer Group is a diversified Pakistani business group operating across transport, travel, youth development and more.",
      },
      { name: "author", content: "The Aseer Group" },
      { property: "og:site_name", content: "The Aseer Group" },
      { property: "og:locale", content: "en_PK" },
      { property: "og:title", content: "The Aseer Group | One Vision, Endless Possibilities." },
      {
        property: "og:description",
        content: "A diversified Pakistani business group built on trust, excellence and service.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theaseergroup.com" },
      { property: "og:image", content: "https://theaseergroup.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://theaseergroup.com/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://theaseergroup.com" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Instrument+Serif:ital@0;1&display=swap",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Header />
      <PageShell />
      <Footer />
      <BackToTop />
    </QueryClientProvider>
  );
}

function PageShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <main key={path} className="page-in min-h-screen">
      <Outlet />
    </main>
  );
}
