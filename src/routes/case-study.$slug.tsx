import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Navbar } from "@/components/forma/Navbar";
import { Footer } from "@/components/forma/Footer";

export const Route = createFileRoute("/case-study/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Forma Studio` },
      { name: "description", content: "Case study by Forma Studio." },
    ],
  }),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { slug } = useParams({ from: "/case-study/$slug" });
  const [cs, setCs] = useState<Tables<"case_studies"> | null>(null);
  const [next, setNext] = useState<Tables<"case_studies"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    (async () => {
      const { data } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (!active) return;
      setCs(data ?? null);

      if (data) {
        const { data: all } = await supabase
          .from("case_studies")
          .select("*")
          .order("sort_order", { ascending: true });
        if (all && all.length) {
          const idx = all.findIndex((x) => x.slug === slug);
          setNext(all[(idx + 1) % all.length] ?? null);
        }
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream text-forest">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <p className="label-eyebrow-muted">LOADING…</p>
        </div>
      </div>
    );
  }

  if (!cs) {
    return (
      <div className="min-h-screen bg-cream text-forest">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center flex-col gap-4">
          <p className="display-serif text-5xl">Project not found.</p>
          <Link to="/" className="btn-primary">BACK HOME</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-forest">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink">
        <img
          src={cs.cover_image}
          alt={cs.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto flex h-full max-w-[1480px] flex-col justify-end px-6 md:px-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-end gap-6"
          >
            <div className="max-w-3xl">
              <span
                className="inline-block rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-forest"
                style={{ backgroundColor: "var(--color-lime)" }}
              >
                {cs.category.toUpperCase()} // {cs.year}
              </span>
              <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-cream leading-[1.05]">
                {cs.title}
              </h1>
            </div>
            <div className="text-right hidden md:block">
              <p className="label-eyebrow text-cream/70">CLIENT</p>
              <p className="mt-2 text-cream text-lg">{cs.client}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="bg-cream border-b border-forest/15">
        <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["CLIENT", cs.client],
            ["YEAR", String(cs.year)],
            ["CATEGORY", cs.category],
            ["SERVICES", cs.services],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="label-eyebrow-muted">{label}</p>
              <p className="mt-3 text-[15px] text-forest">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1480px] px-6 md:px-12">
          <p className="display-serif max-w-3xl text-2xl md:text-[28px] leading-snug text-forest">
            {cs.description}
          </p>

          {cs.gallery?.[0] && (
            <img
              src={cs.gallery[0]}
              alt=""
              className="mt-20 w-full rounded-md object-cover aspect-[16/9]"
            />
          )}

          {cs.content && (
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <p className="label-eyebrow lg:col-span-3">— APPROACH</p>
              <div className="lg:col-span-7 space-y-6 text-[16px] leading-[1.75] text-forest/85 whitespace-pre-line">
                {cs.content}
              </div>
            </div>
          )}

          {cs.gallery && cs.gallery.length > 1 && (
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
              {cs.gallery.slice(1).map((g, i) => (
                <img
                  key={i}
                  src={g}
                  alt=""
                  className="w-full rounded-md object-cover aspect-[4/5]"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Next */}
      {next && (
        <section className="bg-cream pb-24 md:pb-32">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12">
            <Link
              to="/case-study/$slug"
              params={{ slug: next.slug }}
              className="group relative block overflow-hidden rounded-md bg-ink aspect-[16/8]"
            >
              <img
                src={next.cover_image}
                alt={next.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 flex items-end justify-between">
                <div>
                  <p className="label-eyebrow text-cream/70">NEXT PROJECT</p>
                  <h3 className="display-serif mt-4 text-3xl md:text-5xl text-cream">
                    {next.title}
                  </h3>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors group-hover:bg-cream group-hover:text-forest">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
