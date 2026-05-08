import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/forma/Navbar";
import { Hero } from "@/components/forma/Hero";
import { MarqueeStrip } from "@/components/forma/MarqueeStrip";

// Lazy load below-the-fold components
const SelectedWork = lazy(() => import("@/components/forma/SelectedWork").then(m => ({ default: m.SelectedWork })));
const TrustSignals = lazy(() => import("@/components/forma/TrustSignals").then(m => ({ default: m.TrustSignals })));
const Capabilities = lazy(() => import("@/components/forma/Capabilities").then(m => ({ default: m.Capabilities })));
const Methodology = lazy(() => import("@/components/forma/Methodology").then(m => ({ default: m.Methodology })));
const Studio = lazy(() => import("@/components/forma/Studio").then(m => ({ default: m.Studio })));
const Contact = lazy(() => import("@/components/forma/Contact").then(m => ({ default: m.Contact })));

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="noise-bg min-h-screen bg-cream text-forest">
      <Navbar />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Forma Studio",
          "image": "https://formastudio.co/og-image.jpg",
          "url": "https://formastudio.co/",
          "telephone": "",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "addressCountry": "IN"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "sameAs": [
            "https://linkedin.com",
            "https://instagram.com"
          ]
        })}
      </script>
      <main>
        <Hero />
        <MarqueeStrip />
        <Suspense fallback={<div className="h-96" />}>
          <SelectedWork />
          <TrustSignals />
          <Capabilities />
          <Methodology />
          <Studio />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}
