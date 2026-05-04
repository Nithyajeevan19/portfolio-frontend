import { motion } from "framer-motion";

const PHASES = [
  {
    index: "01",
    label: "Discover",
    title: "We interrogate\nthe brief.",
    body: "Two to three weeks of stakeholder conversations, competitive mapping, and strategic diagnosis before a single frame is designed.",
    points: ["Stakeholder Interviews", "Competitive Landscape", "Opportunity Mapping"],
  },
  {
    index: "02",
    label: "Architect",
    title: "Structure is\nthe foundation.",
    body: "Brand architecture, product logic, or information framework — the invisible scaffolding that makes every downstream decision feel inevitable.",
    points: ["Brand Architecture", "IA & User Flows", "System Design"],
  },
  {
    index: "03",
    label: "Execute",
    title: "Craft at the\nright level.",
    body: "Senior execution from concept to handoff. Every deliverable is precise, defensible, and documented. We do not ship work we would not sign our names to.",
    points: ["Pixel-Precise Delivery", "Motion & Interaction", "Handoff & Documentation"],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Methodology() {
  return (
    <section
      id="approach"
      style={{ paddingTop: "14vh", paddingBottom: "14vh", backgroundColor: "#F6E9D9" }}
    >
      {/* Header */}
      <div
        className="px-8 md:px-14 mb-14"
        style={{ borderBottom: "1px solid rgba(4,50,34,0.09)", paddingBottom: "2.5rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div
              style={{
                fontFamily: "Inter,sans-serif",
                fontSize: "0.60rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(4,50,34,0.40)",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ color: "rgba(4,50,34,0.28)" }}>05</span>
              <span
                style={{
                  width: "14px",
                  height: "1px",
                  backgroundColor: "rgba(4,50,34,0.22)",
                  display: "inline-block",
                }}
              />
              How We Work
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "Boska, ui-serif, Georgia, serif",
                fontSize: "clamp(2.2rem,5vw,5.5rem)",
                lineHeight: "0.94",
                letterSpacing: "-0.044em",
                color: "#043222",
                paddingBottom: "0.12em",
              }}
            >
              A three-phase
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(4,50,34,0.28)" }}>methodology.</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "Inter,sans-serif",
              fontSize: "0.82rem",
              lineHeight: "1.80",
              color: "#4F5B57",
              maxWidth: "21rem",
              margin: 0,
            }}
          >
            Built over eight years of high-stakes engagements — flexible enough to adapt, structured
            enough to deliver.
          </p>
        </motion.div>
      </div>

      {/* Three columns */}
      <div
        className="mx-8 md:mx-14"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "1px",
          border: "1px solid rgba(4,50,34,0.09)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.index}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.1, ease, delay: i * 0.1 }}
            style={{
              padding: "2.5rem",
              backgroundColor: "#FFF8EE",
              borderRight: i < 2 ? "1px solid rgba(4,50,34,0.09)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}
            >
              <span
                style={{
                  fontFamily: "Boska, ui-serif, Georgia, serif",
                  fontSize: "4.2rem",
                  lineHeight: 1,
                  color: "rgba(4,50,34,0.06)",
                  letterSpacing: "-0.04em",
                }}
              >
                {phase.index}
              </span>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(4,50,34,0.38)",
                }}
              >
                {phase.label}
              </span>
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: "Boska, ui-serif, Georgia, serif",
                fontSize: "clamp(1.25rem,1.8vw,1.65rem)",
                lineHeight: "1.1",
                letterSpacing: "-0.03em",
                color: "#043222",
                whiteSpace: "pre-line",
                paddingBottom: "0.06em",
              }}
            >
              {phase.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: "Inter,sans-serif",
                fontSize: "0.81rem",
                lineHeight: "1.76",
                color: "#4F5B57",
                flex: 1,
              }}
            >
              {phase.body}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.55rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid rgba(4,50,34,0.09)",
              }}
            >
              {phase.points.map((pt) => (
                <div key={pt} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <div
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(4,50,34,0.40)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter,sans-serif",
                      fontSize: "0.60rem",
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#4F5B57",
                    }}
                  >
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Principle pullquote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-3 mx-8 md:mx-14 py-8 px-9"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          borderRadius: "2px",
          border: "1px solid rgba(4,50,34,0.09)",
          backgroundColor: "#FFEDA8",
        }}
        id="principle-row"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "Inter,sans-serif",
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(4,50,34,0.50)",
              flexShrink: 0,
            }}
          >
            Principle
          </div>
          <div
            style={{
              width: "1px",
              height: "28px",
              backgroundColor: "rgba(4,50,34,0.16)",
              flexShrink: 0,
            }}
            className="hidden md:block"
          />
          <p
            style={{
              margin: 0,
              fontFamily: "Boska, ui-serif, Georgia, serif",
              fontSize: "clamp(0.95rem,1.7vw,1.35rem)",
              lineHeight: "1.38",
              letterSpacing: "-0.022em",
              color: "#003631",
              fontStyle: "italic",
            }}
          >
            "We do not believe in decoration for its own sake. Every decision should be defensible,
            measurable, and made by someone who has done it before."
          </p>
        </div>
      </motion.div>
    </section>
  );
}
