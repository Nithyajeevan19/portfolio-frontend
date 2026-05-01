import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cream pt-28 md:pt-32">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="label-eyebrow-muted">BOUTIQUE STUDIO — GLOBAL</p>
            <p className="label-eyebrow-muted">SELECTIVE INTAKE • 2026</p>
          </div>
          <p className="label-eyebrow-muted hidden sm:flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-forest" />
            AVAILABLE FOR PROJECTS
          </p>
        </div>

        {/* Tagline */}
        <p className="label-eyebrow mt-16">—— BRAND • PRODUCT • INTERACTIVE WEB</p>

        <div className="relative mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-7 relative z-10"
          >
            <h1 className="display-serif text-[14vw] sm:text-[11vw] lg:text-[8.4vw]">
              <span className="block">We build</span>
              <span className="display-serif-italic block">brands</span>
              <span className="ghost-italic block">that hold.</span>
            </h1>

            <p className="mt-10 max-w-md text-[15px] leading-relaxed text-forest/85">
              Forma is a senior-led studio. We partner with ambitious companies to
              build brand systems, digital products, and interactive web experiences
              that perform.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-primary">
                VIEW OUR WORK <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-ghost">
                START A PROJECT
              </a>
            </div>

            <p className="label-eyebrow-muted mt-12">
              BRAND SYSTEMS · DIGITAL PRODUCTS · CREATIVE TECHNOLOGY
            </p>
          </motion.div>

          {/* Sphere */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center min-h-[320px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="sphere"
            />
          </div>
        </div>

        <div className="mt-16 flex justify-end pb-10">
          <p className="label-eyebrow-muted">SCROLL ——</p>
        </div>
      </div>
    </section>
  );
}
