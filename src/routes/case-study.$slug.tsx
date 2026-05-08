import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES, type CaseStudy } from "../data/caseStudies";
import CustomCursor from "../components/forma/CustomCursor";
import { Navbar } from "../components/forma/Navbar";
import { revealVariants, viewportConfig, luxuryEase, transition } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/case-study/$slug")({
  component: CaseStudyComponent,
});

function CaseStudyComponent() {
  const { slug } = Route.useParams();
  const studyIndex = CASE_STUDIES.findIndex((s) => s.slug.trim() === slug.trim());
  const study = studyIndex !== -1 ? CASE_STUDIES[studyIndex] : null;
  const nextStudy = studyIndex !== -1 ? CASE_STUDIES[(studyIndex + 1) % CASE_STUDIES.length] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!study) return;

    const ctx = gsap.context(() => {
      // Pin meta bar briefly on scroll past hero
      const metaBar = document.querySelector(".cs-meta-bar");
      if (metaBar) {
        gsap.from(metaBar, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          scrollTrigger: {
            trigger: metaBar,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // Stagger gallery images in
      const galleryImgs = document.querySelectorAll(".cs-gallery-img");
      galleryImgs.forEach((img, i) => {
        gsap.from(img, {
          opacity: 0,
          y: 40,
          duration: 1.1,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: img,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });

      // Description text character-by-word reveal
      const desc = document.querySelectorAll(".cs-description");
      desc.forEach((d) => {
        gsap.from(d, {
          opacity: 0,
          y: 30,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: d,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Reveal impact section
      const impactSec = document.querySelector(".cs-impact-section");
      if (impactSec) {
        gsap.from(impactSec, {
          opacity: 0,
          scale: 0.98,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: impactSec,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    // Refresh ScrollTrigger after a short delay to ensure layout is settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [study, slug]);

  if (!study) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-[#0A0A0A] text-white font-sans"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="text-center">
          <p className="text-xs tracking-widest text-gray-500 mb-6 uppercase">STUDY NOT FOUND</p>
          <Link to="/" className="text-[0.7rem] text-[#C8FF00] no-underline hover:underline">
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
  ].filter((b) => b.content && b.content.length > 0);

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        minHeight: "100vh",
        position: "relative",
        color: "#FFF8EE",
        overflowX: "hidden",
      }}
    >
      <CustomCursor />
      <Navbar isDark />

      <AnimatePresence mode="wait">
        <motion.div
          key={slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <section
            className="relative w-full overflow-hidden flex flex-col justify-end"
            style={{ 
              height: "clamp(500px, 85vh, 92vh)", 
              borderBottom: "1px solid #1A1A1A" 
            }}
          >
            <div className="absolute inset-0 z-0">
              <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${study.cover_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                transition={{ duration: 2.2, ease: luxuryEase }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
            </div>

            <div className="relative z-10 px-6 md:px-16 pb-12 md:pb-20 max-w-[1440px] mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: luxuryEase }}
              >
                <div
                  className="micro-label mb-6 text-[#C8FF00] tracking-[0.2em]"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  PROJECT // {study.year}
                </div>
                <h1
                  style={{
                    fontFamily: "Boska, serif",
                    fontSize: "clamp(3rem, 10vw, 8.5rem)",
                    lineHeight: "0.9",
                    letterSpacing: "-0.05em",
                    color: "#FFF8EE",
                    margin: "0 0 2rem 0",
                  }}
                >
                  {study.project_title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 mt-12">
                  {study.live_site_link && (
                    <a
                      href={study.live_site_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-[#C8FF00] no-underline"
                      data-cursor="View Site"
                    >
                      <span className="text-xs uppercase tracking-widest font-medium group-hover:mr-2 transition-all">
                        View Live Project
                      </span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:rotate-45 transition-transform">
                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Details & Narrative Grid */}
          <section className="px-6 md:px-16 py-24 md:py-32 max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Sidebar Info */}
              <div className="lg:col-span-3">
                <div className="cs-meta-bar sticky top-32 flex flex-col gap-12">
                  {[
                    { label: "Client", value: study.client_name },
                    { label: "Services", value: study.services },
                    { label: "Role", value: "Senior Lead Design" },
                    { label: "Timeline", value: `${study.year}` },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#888888] mb-3">
                        {label}
                      </div>
                      <p className="text-sm md:text-base text-[#F4F4F0] leading-relaxed m-0 font-medium">
                        {value}
                      </p>
                      <div className="w-full h-[1px] bg-[#1A1A1A] mt-6" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Narrative */}
              <div className="lg:col-span-9 flex flex-col gap-24 md:gap-32">
                {blocks.map((block, i) => (
                  <div key={block.label} className="max-w-4xl">
                    <div className="text-[10px] font-bold text-[#C8FF00] tracking-[0.3em] mb-6 flex items-center gap-4">
                      <span className="text-[#333]">{String(i + 1).padStart(2, "0")}</span>
                      {block.label.toUpperCase()}
                    </div>
                    <p
                      className="cs-description"
                      style={{
                        fontFamily: "Satoshi, sans-serif",
                        fontSize: "clamp(1.25rem, 3vw, 2.25rem)",
                        lineHeight: "1.35",
                        letterSpacing: "-0.02em",
                        color: "#F4F4F0",
                        margin: 0,
                      }}
                    >
                      {block.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Visual Showcase (Gallery) */}
          {study.gallery.length > 0 && (
            <section className="px-6 md:px-16 pb-32 max-w-[1440px] mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#888888]">
                  VISUAL SYSTEM // ARTIFACTS
                </div>
                <div className="text-[10px] text-[#333]">[{study.gallery.length} IMAGES]</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 aspect-[16/9] overflow-hidden bg-[#111] border border-[#1A1A1A]">
                  <img
                    src={study.gallery[0]}
                    alt={`${study.project_title} - Feature`}
                    className="cs-gallery-img w-full h-full object-cover"
                  />
                </div>
                {study.gallery.slice(1).map((img, i) => (
                  <div 
                    key={i} 
                    className={`aspect-[16/10] overflow-hidden bg-[#111] border border-[#1A1A1A] ${i === 2 && study.gallery.length > 3 ? 'md:col-span-2' : ''}`}
                  >
                    <img
                      src={img}
                      alt={`${study.project_title} - Detail ${i + 1}`}
                      className="cs-gallery-img w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Impact & Results */}
          {study.the_impact && (
            <section className="px-6 md:px-16 py-32 bg-[#0D0D0D] border-y border-[#1A1A1A]">
              <div className="max-w-[1440px] mx-auto">
                <div className="cs-impact-section">
                  <div className="text-[10px] font-bold text-[#C8FF00] tracking-[0.3em] mb-12">
                    04 // THE IMPACT
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <p
                      className="text-2xl md:text-3xl lg:text-4xl leading-snug text-[#F4F4F0] m-0"
                      style={{ fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.01em" }}
                    >
                      {study.the_impact}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-12 border-l border-[#1A1A1A] pl-12">
                      <div>
                        <div className="text-4xl md:text-5xl font-bold text-[#FFF8EE] mb-2">{study.impact_metric_1}</div>
                        <div className="text-[10px] uppercase tracking-widest text-[#888888]">{study.impact_label_1}</div>
                      </div>
                      <div>
                        <div className="text-4xl md:text-5xl font-bold text-[#FFF8EE] mb-2">{study.impact_metric_2}</div>
                        <div className="text-[10px] uppercase tracking-widest text-[#888888]">{study.impact_label_2}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Next Project Navigator */}
          {nextStudy && (
            <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden border-b border-[#1A1A1A]">
              <Link 
                to="/case-study/$slug" 
                params={{ slug: nextStudy.slug }}
                className="group block relative z-10 no-underline"
                data-cursor="Next"
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#888888] mb-8 group-hover:text-[#C8FF00] transition-colors">
                    Next Project
                  </span>
                  <h2 
                    className="text-5xl md:text-7xl lg:text-9xl m-0 text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8EE] to-[#444] group-hover:to-[#C8FF00] transition-all duration-700"
                    style={{ fontFamily: "Boska, serif", lineHeight: "1", letterSpacing: "-0.04em" }}
                  >
                    {nextStudy.project_title.split('—')[0].trim()}
                  </h2>
                </div>
              </Link>
              
              {/* Background preview of next study */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
                <img src={nextStudy.cover_image} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-2000" alt="" />
              </div>
            </section>
          )}

          {/* Global Footer Navigation */}
          <footer className="px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-12 max-w-[1440px] mx-auto">
            <Link
              to="/"
              className="group flex items-center gap-4 text-[#888888] no-underline hover:text-white transition-colors"
              data-cursor=""
            >
              <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span>
              <span className="text-[10px] uppercase tracking-[0.2em]">Return to Index</span>
            </Link>
            
            <div className="flex items-center gap-8">
              <a href="mailto:hello@formaforge.com" className="text-[10px] uppercase tracking-[0.2em] text-[#888888] no-underline hover:text-[#C8FF00]">Email</a>
              <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-[#888888] no-underline hover:text-[#C8FF00]">LinkedIn</a>
              <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-[#888888] no-underline hover:text-[#C8FF00]">Twitter</a>
            </div>
            
            <a
              href="/#contact"
              className="text-[10px] uppercase tracking-[0.2em] px-10 py-5 border border-[#1A1A1A] text-[#C8FF00] no-underline hover:bg-[#C8FF00] hover:text-black transition-all"
              data-cursor=""
            >
              Start Your Project
            </a>
          </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CaseStudyComponent;
