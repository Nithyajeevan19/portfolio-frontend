import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  number: string;
  label: string;
  line1: string;
  line2: string;
  supporting: ReactNode;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const } },
};


export function SectionHeader({ number, label, line1, line2, supporting }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end"
    >
      <div className="lg:col-span-8">
        <motion.p variants={itemVariants} className="label-eyebrow">
          {number} —— {label}
        </motion.p>
        <h2 className="mt-8">
          <motion.span variants={itemVariants} className="section-headline-line1 block">
            {line1}
          </motion.span>
          <motion.span variants={itemVariants} className="section-headline-line2 block">
            {line2}
          </motion.span>
        </h2>
      </div>
      <div className="lg:col-span-4 flex lg:items-end lg:justify-end">
        <motion.p variants={itemVariants} className="section-headline-sub">
          {supporting}
        </motion.p>
      </div>
    </motion.div>
  );
}

