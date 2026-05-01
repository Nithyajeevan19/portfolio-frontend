import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  number: string;
  label: string;
  line1: string;
  line2: string;
  supporting: ReactNode;
}

export function SectionHeader({ number, label, line1, line2, supporting }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="lg:col-span-8"
      >
        <p className="label-eyebrow">{number} —— {label}</p>
        <h2 className="display-serif mt-8 text-[12vw] sm:text-[8vw] lg:text-[5.6vw]">
          <span className="block">{line1}</span>
          <span className="ghost-italic block">{line2}</span>
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="lg:col-span-4 lg:text-right"
      >
        <p className="ml-auto max-w-xs text-[14px] leading-relaxed text-forest/75">
          {supporting}
        </p>
      </motion.div>
    </div>
  );
}
