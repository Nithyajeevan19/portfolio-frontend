import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  services: string;
  year: number;
  description: string;
  cover_image: string;
  featured: boolean;
  tags: string[];
}

function WorkCard({
  project,
  index,
  size = "normal",
}: {
  project: Project;
  index: number;
  size?: "normal" | "large";
}) {
  const [hov, setHov] = useState(false);
  const [xy, setXY] = useState({ x: 50, y: 50 });
  const isLarge = size === "large";

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setXY({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
    >
      <Link
        to="/case-study/$slug"
        params={{ slug: project.slug }}
        className="block relative overflow-hidden"
        style={{
          borderRadius: "2px",
          border: "1px solid rgba(4,50,34,0.09)",
          backgroundColor: "#FFF8EE",
          boxShadow: hov ? "0 22px 56px rgba(4,50,34,0.10)" : "0 2px 10px rgba(4,50,34,0.04)",
          transform: hov ? "translateY(-2px)" : "translateY(0)",
          transition: "box-shadow 0.65s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          textDecoration: "none",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onMouseMove={onMove}
        data-cursor="View"
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: isLarge ? "clamp(300px,46vw,600px)" : "clamp(220px,28vw,380px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${project.cover_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: hov ? "scale(1.055)" : "scale(1.0)",
              filter: hov ? "brightness(0.68) saturate(0.88)" : "brightness(0.62) saturate(0.80)",
              transition: "transform 1.0s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease",
            }}
          />

          {/* Radial hover glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(circle at ${xy.x}% ${xy.y}%, rgba(4,50,34,0.11) 0%, transparent 52%)`,
              opacity: hov ? 1 : 0,
              transition: "opacity 0.45s",
            }}
          />

          {/* Gradient vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(4,50,34,0.75) 0%, rgba(4,50,34,0.14) 42%, transparent 62%)",
            }}
          />

          {/* Tag */}
          {project.featured && (
            <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem" }}>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "0.32rem 0.7rem",
                  borderRadius: "2px",
                  backgroundColor: "#FFEDA8",
                  color: "#043222",
                }}
              >
                FEATURED
              </span>
            </div>
          )}

          {/* Arrow CTA */}
          <div
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
              border: "1px solid rgba(255,248,238,0.38)",
              backgroundColor: hov ? "#FFF8EE" : "transparent",
              opacity: hov ? 1 : 0,
              transform: hov ? "translate(0,0)" : "translate(5px,-5px)",
              transition: "all 0.5s ease",
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              style={{ transform: "rotate(-45deg)" }}
            >
              <path
                d="M1 11L11 1M11 1H4M11 1V8"
                stroke="#043222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Card bottom metadata */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "0.55rem",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#FFEDA8",
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,248,238,0.35)",
                }}
              >
                ·
              </span>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,248,238,0.50)",
                }}
              >
                {project.services}
              </span>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,248,238,0.30)",
                  marginLeft: "auto",
                }}
              >
                {project.year}
              </span>
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: "Boska, ui-serif, Georgia, serif",
                fontSize: "clamp(1.45rem,2.4vw,2.1rem)",
                letterSpacing: "-0.035em",
                color: "#FFF8EE",
                lineHeight: 1.06,
                paddingBottom: "0.06em",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontFamily: "Inter,sans-serif",
                fontSize: "0.73rem",
                color: "rgba(255,248,238,0.52)",
              }}
            >
              {project.client}
            </p>
          </div>
        </div>

        {/* Result strip */}
        <div
          style={{
            padding: "0.9rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: hov ? "rgba(4,50,34,0.03)" : "#FFF8EE",
            transition: "background-color 0.4s",
            borderTop: "1px solid rgba(4,50,34,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                backgroundColor: "#043222",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "Inter,sans-serif",
                fontSize: "0.72rem",
                color: "#4F5B57",
                lineHeight: 1.5,
              }}
            >
              {project.description}
            </span>
          </div>
          <span
            style={{
              fontFamily: "Inter,sans-serif",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: hov ? "#043222" : "rgba(4,50,34,0.22)",
              transition: "color 0.35s",
              whiteSpace: "nowrap",
              paddingLeft: "1rem",
            }}
          >
            Case Study →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function SelectedWork(props: any) {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["case_studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
  });

  if (isLoading) {
    return (
      <div
        style={{
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F6E9D9",
        }}
      >
        <p
          style={{
            fontFamily: "Inter,sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "rgba(4,50,34,0.3)",
          }}
        >
          LOADING WORK...
        </p>
      </div>
    );
  }

  const items = projects || [];

  return (
    <section
      id="work"
      style={{ paddingTop: "16vh", paddingBottom: "14vh", backgroundColor: "#F6E9D9" }}
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
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
              <span style={{ color: "rgba(4,50,34,0.28)" }}>02</span>
              <span
                style={{
                  width: "14px",
                  height: "1px",
                  backgroundColor: "rgba(4,50,34,0.22)",
                  display: "inline-block",
                }}
              />
              Selected Work
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
              Work that
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(4,50,34,0.28)" }}>
                earns its place.
              </span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "Inter,sans-serif",
              fontSize: "0.82rem",
              lineHeight: "1.80",
              color: "#4F5B57",
              maxWidth: "21rem",
            }}
          >
            A focused selection. Every engagement is led by senior principals, from strategy through
            final delivery.
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div
        className="px-8 md:px-14"
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
      >
        {items.map((project, i) => {
          // Dynamic layout logic: every 3rd item is large
          const size = i % 3 === 0 ? "large" : "normal";
          return <WorkCard key={project.id} project={project} index={i} size={size} />;
        })}
      </div>

      {/* Footer bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="px-8 md:px-14 mt-14"
        style={{
          borderTop: "1px solid rgba(4,50,34,0.09)",
          paddingTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.2rem" }}>
          {["Fintech", "Luxury", "SaaS", "Web3", "Climate"].map((c) => (
            <span
              key={c}
              style={{
                fontFamily: "Inter,sans-serif",
                fontSize: "0.60rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(4,50,34,0.20)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <a
          href="#contact"
          style={{
            fontFamily: "Inter,sans-serif",
            fontWeight: 600,
            fontSize: "0.68rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#4F5B57",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#043222")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#4F5B57")}
          data-cursor=""
        >
          Discuss a project
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            style={{ transform: "rotate(-45deg)" }}
          >
            <path
              d="M1 11L11 1M11 1H4M11 1V8"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
