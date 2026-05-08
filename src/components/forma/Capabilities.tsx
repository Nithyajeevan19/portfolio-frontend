import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { revealVariants, viewportConfig } from "../../lib/motion";

const SERVICES = [
  {
    index: "01",
    title: "Web Experiences",
    body: "We design high-performing websites and digital experiences that help brands stand out, build trust, and convert attention into action. Every interaction is crafted with clarity, motion, and purpose.",
    deliverables: [
      "Custom Website Design",
      "Interactive Landing Pages",
      "UI/UX Design",
      "Performance & Responsive Build",
    ],
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=85",
  },
  {
    index: "02",
    title: "Digital Systems",
    body: "We build smart digital systems that simplify operations, improve customer experience, and create scalable foundations for growing businesses.",
    deliverables: [
      "Booking & Management Systems",
      "Automation Workflows",
      "CRM & Business Dashboards",
      "Digital Operations Systems",
    ],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85",
  },
  {
    index: "03",
    title: "Scalable SaaS",
    body: "From early-stage concepts to scalable platforms, we turn ideas into digital products focused on usability, scalability, and long-term growth.",
    deliverables: [
      "SaaS Product Design",
      "MVP Development",
      "User Flows & Product Strategy",
      "Scalable Product Systems",
    ],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=85",
  },
  {
    index: "04",
    title: "Growth & Media",
    body: "We help modern brands grow through strategic content, social presence, paid campaigns, and digital storytelling that connects with the right audience.",
    deliverables: [
      "Meta Ads & Campaigns",
      "Social Media Management",
      "Content Strategy",
      "Short-Form Video & Creative",
    ],
    image:
      "https://res.cloudinary.com/dqkbvljmo/image/upload/v1778151931/ONKJD40_ohrqhg.jpg",
  },
  {
    index: "05",
    title: "Creative\nTechnology",
    body: "We combine design with modern technology to create immersive and future-forward digital experiences that add real value.",
    deliverables: [
      "3D & Interactive Experiences",
      "Three.js & Web Animations",
      "AI-Powered Features",
      "Creative Development & R&D",
    ],
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=85",
  },
  {
    index: "06",
    title: "Creative\nDirection",
    body: "We help brands maintain a strong and consistent visual presence across products, campaigns, and digital platforms.",
    deliverables: [
      "Brand Visual Direction",
      "Campaign Concepts",
      "Design System Oversight",
      "Digital Brand Consistency",
    ],
    image:
      "https://res.cloudinary.com/dhgkvhtol/image/upload/v1778152839/2701822_uq0n0t.jpg",
  },
];


const ease = [0.16, 1, 0.3, 1];

