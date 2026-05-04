import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Navbar } from "@/components/forma/Navbar";
import { Hero } from "@/components/forma/Hero";
import { SelectedWork } from "@/components/forma/SelectedWork";
import { Capabilities } from "@/components/forma/Capabilities";
import { Methodology } from "@/components/forma/Methodology";
import { Studio } from "@/components/forma/Studio";
import { Contact } from "@/components/forma/Contact";
import { Footer } from "@/components/forma/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forma Studio — Brand, Product & Interactive Web" },
      {
        name: "description",
        content:
          "Senior-led studio building brand systems, digital products, and interactive web experiences for ambitious companies.",
      },
      { property: "og:title", content: "Forma Studio — Brand, Product & Interactive Web" },
      {
        property: "og:description",
        content:
          "Work that earns its place. A focused selection led by senior principals from strategy through delivery.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [items, setItems] = useState<Tables<"case_studies">[]>([]);

  useEffect(() => {
    supabase
      .from("case_studies")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => setItems(data ?? []));
  }, []);

  return (
    <div className="noise-bg min-h-screen bg-cream text-forest">
      <Navbar />
      <main>
        <Hero />
        <SelectedWork items={items} />
        <Capabilities />
        <Methodology />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
