import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

export function Studio() {
  return (
    <section id="studio" className="bg-cream">
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=80"
          alt="Studio interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto max-w-4xl px-6 py-32 md:py-44 text-center"
        >
          <p className="display-serif text-3xl md:text-5xl text-cream leading-tight">
            "We keep the studio small on purpose.
          </p>
          <p
            className="display-serif-italic mt-3 text-3xl md:text-5xl leading-tight"
            style={{ color: "var(--color-gold)" }}
          >
            Every client works directly with the principals."
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32">
        <SectionHeader
          number="04"
          label="THE STUDIO"
          line1="Four principals."
          line2="One standard."
          supporting="No layers. No juniors on client work. The people you meet at pitch are the people who build your project."
        />
      </div>
    </section>
  );
}