export function Capabilities() {
  const [active, setActive] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="services"
      style={{ paddingTop: "14vh", paddingBottom: "14vh", backgroundColor: "#FFF8EE" }}
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
        >
          <div className="micro-label mb-5 flex items-center gap-3" style={{ color: "#043222", fontFamily: "Inter, sans-serif", fontSize: "0.60rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            <span style={{ color: "rgba(4,50,34,0.30)" }}>01</span>
            <span style={{ width: "16px", height: "1px", backgroundColor: "rgba(4,50,34,0.20)" }} />
            Capabilities
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              style={{
                margin: 0,
                fontFamily: "Boska,Georgia,serif",
                fontSize: "clamp(2.2rem,5vw,5.5rem)",
                lineHeight: "0.94",
                letterSpacing: "-0.044em",
                color: "#043222",
                paddingBottom: "0.12em",
              }}
            >
              What we<br />
              <span style={{ fontStyle: "italic", color: "rgba(4,50,34,0.28)" }}>do best.</span>
            </h2>
            <p
              style={{
                fontFamily: "Satoshi,Inter,sans-serif",
                fontSize: "0.82rem",
                lineHeight: "1.80",
                color: "#4F5B57",
                maxWidth: "21rem",
                margin: 0,
              }}
            >
              Built for performance and high-intent engagement. We don't just build websites; we
              architect digital systems that drive growth.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="md:px-14">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 rounded-sm overflow-hidden"
          style={{ 
            border: isMobile ? "none" : "1px solid rgba(4,50,34,0.09)"
          }}
        >
          <div style={{ borderRight: isMobile ? "none" : "1px solid rgba(4,50,34,0.09)", backgroundColor: "#FFF8EE" }}>
            {/* Services List (Accordion Style for both Mobile & Desktop) */}
            <div className="w-full">
              {SERVICES.map((svc, i) => (
                <motion.button
                  key={svc.index}
                  className="w-full text-left"
                  style={{
                    padding: "1.65rem 2.25rem",
                    borderBottom: isMobile ? "none" : (i < SERVICES.length - 1 ? "1px solid rgba(4,50,34,0.09)" : "none"),
                    backgroundColor: active === i ? (isMobile ? "#FFF8EE" : "rgba(4,50,34,0.035)") : "#FFF8EE",
                    transition: "background-color 0.35s ease",
                    cursor: "pointer",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    outline: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => !isMobile && setActive(i)}
                  data-cursor=""
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: ease as any, delay: i * 0.06 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1.25rem",
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Satoshi,Inter,sans-serif",
                          fontSize: "0.58rem",
                          fontWeight: 600,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: active === i ? "#043222" : "rgba(4,50,34,0.22)",
                          paddingTop: "0.2rem",
                          flexShrink: 0,
                          transition: "color 0.35s",
                        }}
                      >
                        {svc.index}
                      </span>
                      <h3
                        style={{
                          margin: 0,
                          fontFamily: "Boska,Georgia,serif",
                          fontSize: "clamp(1.2rem,1.9vw,1.65rem)",
                          lineHeight: "1.1",
                          letterSpacing: "-0.032em",
                          color: active === i ? "#043222" : "#5a6b62",
                          whiteSpace: "pre-line",
                          transition: "color 0.35s",
                          paddingBottom: "0.06em",
                        }}
                      >
                        {svc.title}
                      </h3>
                    </div>
                    <div
                      style={{
                        flexShrink: 0,
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid",
                        borderColor: active === i ? "#043222" : "rgba(4,50,34,0.16)",
                        borderRadius: "50%",
                        transform: active === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.4s ease, border-color 0.3s ease",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2.5 3.75L5 6.25L7.5 3.75"
                          stroke={active === i ? "#043222" : "rgba(4,50,34,0.32)"}
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: active === i ? "280px" : "0",
                      marginTop: active === i ? "1.1rem" : "0",
                      transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), margin-top 0.4s ease",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Satoshi,Inter,sans-serif",
                        fontSize: "0.81rem",
                        lineHeight: "1.76",
                        color: "#4F5B57",
                        marginLeft: "2.6rem",
                        marginBottom: "0.9rem",
                        marginTop: 0,
                      }}
                    >
                      {svc.body}
                    </p>
                    <div
                      style={{
                        marginLeft: "2.6rem",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.45rem",
                      }}
                    >
                      {svc.deliverables.map((d) => (
                        <span
                          key={d}
                          style={{
                            fontFamily: "Satoshi,Inter,sans-serif",
                            fontSize: "0.58rem",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: "0.28rem 0.65rem",
                            borderRadius: "2px",
                            border: "1px solid rgba(4,50,34,0.11)",
                            color: "#4F5B57",
                            backgroundColor: "rgba(4,50,34,0.025)",
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Mobile Content Display (Static below dropdown) */}
            {isMobile && (
              <motion.div
                key={`mobile-content-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  padding: "0.5rem 2.25rem 2.25rem", 
                  backgroundColor: "#FFF8EE",
                  marginTop: "-1rem" 
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.2rem" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#043222" }} />
                  <span style={{ fontFamily: "Satoshi, sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(4,50,34,0.5)" }}>
                    Overview
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "Satoshi,Inter,sans-serif",
                    fontSize: "0.88rem",
                    lineHeight: "1.8",
                    color: "#4F5B57",
                    marginBottom: "2rem",
                    margin: 0,
                  }}
                >
                  {SERVICES[active].body}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                  {SERVICES[active].deliverables.map((d) => (
                    <span
                      key={d}
                      style={{
                        fontFamily: "Satoshi,Inter,sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "2px",
                        border: "1px solid rgba(4,50,34,0.11)",
                        color: "#4F5B57",
                        backgroundColor: "rgba(4,50,34,0.02)",
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div
            className="svc-img-panel"
            style={{
              backgroundColor: "#F0E6D6",
              minHeight: "460px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.045 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: ease as any }}
                style={{ position: "absolute", inset: 0 }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${SERVICES[active].image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.50) saturate(0.55)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(140deg,rgba(4,50,34,0.20) 0%,transparent 52%)",
                  }}
                />
                <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
                  <div
                    style={{
                      fontFamily: "Satoshi,Inter,sans-serif",
                      fontSize: "0.58rem",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#FFEDA8",
                      marginBottom: "0.55rem",
                    }}
                  >
                    {SERVICES[active].index}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "Boska,Georgia,serif",
                      fontSize: "clamp(1.3rem,2vw,1.9rem)",
                      letterSpacing: "-0.03em",
                      color: "#FFF8EE",
                      lineHeight: 1.1,
                      whiteSpace: "pre-line",
                      paddingBottom: "0.06em",
                    }}
                  >
                    {SERVICES[active].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media(min-width:1024px){
          .svc-img-panel{ display:block!important; }
        }
        @media(max-width:1023px){
          .svc-img-panel{ display:none!important; }
        }
      `}</style>
    </section>
  );
}
