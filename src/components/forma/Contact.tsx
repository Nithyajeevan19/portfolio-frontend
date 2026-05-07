import React, { useState } from "react";
import { motion } from "framer-motion";

const PROJECT_SCOPES = [
  "Brand Strategy & Identity",
  "Digital Product Design",
  "Interactive Web Experience",
  "Creative Technology",
  "Full Studio Engagement",
  "Creative Direction",
];
const BUDGETS = ["₹25k – ₹50k", "₹50k – ₹100k", "₹100k – ₹250k", "₹250k+", "To be discussed"];
const SOCIALS = [
  { label: "LinkedIn", indicator: "LI", href: "https://linkedin.com" },
  { label: "Awwwards", indicator: "AW", href: "https://awwwards.com" },
  { label: "Instagram", indicator: "IG", href: "https://instagram.com" },
  { label: "X / Twitter", indicator: "X", href: "https://x.com" },
];

const inputBase = {
  borderBottom: "1px solid rgba(4,50,34,0.15)",
  color: "#111111",
  fontSize: "0.9rem",
  backgroundColor: "transparent",
  width: "100%",
  padding: "0.75rem 0",
  outline: "none",
  fontFamily: "Satoshi, Inter, sans-serif",
  transition: "border-color 0.3s",
};

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project_scope: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      alert("Enter a valid email");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("https://portfolio-backend-0o1b.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm({
        name: "",
        email: "",
        project_scope: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      style={{ paddingTop: "14vh", paddingBottom: "8vh", backgroundColor: "#F6E9D9" }}
    >
      {/* Big headline */}
      <div className="px-8 md:px-14 mb-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="micro-label mb-5 flex items-center gap-3" style={{ color: "#043222" }}>
            <span style={{ color: "rgba(4,50,34,0.35)" }}>06</span>
            <span
              style={{
                width: "16px",
                height: "1px",
                backgroundColor: "rgba(4,50,34,0.25)",
                display: "inline-block",
              }}
            />
            New Projects
          </div>
          <h2
            style={{
              fontFamily: "Boska, ui-serif, Georgia, serif",
              fontSize: "clamp(3.8rem, 10.5vw, 13.5rem)",
              lineHeight: "0.92",
              letterSpacing: "-0.046em",
              color: "#043222",
              paddingBottom: "0.16em",
              margin: 0,
            }}
          >
            Let's build
            <br />
            <span style={{ fontStyle: "italic", color: "rgba(4,50,34,0.22)" }}>
              something serious.
            </span>
          </h2>
        </motion.div>
      </div>

      <div
        className="px-8 md:px-14 grid grid-cols-1 md:grid-cols-12 gap-px rounded-sm overflow-hidden"
        style={{ border: "1px solid rgba(4,50,34,0.10)" }}
      >
        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="md:col-span-4 p-10 md:pt-7 flex flex-col gap-9 relative md:-top-4"
          style={{ borderRight: "1px solid rgba(4,50,34,0.10)", backgroundColor: "#FFF8EE" }}
        >
          {/* Availability */}
          <div
            style={{
              border: "1px solid rgba(4,50,34,0.12)",
              padding: "1.4rem",
              backgroundColor: "#FFEDA8",
              borderRadius: "0.25rem",
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#043222",
                }}
              />
              <span
                className="micro-label"
                style={{
                  color: "#043222",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Currently Available
              </span>
            </div>
            <p
              style={{
                fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                fontSize: "0.78rem",
                color: "#003631",
                lineHeight: "1.65",
                margin: 0,
              }}
            >
              We take on 3–4 active engagements at a time.
            </p>
          </div>

          <div>
            <div className="micro-label mb-2" style={{ color: "#043222" }}>
              Response Time
            </div>
            <p
              style={{
                fontFamily: "Boska, ui-serif, Georgia, serif",
                fontSize: "1.45rem",
                letterSpacing: "-0.03em",
                color: "#043222",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Within 24 hours,
              <br />
              always.
            </p>
          </div>

          <div>
            <div className="micro-label mb-3" style={{ color: "#043222" }}>
              Direct Email
            </div>
            <a
              href="mailto:hello@formastudio.co"
              className="transition-colors duration-300"
              style={{
                fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                fontSize: "0.85rem",
                color: "#4F5B57",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#043222";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#4F5B57";
              }}
              data-cursor=""
            >
              hello@formastudio.co
            </a>
          </div>

          {/* <div>
            <div className="micro-label mb-4" style={{ color: "#043222" }}>
              Find Our Work
            </div>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 group transition-all duration-300"
                style={{ borderBottom: "1px solid rgba(4,50,34,0.10)", textDecoration: "none" }}
                data-cursor=""
              >
                <span
                  className="micro-label transition-colors duration-300"
                  style={{ color: "#4F5B57" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#043222";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#4F5B57";
                  }}
                >
                  {s.label}
                </span>
                <span className="micro-label" style={{ color: "rgba(4,50,34,0.22)" }}>
                  [{s.indicator}]
                </span>
              </a>
            ))}
          </div> */}

          <p
            style={{
              fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
              marginTop: "auto",
              fontSize: "0.72rem",
              color: "rgba(4,50,34,0.30)",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            We work with founders, brand teams, and product leaders who value craft and move with
            intention.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="md:col-span-8 p-10"
          style={{ backgroundColor: "#F6E9D9" }}
        >
          {status === "success" ? (
            <div className="h-full flex flex-col items-start justify-center gap-5 py-16">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid rgba(4,50,34,0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8L6.5 11.5L13 5"
                    stroke="#043222"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "Boska, ui-serif, Georgia, serif",
                  fontSize: "2.8rem",
                  letterSpacing: "-0.04em",
                  color: "#043222",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                Message
                <br />
                received.
              </h3>
              <p
                style={{
                  fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                  color: "#4F5B57",
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                }}
              >
                We'll review your brief and be in touch within one business day.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="micro-label mt-4 transition-colors duration-300"
                style={{ color: "#4F5B57", background: "none", border: "none", padding: 0 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#043222";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#4F5B57";
                }}
                data-cursor=""
              >
                ← Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {[
                  { name: "name", label: "Your Name *", placeholder: "Jane Smith", type: "text" },
                  {
                    name: "email",
                    label: "Work Email *",
                    placeholder: "jane@company.com",
                    type: "email",
                  },
                ].map((f) => (
                  <div key={f.name} className="flex flex-col gap-2">
                    <label className="micro-label" style={{ color: "#4F5B57" }}>
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type={f.type}
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange}
                      required
                      placeholder={f.placeholder}
                      style={{ ...inputBase }}
                      onFocus={(e) => {
                        e.target.style.borderBottomColor = "#043222";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderBottomColor = "rgba(4,50,34,0.15)";
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label className="micro-label" style={{ color: "#4F5B57" }}>
                  Service Area *
                </label>
                <select
                  name="project_scope"
                  value={form.project_scope}
                  onChange={handleChange}
                  required
                  style={{
                    ...inputBase,
                    color: form.project_scope ? "#111111" : "#4F5B57",
                    appearance: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = "#043222";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = "rgba(4,50,34,0.15)";
                  }}
                >
                  <option
                    value=""
                    disabled
                    style={{ backgroundColor: "#FFF8EE", color: "#4F5B57" }}
                  >
                    Select a service
                  </option>
                  {PROJECT_SCOPES.map((s) => (
                    <option
                      key={s}
                      value={s}
                      style={{ backgroundColor: "#FFF8EE", color: "#111111" }}
                    >
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="micro-label" style={{ color: "#4F5B57" }}>
                  Budget Range
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, budget: b }))}
                      className="micro-label px-4 py-2 rounded-sm transition-all duration-300"
                      style={{
                        border:
                          form.budget === b ? "1px solid #043222" : "1px solid rgba(4,50,34,0.18)",
                        color: form.budget === b ? "#FFF8EE" : "#4F5B57",
                        backgroundColor: form.budget === b ? "#043222" : "transparent",
                        fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                        fontSize: "0.68rem",
                        letterSpacing: "0.04em",
                      }}
                      data-cursor=""
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="micro-label" style={{ color: "#4F5B57" }}>
                  Brief
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us what you're building, what's at stake, and when you need it..."
                  style={{ ...inputBase, resize: "none", lineHeight: "1.65" }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = "#043222";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = "rgba(4,50,34,0.15)";
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <p
                  style={{
                    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                    fontSize: "0.68rem",
                    color: "rgba(4,50,34,0.3)",
                    margin: 0,
                  }}
                >
                  * Required. All submissions reviewed personally.
                </p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="micro-label flex items-center gap-4 px-7 py-3.5 rounded-sm transition-all duration-400"
                  style={{
                    backgroundColor: "#043222",
                    color: "#FFF8EE",
                    opacity: status === "loading" ? 0.6 : 1,
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "loading") e.currentTarget.style.backgroundColor = "#003631";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#043222";
                  }}
                  data-cursor=""
                >
                  {status === "loading" ? "Sending..." : "Submit Brief"}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{ transform: "rotate(-45deg)" }}
                  >
                    <path
                      d="M1 11L11 1M11 1H4M11 1V8"
                      stroke="#FFF8EE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div
        className="px-8 md:px-14 mt-px py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
        style={{
          border: "1px solid rgba(4,50,34,0.10)",
          borderTop: "none",
          backgroundColor: "#FFF8EE",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#043222" }}
          />
          <span className="micro-label" style={{ color: "rgba(4,50,34,0.4)" }}>
            DEVNest © 2026
          </span>
        </div>
        <span className="micro-label" style={{ color: "rgba(4,50,34,0.22)" }}>
          India · Hyderabad · Remote
        </span>
        <span
          style={{
            fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
            fontSize: "0.68rem",
            color: "rgba(4,50,34,0.22)",
          }}
        >
         
        </span>
      </div>
    </section>
  );
}

export default Contact;