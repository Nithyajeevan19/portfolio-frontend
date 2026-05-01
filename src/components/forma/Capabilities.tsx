import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const SERVICES = [
  {
    n: "01",
    name: "Brand Strategy & Identity",
    desc:
      "We define market position, naming, and voice. Then we build the visual system — identity, typography, colour, motion — to hold it for a decade.",
    tags: [
      "POSITIONING & MESSAGING",
      "VISUAL IDENTITY SYSTEMS",
      "BRAND GUIDELINES",
      "VERBAL IDENTITY",
    ],
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
  },
  {
    n: "02",
    name: "Digital Product Design",
    desc:
      "End-to-end product design from research to interactive prototypes. We design products people choose to keep using.",
    tags: ["UX RESEARCH", "INTERACTION DESIGN", "DESIGN SYSTEMS", "PROTOTYPING"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
  },
  {
    n: "03",
    name: "Interactive Web Experiences",
    desc:
      "Cinematic, performance-first websites engineered with the same craft as the brand they represent.",
    tags: ["ART DIRECTION", "WEBGL & MOTION", "CMS ARCHITECTURE", "PERFORMANCE"],
    image:
      "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=1600&q=80",
  },
  {
    n: "04",
    name: "Creative Technology",
    desc:
      "Custom tooling, generative systems, and bespoke interfaces built where design and engineering converge.",
    tags: ["GENERATIVE SYSTEMS", "INSTALLATIONS", "TOOLING", "PROTOTYPES"],
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",
  },
  {
    n: "05",
    name: "Creative Direction",
    desc:
      "Embedded creative leadership for in-house teams during launches, reinventions, and category-defining moments.",
    tags: ["EMBEDDED LEADERSHIP", "CAMPAIGN DIRECTION", "ART DIRECTION", "CASTING"],
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80",
  },
];

export function Capabilities() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <section id="services" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <SectionHeader
          number="03"
          label="CAPABILITIES"
          line1="What we"
          line2="do best."
          supporting="Five service pillars. No generalism. We go deep on work that creates lasting value."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-100 gap-10" style={{ gridTemplateColumns: undefined }}>
          <div className="lg:col-span-7" style={{ flexBasis: "55%" }}>
            <div className="lg:hidden">
              {/* spacer */}
            </div>
            <div className="lg:[width:100%]">
              <div className="divider-thin" />
              {SERVICES.map((s, i) => {
                const isOpen = i === active;
                return (
                  <div key={s.n}>
                    <button
                      onClick={() => setActive(isOpen ? -1 : i)}
                      className="flex w-full items-center gap-6 py-7 text-left"
                    >
                      <span className="label-eyebrow-muted w-8 shrink-0">{s.n}</span>
                      <span
                        className={`display-serif flex-1 text-3xl md:text-[34px] transition-opacity ${
                          isOpen ? "opacity-100" : "opacity-80"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest/40 transition-all ${
                          isOpen ? "bg-forest text-cream rotate-45" : "text-forest"
                        }`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pl-14 pr-2">
                            <p className="max-w-xl text-[15px] leading-relaxed text-forest/80">
                              {s.desc}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {s.tags.map((t) => (
                                <span key={t} className="pill-tag">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="divider-thin" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5" style={{ flexBasis: "45%" }}>
            <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
              <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[85vh] overflow-hidden rounded-md bg-ink">
                {SERVICES.map((s, i) => (
                  <img
                    key={s.n}
                    src={s.image}
                    alt={s.name}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-in-out"
                    style={{ opacity: i === active ? 1 : 0 }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="label-eyebrow text-cream/80">{current?.n}</p>
                  <p className="display-serif mt-2 text-3xl text-cream md:text-4xl">
                    {current?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
