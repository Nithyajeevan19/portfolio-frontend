import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import CustomCursor from "@/components/forma/CustomCursor";
import { usePortfolioAnimations } from "@/hooks/usePortfolioAnimations";
import { initLenis } from '@/lib/lenis';
import { PageLoader } from "@/components/forma/PageLoader";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: "#F6E9D9" }}
    >
      <div className="max-w-md text-center">
        <h1
          style={{
            fontFamily: "Boska, Georgia, serif",
            fontSize: "6rem",
            color: "#043222",
            margin: 0,
          }}
        >
          404
        </h1>
        <p
          style={{
            fontFamily: "Satoshi, Inter, sans-serif",
            color: "rgba(4,50,34,0.5)",
            marginBottom: "2rem",
          }}
        >
          Page not found.
        </p>
        <Link
          to="/"
          style={{
            fontFamily: "Satoshi, Inter, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#043222",
            textDecoration: "none",
            border: "1px solid rgba(4,50,34,0.2)",
            padding: "0.75rem 1.5rem",
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  // ── Wire global animation system ─────────────────────────────────────────────
  // Sets --cursor-x / --cursor-y / --scroll-progress CSS vars on <html>
  // and injects click-burst DOM particles on every click.
  usePortfolioAnimations();

  useEffect(() => {
    initLenis();
  }, []);

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <Outlet />
      <Toaster />
    </>
  );
}
