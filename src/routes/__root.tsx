import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";

import appCss from "../styles.css?url";
import CustomCursor from "@/components/forma/CustomCursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="display-serif text-8xl text-forest">404</h1>
        <p className="display-serif-italic mt-2 text-3xl text-forest/30">page not found.</p>
        <div className="mt-8">
          <Link to="/" className="btn-primary">
            GO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Forma Studio — Senior-led brand & product design" },
      {
        name: "description",
        content:
          "Forma is a senior-led studio building brand systems, digital products, and interactive web experiences that perform.",
      },
      { property: "og:title", content: "Forma Studio — Senior-led brand & product design" },
      {
        property: "og:description",
        content:
          "Forma is a senior-led studio building brand systems, digital products, and interactive web experiences that perform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Forma Studio — Senior-led brand & product design" },
      {
        name: "twitter:description",
        content:
          "Forma is a senior-led studio building brand systems, digital products, and interactive web experiences that perform.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3dbc04be-cf6b-442d-9826-5fac34cd3089/id-preview-cf42d474--03562553-31e6-4674-9ef6-111315fd76b8.lovable.app-1777630237906.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3dbc04be-cf6b-442d-9826-5fac34cd3089/id-preview-cf42d474--03562553-31e6-4674-9ef6-111315fd76b8.lovable.app-1777630237906.png",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&f[]=boska@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <HeadContent />
      </head>
      <body>
        <CustomCursor />
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Outlet />
    </QueryClientProvider>
  );
}
