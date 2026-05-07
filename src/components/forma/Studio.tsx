import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { revealVariants, viewportConfig } from "../../lib/motion";

const TEAM = [
  {
    name: "Ajith M",
    role: "Strategy & Brand",
    bio: "Formerly IDEO and Wolff Olins. Builds brand systems that hold under pressure — for founders, market shifts, and long-term growth.",
    image: "/images/ajith.png",
    initials: "MV",
    showConnect: false,
    linkedin: "https://www.linkedin.com/in/ajith-marella-92ba39317/",
  },
  {
    name: "Vineeth S",
    role: "Engineering",
    bio: "Led engineering at two acquired startups. Writes code for the long run — scalable, maintainable, and genuinely fast.",
    image: "https://res.cloudinary.com/dhgkvhtol/image/upload/v1777885609/WhatsApp_Image_2026-05-04_at_11.47.01_jxgybp.jpg",
    initials: "KN",
    showConnect: false,
    linkedin: "https://www.linkedin.com/in/shakhamuri-vineeth-kumar/",
  },
  {
    name: "Nithyajeevan M",
    role: "Product & UX",
    bio: "Has shipped interfaces used by tens of millions. Brings research rigour and an instinct for what people actually need.",
    image: "https://res.cloudinary.com/dhgkvhtol/image/upload/v1777986194/Screenshot_20260504_191113_Gallery_fks98h.jpg",
    initials: "SO",
    showConnect: false,
    linkedin: "https://www.linkedin.com/in/nithyajeevanmakili/",
  },
  {
    name: "Ajay V",
    role: "Art Direction",
    bio: "Creative lead with an Awwwards SoTY nomination. Champions restraint, craft, and work that looks inevitable in hindsight.",
    image: "/images/ajay.jpg",
    initials: "TM",
    showConnect: false,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function TeamCard({ member, index }: { member: (typeof TEAM)[0]; index: number }) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    const variants = {
      initial: { 
        scale: 1, 
        filter: isMobile 
          ? "grayscale(0%) contrast(1) brightness(1) blur(0px)" 
          : "grayscale(50%) contrast(1.02) brightness(0.92) blur(0.8px)" 
      },
      visible: { 
        scale: 1, 
        filter: isMobile 
          ? "grayscale(0%) contrast(1) brightness(1) blur(0px)" 
          : "grayscale(50%) contrast(1.02) brightness(0.92) blur(0.8px)" 
      },
      hover: { 
        scale: isMobile ? 1 : 1.03, 
        filter: "grayscale(0%) contrast(1) brightness(1.05) blur(0px)" 
      }
    };

  const content = (
    <motion.div
      initial="initial"
      whileInView="visible"
      whileHover="hover"
      variants={{
        initial: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease, delay: index * 0.08 } },
      }}
      viewport={{ once: true, margin: "-50px" }}
      data-cursor={member.linkedin ? "Connect" : ""}
      style={{ height: "100%", cursor: member.linkedin ? "pointer" : "default" }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: "1.1rem",
          borderRadius: "2px",
          aspectRatio: "3/4",
          border: "1px solid rgba(4,50,34,0.09)",
          backgroundColor: "#EDE3D4",
        }}
      >
        <motion.div
          variants={variants}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${member.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        
        {/* Coffee Overlay */}
        <motion.div
          variants={{
            initial: { opacity: 0.32 },
            visible: { opacity: 0.32 },
            hover: { opacity: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#6F4E37",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Initials watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "Boska, ui-serif, Georgia, serif",
              fontSize: "4.5rem",
              color: "rgba(4,50,34,0.07)",
              letterSpacing: "-0.04em",
            }}
          >
            {member.initials}
          </span>
        </div>

        {/* CONNECT badge — only on Seren */}
        {member.showConnect && (
          <div
            style={{
              position: "absolute",
              bottom: "-14px",
              left: "16px",
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "#043222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: "Inter,sans-serif",
                fontSize: "0.42rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#FFF8EE",
                textAlign: "center",
              }}
            >
              CONNECT
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          borderBottom: "1px solid rgba(4,50,34,0.09)",
          paddingBottom: "1.1rem",
          paddingTop: "1.25rem",
        }}
      >
        <h3
          style={{
            margin: "0 0 0.2rem",
            fontFamily: "Boska, ui-serif, Georgia, serif",
            fontSize: "1.15rem",
            letterSpacing: "-0.03em",
            color: "#043222",
            lineHeight: 1.1,
            paddingBottom: "0.04em",
          }}
        >
          {member.name}
        </h3>
        <div
          style={{
            fontFamily: "Inter,sans-serif",
            fontSize: "0.60rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(4,50,34,0.45)",
            marginBottom: "0.55rem",
          }}
        >
          {member.role}
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "Inter,sans-serif",
            fontSize: "0.77rem",
            lineHeight: "1.66",
            color: "#4F5B57",
          }}
        >
          {member.bio}
        </p>
      </div>
    </motion.div>
  );

  if (member.linkedin) {
    return (
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block", height: "100%" }}
      >
        {content}
      </a>
    );
  }

  return content;
}

