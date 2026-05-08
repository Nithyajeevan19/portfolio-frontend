import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { CASE_STUDIES, type CaseStudy } from "../../data/caseStudies";
import { revealVariants, viewportConfig, revealTransition, luxuryEase } from "../../lib/motion";
import { useIsMobile } from '@/hooks/use-mobile';

function MobileWorkCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      to="/case-study/$slug"
      params={{ slug: cs.slug }}
      style={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: '2px',
        border: '1px solid rgba(4,50,34,0.09)',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(4,50,34,0.08)',
        backgroundColor: '#FFF8EE',
        marginLeft: 'min(1.5rem, 4vw)',
        marginRight: 'min(1.5rem, 4vw)',
        width: 'calc(100% - min(3rem, 8vw))',
      }}
    >
      {/* TOP — Image */}
      <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
        <img
          src={cs.cover_image}
          alt={cs.project_title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.45)',
          }}
        />

        {/* Featured badge */}
        {cs.featured && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem',
            backgroundColor: '#C5F135',
            color: '#043222',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.55rem', fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding: '0.28rem 0.75rem',
            borderRadius: '999px',
          }}>
            Featured
          </div>
        )}

        {/* Bottom metadata overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.25rem',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
        }}>
          {/* Row 1 — category · services · year */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '0.5rem',
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.55rem',
              fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
            }}>
              {cs.category} · {cs.services.split(',')[0]}
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.55rem',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.45)',
            }}>
              {cs.year}
            </span>
          </div>

          {/* Row 2 — project title */}
          <h3 style={{
            margin: '0 0 0.3rem',
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '1.55rem', fontWeight: 600,
            lineHeight: 1.1, letterSpacing: '-0.025em',
            color: '#FFFFFF',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            paddingBottom: '0.05em',
          }}>
            {cs.project_title}
          </h3>

          {/* Row 3 — client name */}
          <p style={{
            margin: 0,
            fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.50)',
          }}>
            {cs.client_name}
          </p>
        </div>
      </div>

      {/* BOTTOM — Cream info strip */}
      <div style={{
        padding: '1.1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        backgroundColor: '#FFF8EE',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', flex: 1, minWidth: 0 }}>
          <div style={{
            width: '4px', height: '4px', borderRadius: '50%',
            backgroundColor: '#043222', flexShrink: 0, marginTop: '0.45rem',
          }} />
          <p style={{
            margin: 0,
            fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
            color: '#4F5B57', lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {cs.description}
          </p>
        </div>
        <span
          style={{
            flexShrink: 0,
            fontFamily: 'Inter, sans-serif', fontSize: '0.60rem',
            fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#043222', textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
          Case Study →
        </span>
      </div>
    </Link>
  );
}

function WorkCard({
  project,
  index,
  size = "normal",
}: {
  project: CaseStudy;
  index: number;
  size?: "normal" | "large";
}) {
  const [hov, setHov] = useState(false);
  const [xy, setXY] = useState({ x: 50, y: 50 });
  const isLarge = size === "large";

  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setXY({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={viewportConfig}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { ...revealTransition, delay: (index % 3) * 0.1 } 
        },
        hover: { 
          y: -12,
          transition: { duration: 0.8, ease: luxuryEase }
        }
      }}
      className="h-full"
    >
      <Link
        to="/case-study/$slug"
        params={{ slug: project.slug }}
        className="block relative overflow-hidden group h-full"
        style={{
          borderRadius: "4px",
          border: "1px solid rgba(4,50,34,0.08)",
          backgroundColor: "#FFF8EE",
          boxShadow: hov
            ? "0 40px 80px -20px rgba(4,50,34,0.15), inset 0 0 0 1px rgba(255,255,255,0.4)"
            : "0 4px 20px rgba(4,50,34,0.03)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          minHeight: "520px",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onMouseMove={onMove}
        data-cursor="Discover"
      >
        {/* Image container */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: isLarge ? "clamp(340px, 50vw, 650px)" : "clamp(280px, 30vw, 420px)",
            flexShrink: 0,
            backgroundColor: "#043222",
          }}
        >
          <motion.div
            style={{
              y: imageY,
              position: "absolute",
              inset: "-15%",
            }}
          >
            <motion.div
              variants={{
                hover: { 
                  scale: 1.1,
                  filter: "brightness(0.8) saturate(1.1)",
                }
              }}
              transition={{ duration: 1.5, ease: luxuryEase }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${project.cover_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.7) saturate(0.9)",
              }}
            />
          </motion.div>

          {/* Radial hover glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(circle at ${xy.x}% ${xy.y}%, rgba(200,255,0,0.15) 0%, transparent 60%)`,
              opacity: hov ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />

          {/* Featured tag */}
          {project.featured && (
            <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 10 }}>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "0.5rem 1rem",
                  borderRadius: "100px",
                  backgroundColor: "#C8FF00",
                  color: "#043222",
                  boxShadow: "0 4px 12px rgba(200,255,0,0.3)",
                }}
              >
                Featured Release
              </span>
            </div>
          )}
 
          {/* Card bottom metadata overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", zIndex: 5 }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8FF00] font-bold">
                {project.category}
              </span>
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                {project.services.split(',')[0]}
              </span>
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                letterSpacing: "-0.04em",
                color: "#FFF8EE",
                lineHeight: 1,
              }}
            >
              {project.project_title.split('—')[0].trim()}
            </h3>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#043222]/90 via-[#043222]/20 to-transparent pointer-events-none" />
        </div>
 
        {/* Content Strip */}
        <div
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: hov ? "rgba(4,50,34,0.02)" : "#FFF8EE",
            transition: "all 0.5s ease",
            flex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
              color: "#4F5B57",
              lineHeight: "1.6",
              margin: "0 0 1.5rem 0",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C8FF00]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#043222]">
                Explore Case Study
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#043222] group-hover:border-[#043222] transition-all duration-500">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke={hov ? "#C8FF00" : "#043222"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── SelectedWork ─────────────────────────────────────────────────────────────

