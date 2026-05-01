import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  project_type: z.string().min(1, "Select a project type"),
  budget_range: z.string().min(1, "Select a budget"),
  message: z.string().trim().min(1, "Tell us about your project").max(2000),
});

const PROJECT_TYPES = [
  "Brand Strategy",
  "Digital Product",
  "Web Experience",
  "Creative Technology",
  "Creative Direction",
];
const BUDGETS = ["Under $25k", "$25k–$75k", "$75k–$200k", "$200k+"];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      project_type: String(fd.get("project_type") ?? ""),
      budget_range: String(fd.get("budget_range") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      project_type: parsed.data.project_type,
      budget_range: parsed.data.budget_range,
      message: parsed.data.message,
    });
    setLoading(false);

    if (error) {
      toast.error("Could not send. Please try again.");
      return;
    }
    setSubmitted(true);
    toast.success("Inquiry received. We'll be in touch within 48 hours.");
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--color-forest)", color: "var(--color-cream)" }}
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <p className="label-eyebrow" style={{ color: "var(--color-cream)", opacity: 0.7 }}>
              05 —— NEW INQUIRY
            </p>
            <h2 className="display-serif mt-6 text-[14vw] sm:text-[8vw] lg:text-[6vw] text-cream">
              <span className="block">Start a</span>
              <span className="display-serif-italic block" style={{ color: "var(--color-gold)" }}>
                project.
              </span>
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-cream/80">
              We take on a small number of new engagements each year. Tell us about
              your work and we'll reply within 48 hours.
            </p>
          </motion.div>

          <div className="lg:col-span-5">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-md border border-cream/20 p-10"
              >
                <p className="label-eyebrow text-cream/70">CONFIRMATION</p>
                <h3 className="display-serif mt-4 text-3xl text-cream">
                  Thank you.
                </h3>
                <p className="mt-3 text-cream/75">
                  Your inquiry has been received. A principal will respond within
                  48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <Field name="name" label="NAME" />
                <Field name="email" label="EMAIL" type="email" />
                <Field name="company" label="COMPANY" required={false} />
                <Select name="project_type" label="PROJECT TYPE" options={PROJECT_TYPES} />
                <Select name="budget_range" label="BUDGET RANGE" options={BUDGETS} />
                <div>
                  <label className="label-eyebrow text-cream/60">MESSAGE</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    maxLength={2000}
                    className="mt-2 w-full resize-none border-b border-cream/30 bg-transparent py-3 text-cream placeholder-cream/40 outline-none focus:border-cream"
                    placeholder="Tell us about your project…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 bg-cream text-forest px-6 py-4 text-[11px] font-medium tracking-[0.16em] uppercase rounded-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "SENDING…" : "SEND INQUIRY"} <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = true,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label-eyebrow text-cream/60">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={255}
        className="mt-2 w-full border-b border-cream/30 bg-transparent py-3 text-cream placeholder-cream/40 outline-none focus:border-cream"
      />
    </div>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="label-eyebrow text-cream/60">{label}</label>
      <select
        name={name}
        required
        defaultValue=""
        className="mt-2 w-full border-b border-cream/30 bg-transparent py-3 text-cream outline-none focus:border-cream"
      >
        <option value="" disabled className="bg-forest text-cream">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-forest text-cream">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