export function Studio() {
  return (
    <section
      id="studio"
      style={{ paddingTop: "16vh", paddingBottom: "16vh", backgroundColor: "#FFF8EE" }}
    >
      {/* Full-bleed pullquote banner */}
      <div
        style={{
          width: "100%",
          height: "44vh",
          position: "relative",
          overflow: "hidden",
          marginBottom: "7rem",
        }}
      >
        <motion.div
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=2800&q=90)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            filter: "brightness(0.28) saturate(0.45)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom,#FFF8EE 0%,transparent 18%,transparent 82%,#FFF8EE 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right,rgba(255,248,238,0.35) 0%,transparent 40%)",
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={revealVariants}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 2rem",
          }}
        >
          <p
            style={{
              fontFamily: "Boska, ui-serif, Georgia, serif",
              textAlign: "center",
              fontSize: "clamp(1.25rem,2.8vw,2.8rem)",
              letterSpacing: "-0.03em",
              color: "#FFF8EE",
              lineHeight: 1.22,
              maxWidth: "680px",
              opacity: 0.92,
              paddingBottom: "0.06em",
            }}
          >
            "We keep the studio small on purpose.{" "}
            <span style={{ fontStyle: "italic", color: "#FFEDA8" }}>
              Every client works directly with the principals."
            </span>
          </p>
        </motion.div>
      </div>

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
              <span style={{ color: "rgba(4,50,34,0.28)" }}>04</span>
              <span
                style={{
                  width: "14px",
                  height: "1px",
                  backgroundColor: "rgba(4,50,34,0.22)",
                  display: "inline-block",
                }}
              />
              The Studio
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
              Four principals.
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(4,50,34,0.28)" }}>
                One standard.
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
            No layers. No junior execution on client work. The principals you meet at pitch are the
            ones who build your project.
          </p>
        </motion.div>
      </div>

      {/* Team grid */}
      <div
        className="px-8 md:px-14"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: "2rem",
          marginBottom: "4rem",
        }}
      >
        {TEAM.map((m, i) => (
          <TeamCard key={m.name} member={m} index={i} />
        ))}
      </div>

      {/* Stats bar */}
      {/* <div
        className="mx-8 md:mx-14"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "1px",
          border: "1px solid rgba(4,50,34,0.09)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: i * 0.08 }}
            style={{
              padding: "1.75rem 2rem",
              backgroundColor: "#FFF8EE",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(4,50,34,0.09)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            <div
              style={{
                fontFamily: "Boska, ui-serif, Georgia, serif",
                fontSize: "clamp(1.8rem,3.2vw,2.8rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#043222",
                paddingBottom: "0.04em",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "Inter,sans-serif",
                fontSize: "0.60rem",
                fontWeight: 600,
                letterSpacing: "0.17em",
                textTransform: "uppercase",
                color: "rgba(4,50,34,0.33)",
              }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div> */}
    </section>
  );
}