export function SelectedWork() {
  const items = CASE_STUDIES as CaseStudy[];
  const isMobile = useIsMobile();

  // Alternating layout: large → [small + small] → large → repeat
  const rows: Array<
    { type: "single"; item: CaseStudy } | { type: "pair"; items: [CaseStudy, CaseStudy] }
  > = [];
  let i = 0;
  let rowIndex = 0;

  while (i < items.length) {
    if (rowIndex % 2 === 0) {
      rows.push({ type: "single", item: items[i] });
      i++;
    } else {
      if (i + 1 < items.length) {
        rows.push({ type: "pair", items: [items[i], items[i + 1]] });
        i += 2;
      } else {
        rows.push({ type: "single", item: items[i] });
        i++;
      }
    }
    rowIndex++;
  }

  let cardIndex = 0;

  return (
    <section id="work" style={{ 
      paddingTop: 'var(--section-gap)', 
      paddingBottom: 'clamp(2rem, 5vh, 4rem)', 
      backgroundColor: '#F6E9D9',
      overflow: 'hidden',
    }}>
  
      {/* Section Header */}
      <div className="px-8 md:px-14 mb-14"
        style={{ borderBottom: '1px solid rgba(4,50,34,0.09)', paddingBottom: '2.5rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 14 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 1, ease: luxuryEase }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div style={{ 
              fontFamily: 'Inter, sans-serif', fontSize: '0.60rem', 
              fontWeight: 600, letterSpacing: '0.22em', 
              textTransform: 'uppercase', color: 'rgba(4,50,34,0.40)', 
              marginBottom: '0.75rem', display: 'flex', 
              alignItems: 'center', gap: '0.75rem' 
            }}>
              <span style={{ color: 'rgba(4,50,34,0.28)' }}>02</span>
              <span style={{ width: '14px', height: '1px', backgroundColor: 'rgba(4,50,34,0.22)', display: 'inline-block' }} />
              Selected Work
            </div>
            <h2 style={{ 
              margin: 0, 
              fontFamily: 'Cormorant Garamond, Georgia, serif', 
              fontSize: 'clamp(2.2rem,5vw,5.5rem)', 
              lineHeight: '0.94', letterSpacing: '-0.044em', 
              color: '#043222', paddingBottom: '0.12em' 
            }}>
              Work that<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(4,50,34,0.28)' }}>
                earns its place.
              </span>
            </h2>
          </div>
            <p style={{ 
              fontFamily: 'Satoshi, sans-serif', 
              fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', 
              color: '#4F5B57', 
              lineHeight: 1.6, 
              margin: 0,
              maxWidth: '35rem'
            }}>
              A focused selection of digital experiences, systems, and products designed to solve real problems and create measurable impact.
            </p>
        </motion.div>
      </div>
  
      {isMobile ? (
        <div style={{ paddingTop: '0.5rem', paddingBottom: '1rem', overflow: 'hidden' }}>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={0}
            pagination={{ clickable: true }}
            style={{ paddingBottom: '2.8rem' }}>
            {items.map((cs) => (
              <SwiperSlide key={cs.id ?? cs.slug}>
                <MobileWorkCard cs={cs} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div style={{ padding: '0 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {(() => {
              const [first, second, third, ...rest] = items;
              return (
                <>
                  {first && <WorkCard project={first} index={0} size="large" />}
                  {(second || third) && (
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(2, 1fr)', 
                      gap: 'var(--card-gap)' 
                    }}>
                      {second && <WorkCard project={second} index={1} size="normal" />}
                      {third  && <WorkCard project={third}  index={2} size="normal" />}
                    </div>
                  )}
                  {rest.map((cs, i) => (
                    <WorkCard key={cs.id} project={cs} index={i + 3} size="large" />
                  ))}
                </>
              );
            })()}
          </div>
        </div>
      )}
  
      {/* Footer bar */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="px-8 md:px-14 mt-14"
        style={{ 
          borderTop: '1px solid rgba(4,50,34,0.09)', 
          paddingTop: '2rem', 
          display: 'flex', flexWrap: 'wrap', 
          alignItems: 'center', justifyContent: 'space-between', 
          gap: '1rem' 
        }}>
        <a href="#contact" data-cursor=""
          style={{ 
            fontFamily: 'Inter, sans-serif', fontWeight: 600, 
            fontSize: '0.68rem', letterSpacing: '0.14em', 
            textTransform: 'uppercase', color: '#4F5B57', 
            textDecoration: 'none', display: 'flex', 
            alignItems: 'center', gap: '0.6rem', transition: 'color 0.3s' 
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#043222'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#4F5B57'}>
          Discuss a project
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" 
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
