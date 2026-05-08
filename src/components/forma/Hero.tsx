import { useState, useEffect, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import LuxuryOrb from "./LuxuryOrb";
import { staggerContainer, fadeUp, luxuryEase } from "../../lib/motion";
import { useMagnetic } from "@/hooks/useMagnetic";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroBtn = memo(({
  href,
  primary,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) => {
  const mag = useMagnetic(0.25);
  return (
    <motion.div
      ref={mag.ref as any}
      style={{ x: mag.pos.x, y: mag.pos.y, willChange: "transform" }}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      onMouseEnter={mag.onMouseEnter}
    >
      <motion.a
        href={href}
        data-cursor=""
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: luxuryEase }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.48rem",
          height: "56px",
          padding: "0 2.8rem",
          borderRadius: "2px",
          backgroundColor: primary ? "#043222" : "#FFF8EE",
          color: primary ? "#FFF8EE" : "#043222",
          fontFamily: "Inter,sans-serif",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          textDecoration: "none",
          border: primary ? "1px solid transparent" : "1px solid rgba(4,50,34,0.14)",
          whiteSpace: "nowrap" as const,
        }}
      >
        {children}
      </motion.a>
    </motion.div>
  );
});


export function Hero() {
  const [orbSize, setOrbSize] = useState(380);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setOrbSize(240);
      else if (w < 1024) setOrbSize(300);
      else if (w < 1440) setOrbSize(380);
      else setOrbSize(440);
    };
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);

  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, -80]);
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100svh",
        backgroundColor: "#F6E9D9",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background Parallax Layer */}
      <motion.div
        style={{
          y: parallaxY,
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {/* Grain overlay - Optimized numOctaves */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.012,
            pointerEvents: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          maxWidth: "1520px",
          width: "100%",
          margin: "0 auto",
          padding: "clamp(4rem,8vh,6rem) clamp(1.5rem,5.5vw,5.5rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Two-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            alignItems: "center",
            gap: "clamp(2rem,4.5vw,4rem)",
          }}
          className="hero-grid"
        >
          {/* LEFT: Copy */}
          <motion.div 
            className="hero-text-col" 
            style={{ minWidth: 0 }}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Availability badge */}
            <motion.div
              variants={fadeUp}
              style={{
                marginBottom: "clamp(2rem,3.2vh,2.8rem)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.5rem 1.1rem",
                border: "1px solid rgba(4,50,34,0.11)",
                borderRadius: "999px",
                backgroundColor: "rgba(255,252,244,0.68)",
                backdropFilter: "blur(12px)",
                fontFamily: "Inter,sans-serif",
                fontWeight: 600,
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#043222",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#043222",
                  boxShadow: "0 0 0 3px rgba(4,50,34,0.08)",
                  flexShrink: 0,
                }}
              />
              Now accepting new projects
            </motion.div>

            <motion.p
              variants={fadeUp}
              style={{
                margin: "0 0 clamp(0.8rem,1.5vh,1.2rem)",
                fontFamily: "Inter,sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#043222",
              }}
            >
              Web Experiences · Digital Systems · Scalable SaaS
            </motion.p>

            <motion.h1
              variants={fadeUp}
              style={{
                margin: 0,
                fontFamily: "Boska, ui-serif, Georgia, serif",
                fontSize: "clamp(2.75rem, 8vw, 7.8rem)",
                lineHeight: 0.94,
                letterSpacing: "-0.046em",
                fontWeight: 400,
                color: "#043222",
                overflow: "hidden",
                paddingBottom: "0.2rem",
                maxWidth: "100%",
              }}
            >
              Design that
works,{" "}
              <span style={{ fontStyle: "italic" }}>
                <span style={{ color: "rgba(4,50,34,0.25)" }}>
                  Systems
that scale, <br />
                
                </span>{" "}
                Value
that lasts.<br />
                
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              style={{
                height: "1px",
                width: "80px",
                backgroundColor: "rgba(4,50,34,0.12)",
                transformOrigin: "left",
                margin: "2.5rem 0 2rem",
              }}
            />

            <motion.p
              variants={fadeUp}
              style={{
                margin: 0,
                maxWidth: "38rem",
                fontFamily: "Inter,sans-serif",
                fontSize: "clamp(0.95rem,1.2vw,1.1rem)",
                lineHeight: 1.75,
                color: "#4F5B57",
              }}
            >
              A modern creative studio for ambitious brands. We craft high-impact web experiences, build smart systems, and turn ideas into scalable products.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", marginTop: "3.5rem" }}
            >
              <HeroBtn href="#work" primary>
                VIEW OUR WORK →
              </HeroBtn>
              <HeroBtn href="#contact">START PROJECT →</HeroBtn>
            </motion.div>
          </motion.div>


          {/* RIGHT: CSS Orb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2, ease: luxuryEase, delay: 0.1 }}
            className="hero-orb-col"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: "100%",
            }}
          >
            <div className="orb-wrapper">
              <MemoizedLuxuryOrb size={orbSize} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar with Stats & Scroll */}
      <div
        className="hero-bottom-bar"
        style={{
          padding: "0 clamp(1.5rem,5.5vw,5.5rem) clamp(2rem,4vh,3rem)",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "flex-end",
          gap: "2rem",
        }}
      >
        {/* Stat row */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.35 }}
          style={{ display: "flex", alignItems: "center", gap: "4rem" }}
        >
          {[
            { val: "8", plus: "+", label: "YRS. SENIOR" },
            { val: "60", plus: "+", label: "ENGAGEMENTS" },
            { val: "12", plus: "", label: "INDUSTRIES" },
          ].map((s) => (
            <div key={s.label}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "Boska, ui-serif, Georgia, serif",
                  fontSize: "2.2rem",
                  color: "#043222",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                {s.val}
                {s.plus && (
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(4,50,34,0.3)",
                      marginLeft: "2px",
                      transform: "translateY(-8px)",
                    }}
                  >
                    {s.plus}
                  </span>
                )}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "Inter,sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(4,50,34,0.4)",
                  marginTop: "8px",
                  fontWeight: 600,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div> */}

        {/* Left symmetry placeholder */}
        <div />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.0 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "Inter,sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(4,50,34,0.28)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "32px",
              background: "linear-gradient(to bottom, rgba(4,50,34,0.22), transparent)",
            }}
          />
        </motion.div>

        {/* Placeholder for symmetry */}
        <div />
      </div>

      <style>{`
        @media (max-width: 767px) { 
          .hero-section {
            min-height: 90svh !important;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            overflow: hidden;
          }
          .hero-grid { 
            grid-template-columns: 1fr !important; 
            gap: 1.5rem !important; 
            position: relative;
            z-index: 1;
            margin-top: 2vh !important;
          } 
          .hero-text-col {
            position: relative;
            z-index: 2;
            margin-top: 0 !important;
            padding: 0 !important;
          }
          .hero-orb-col { 
            position: absolute !important;
            top: 45% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 0 !important;
            width: 100% !important;
            height: auto !important;
            opacity: 0.7;
            pointer-events: none !important;
          }
          .orb-wrapper {
            position: relative;
            width: 240px;
            height: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: visible;
          }
          .hero-bottom-bar {
             padding-bottom: 2rem !important;
             gap: 1rem !important;
          }
        }
        @media (max-width: 380px) {
          .orb-wrapper {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>



    </section>
  );
}
const MemoizedLuxuryOrb = memo(LuxuryOrb);
