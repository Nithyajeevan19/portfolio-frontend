import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import type { Tables } from "@/integrations/supabase/types";

type CaseStudy = Tables<"case_studies">;

function Card({ cs, large }: { cs: CaseStudy; large?: boolean }) {
  return (
    <Link
      to="/case-study/$slug"
      params={{ slug: cs.slug }}
      className="group relative block overflow-hidden rounded-md bg-ink"
      style={{ aspectRatio: large ? "16 / 9" : "4 / 5" }}
    >
      <img
        src={cs.cover_image}
        alt={cs.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
        <div>
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-forest"
            style={{ backgroundColor: "var(--color-lime)" }}
          >
            {cs.category.toUpperCase()} // {cs.year}
          </span>
          <h3 className="display-serif mt-4 text-3xl text-cream md:text-4xl lg:text-5xl">
            {cs.title.split(" — ")[0]}
          </h3>
          <p className="mt-2 max-w-md text-[13px] text-cream/75">
            {cs.title.includes(" — ") ? cs.title.split(" — ")[1] : cs.client}
          </p>
        </div>
        <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors group-hover:bg-cream group-hover:text-forest">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

export function SelectedWork({ items }: { items: CaseStudy[] }) {
  const [hero, ...rest] = items;
  return (
    <section id="work" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <SectionHeader
          number="02"
          label="SELECTED WORK"
          line1="Work that"
          line2="earns its place."
          supporting="A focused selection. Every engagement led by senior principals from strategy through delivery."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="mt-16 space-y-6"
        >
          {hero && <Card cs={hero} large />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((cs) => (
              <Card key={cs.id} cs={cs} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
