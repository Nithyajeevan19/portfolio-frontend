import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const PHASES = [
  {
    n: "01",
    label: "DISCOVER",
    heading: "We interrogate the brief.",
    body:
      "Two to three weeks of stakeholder conversations, competitive mapping, and strategic diagnosis before a single frame is designed.",
    bullets: ["STAKEHOLDER INTERVIEWS", "COMPETITIVE LANDSCAPE", "OPPORTUNITY MAPPING"],
  },
  {
    n: "02",
    label: "ARCHITECT",
    heading: "Structure is the foundation.",
    body:
      "Brand architecture, product logic, or information framework — the invisible scaffolding that makes every downstream decision feel inevitable.",
    bullets: ["BRAND ARCHITECTURE", "IA & USER FLOWS", "SYSTEM DESIGN"],
  },
  {
    n: "03",
    label: "EXECUTE",
    heading: "Craft at the right level.",
    body:
      "Senior execution from concept to handoff. Every deliverable is precise, defensible, and documented. We do not ship work we would not sign our names to.",
    bullets: ["PIXEL-PRECISE DELIVERY", "MOTION & INTERACTION", "HANDOFF & DOCUMENTATION"],
  },
];

export function Methodology() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <SectionHeader
          number="—"
          label="METHODOLOGY"
          line1="A three-phase"
          line2="methodology."
          supporting="Built over eight years of high-stakes engagements. Flexible enough to adapt, structured enough to deliver."
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 border-t border-forest/15">
          {PHASES.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative px-2 md:px-10 py-12 ${
                i > 0 ? "md:border-l border-forest/15" : ""
              } ${i > 0 ? "border-t md:border-t-0 border-forest/15" : ""}`}
            >
              <span
                className="display-serif-italic absolute right-6 top-6 text-[120px] leading-none text-forest/10 select-none pointer-events-none"
              >
                {p.n}
              </span>
              <p className="label-eyebrow">{p.label}</p>
              <h3 className="display-serif mt-6 text-3xl md:text-4xl">{p.heading}</h3>
              <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-forest/75">
                {p.body}
              </p>
              <ul className="mt-8 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="label-eyebrow flex items-center gap-3">
                    <span className="inline-block h-1 w-1 rounded-full bg-forest" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
