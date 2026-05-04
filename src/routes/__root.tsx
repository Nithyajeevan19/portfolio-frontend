import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import CustomCursor from "@/components/forma/CustomCursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="display-serif text-8xl text-forest">404</h1>
        <p className="display-serif-italic mt-2 text-3xl text-forest/30">
          page not found.
        </p>
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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <CustomCursor />
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
