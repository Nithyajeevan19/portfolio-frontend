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
        <p className="label-eyebrow">
          {number} —— {label}
        </p>
        <h2 className="mt-8">
          <span className="section-headline-line1 block">{line1}</span>
          <span className="section-headline-line2 block">{line2}</span>
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="lg:col-span-4 flex lg:items-end lg:justify-end"
      >
        <p className="section-headline-sub">{supporting}</p>
      </motion.div>
    </div>
  );
}
