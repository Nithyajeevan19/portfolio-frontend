import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

export function TrustSignals() {
  return (
    <div className="bg-[#F6E9D9]">
      {/* Testimonial Section */}
      <section className="pt-12 pb-32 px-8 md:px-14">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="micro-label mb-12 block">Client Praise</span>
            <blockquote className="text-2xl md:text-4xl font-serif italic text-[#043222] leading-tight mb-10">
              "Forma Studio doesn't just deliver design; they deliver a strategic advantage. Their senior-led approach ensured our product launched with a level of polish we didn't think was possible in such a tight timeline."
            </blockquote>
            <cite className="not-italic">
              <span className="block text-sm font-bold uppercase tracking-widest text-[#043222]">Founder & CEO</span>
              <span className="block text-xs uppercase tracking-widest text-[#043222]/50 mt-1">Leading Fintech Platform</span>
            </cite>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
