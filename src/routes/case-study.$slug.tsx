import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CASE_STUDIES, type CaseStudy } from "../data/caseStudies";
import CustomCursor from "../components/forma/CustomCursor";
import { Navbar } from "../components/forma/Navbar";

export const Route = createFileRoute("/case-study/$slug")({
  component: CaseStudy,
});

export default function CaseStudy() {
  const { slug } = Route.useParams();
  const study = CASE_STUDIES.find((s) => s.slug.trim() === slug.trim());
  console.log("Slug:", slug);
  console.log("All studies:", CASE_STUDIES);
  console.log("Selected study:", study);

  if (!study) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "Inter,sans-serif",
              fontSize: "0.8rem",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            STUDY NOT FOUND
          </p>
          <Link to="/" style={{ color: "#FFEDA8", fontSize: "0.7rem", textDecoration: "none" }}>
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const blocks = [
    { label: "The Context", content: study.the_context },
    { label: "The Challenge", content: study.the_challenge },
    { label: "The Approach", content: study.the_approach },
  ].filter((b) => b.content !== undefined);

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>
      <CustomCursor />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero */}
          <section
            className="relative w-full overflow-hidden"
            style={{ height: "85vh", borderBottom: "1px solid #1A1A1A" }}
          >
            <div className="absolute inset-0 z-0">
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${study.cover_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-12 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl"
              >
                <div
                  className="micro-label mb-6"
                  style={{ color: "#888888", fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif" }}
                >
                  CASE STUDY // {study.year}
                </div>
                <h1
                  style={{
                    fontFamily: "Boska, ui-serif, Georgia, serif",
                    fontSize: "clamp(2.5rem, 8vw, 7.5rem)",
                    lineHeight: "0.94",
                    letterSpacing: "-0.04em",
                    color: "#FFF8EE",
                    margin: 0,
                  }}
                >
                  {study.project_title}
                </h1>
                {study.live_site_link && (
                  <a
                    href={study.live_site_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="micro-label flex items-center gap-2 mt-8 transition-colors hover:text-white"
                    style={{
                      color: "#C8FF00",
                      fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                      textDecoration: "none",
                    }}
                    data-cursor=""
                  >
                    View Live Site →
                  </a>
                )}
              </motion.div>
            </div>
          </section>

          {/* Meta + Content */}
          <section className="px-8 md:px-12" style={{ paddingTop: "10vh", paddingBottom: "10vh" }}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              {/* Sticky sidebar */}
              <div className="md:col-span-3">
                <div className="sticky top-28 flex flex-col gap-8">
                  {[
                    { label: "Client", value: study.client_name },
                    { label: "Services", value: study.services },
                    { label: "Year", value: String(study.year) },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div
                        className="micro-label mb-2"
                        style={{ color: "#888888", fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif" }}
                      >
                        {label}
                      </div>
                      <p
                        style={{
                          color: "#F4F4F0",
                          fontSize: "0.9rem",
                          lineHeight: "1.6",
                          fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                          margin: 0,
                        }}
                      >
                        {value}
                      </p>
                      <div style={{ width: "100%", height: "1px", backgroundColor: "#1A1A1A", marginTop: "2rem" }} />
                    </div>
                  ))}
                  <div>
                    <div
                      className="micro-label mb-2"
                      style={{ color: "#888888", fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif" }}
                    >
                      Industry
                    </div>
                    <p
                      className="micro-label"
                      style={{
                        color: "#C8FF00",
                        border: "1px solid rgba(200,255,0,0.2)",
                        padding: "4px 8px",
                        display: "inline-block",
                        fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                        margin: 0,
                      }}
                    >
                      {study.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content blocks */}
              <div className="md:col-span-9 flex flex-col gap-16">
                {blocks.map((block, i) => (
                  <motion.div
                    key={block.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  >
                    <div
                      className="micro-label mb-5"
                      style={{ color: "#C8FF00", fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif" }}
                    >
                      {String(i + 1).padStart(2, "0")} // {block.label.toUpperCase()}
                    </div>
                    <p
                      style={{
                        fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                        fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                        lineHeight: "1.4",
                        letterSpacing: "-0.02em",
                        color: "#F4F4F0",
                        margin: 0,
                      }}
                    >
                      {block.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery */}
          {study.gallery.length > 0 && (
            <section className="px-8 md:px-12" style={{ paddingBottom: "10vh" }}>
              <div
                className="micro-label mb-8"
                style={{ color: "#888888", fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif" }}
              >
                VISUAL SYSTEM
              </div>
              <div className="mb-4" style={{ height: "60vh", overflow: "hidden", border: "1px solid #1A1A1A" }}>
                <img
                  src={study.gallery[0]}
                  alt="Gallery 1"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.85)" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {study.gallery.slice(1, 3).map((img, i) => (
                  <div key={i} style={{ aspectRatio: "16/10", overflow: "hidden", border: "1px solid #1A1A1A" }}>
                    <img
                      src={img}
                      alt={`Gallery ${i + 2}`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      style={{ filter: "brightness(0.85)" }}
                    />
                  </div>
                ))}
              </div>
              {study.gallery[3] && (
                <div className="mt-4" style={{ height: "40vh", overflow: "hidden", border: "1px solid #1A1A1A" }}>
                  <img
                    src={study.gallery[3]}
                    alt="Gallery 4"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.85)" }}
                  />
                </div>
              )}
            </section>
          )}

          {/* Impact */}
          {(study.impact_metric_1 || study.the_impact) && (
            <section
              className="px-8 md:px-12 py-20 mx-8 md:mx-12 mb-20"
              style={{ border: "1px solid #1A1A1A", backgroundColor: "#0D0D0D" }}
            >
              <div
                className="micro-label mb-10"
                style={{ color: "#C8FF00", fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif" }}
              >
                04 // THE IMPACT
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {[
                  { metric: study.impact_metric_1, label: study.impact_label_1 },
                  { metric: study.impact_metric_2, label: study.impact_label_2 },
                ]
                  .filter((m) => m.metric)
                  .map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    >
                      <div
                        style={{
                          fontFamily: "Boska, ui-serif, Georgia, serif",
                          fontSize: "clamp(3rem, 8vw, 8rem)",
                          lineHeight: 1,
                          letterSpacing: "-0.04em",
                          color: "#FFF8EE",
                        }}
                      >
                        {item.metric}
                      </div>
                      <div
                        className="micro-label mt-3"
                        style={{ color: "#888888", fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif" }}
                      >
                        {item.label?.toUpperCase()}
                      </div>
                    </motion.div>
                  ))}
              </div>
              {study.the_impact && (
                <p
                  style={{
                    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    lineHeight: "1.4",
                    letterSpacing: "-0.02em",
                    color: "#888888",
                    maxWidth: "42rem",
                    margin: 0,
                  }}
                >
                  {study.the_impact}
                </p>
              )}
            </section>
          )}

          {/* Footer nav */}
          <div
            className="px-8 md:px-12 pb-20 flex items-center justify-between"
            style={{ borderTop: "1px solid #1A1A1A", paddingTop: "3rem" }}
          >
            <Link
              to="/"
              className="micro-label flex items-center gap-3 transition-colors hover:text-white"
              style={{
                color: "#888888",
                fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                textDecoration: "none",
              }}
              data-cursor=""
            >
              ← All Work
            </Link>
            <a
              href="/#contact"
              className="micro-label flex items-center gap-3 px-6 py-3 transition-all"
              style={{
                border: "1px solid #1A1A1A",
                color: "#C8FF00",
                fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                textDecoration: "none",
              }}
              data-cursor=""
            >
              Start Your Project →
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
