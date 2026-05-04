import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forma/Navbar";
import { Hero } from "@/components/forma/Hero";
import { SelectedWork } from "@/components/forma/SelectedWork";
import { Capabilities } from "@/components/forma/Capabilities";
import { Methodology } from "@/components/forma/Methodology";
import { Studio } from "@/components/forma/Studio";
import { Contact } from "@/components/forma/Contact";
import { Footer } from "@/components/forma/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="noise-bg min-h-screen bg-cream text-forest">
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <Capabilities />
        <Methodology />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
