import { motion } from "framer-motion";
import { revealVariants, viewportConfig } from "../../lib/motion";

const PHASES = [
  {
    index: "01",
    label: "Discover",
    title: "We find\nthe real problem.",
    body: "We dig into the business, user behavior, and data to uncover the underlying friction. Through research, conversation, and analysis, we define the right problem to solve—before writing a single line of code.",
    points: ["Market & User Research", "Friction Mapping", "Tech Opportunity Audit"],
  },
  {
    index: "02",
    label: "Architect",
    title: "We build\nthe right system.",
    body: "We turn the problem into a clear, scalable solution: product logic, data architecture, and experience structure. Everything we design is built to be robust, maintainable, and ready to grow.",
    points: ["Product & System Architecture",
"Data & Tech Flow","Scalable UX Patterns"],
  },
  {
    index: "03",
    label: "Launch & Scale",
    title: "We ship\nright then grow.",
    body: "From prototype to production, we refine, launch, and evolve the solution. We design for performance, clarity, and iteration so the product can scale with the business, not work against it.",
    points: ["MVP Delivery & Launch", "Performance & Analytics", "Iteration & Growth Systems"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const } },
};


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
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={revealVariants}
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
              <span style={{ color: "rgba(4,50,34,0.28)" }}>03</span>
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
            From discovery to deployment, every phase is designed to reduce friction and build with purpose.
          </p>
        </motion.div>
      </div>

      {/* Three columns */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-8 md:mx-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-px"
        style={{
          border: "1px solid rgba(4,50,34,0.09)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.index}
            variants={itemVariants}
            transition={{ delay: i * 0.1 }}
            className="border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            style={{
              padding: "2.5rem",
              backgroundColor: "#FFF8EE",
              borderColor: "rgba(4,50,34,0.09)",
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
      </motion.div>

      
    </section>
  );
}
