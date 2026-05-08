import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES, type CaseStudy } from "../data/caseStudies";
import CustomCursor from "../components/forma/CustomCursor";
import { Navbar } from "../components/forma/Navbar";
import { getLenis } from "../lib/lenis";
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

  useLayoutEffect(() => {
    // Reset scroll immediately before paint
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);

    // Update SEO metadata
    if (study) {
      document.title = `${study.project_title} | DEVNest Case Study`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", study.description || "");
      }
    }

    return () => {
      // Reset title when leaving
      document.title = "DEVNest — Senior-led brand & product design";
    };
  }, [slug, study]);

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
          immediateRender: false,
          scrollTrigger: {
            trigger: metaBar,
            start: "top 95%",
            once: true,
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
          immediateRender: false,
          scrollTrigger: {
            trigger: img,
            start: "top 98%",
            once: true,
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
          immediateRender: false,
          scrollTrigger: {
            trigger: d,
            start: "top 95%",
            once: true,
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
      <Navbar isDark />

      <AnimatePresence mode="wait">
        <motion.div
          key={slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 01. HERO SECTION — Cinematic & Editorial */}
          <section
            className="relative w-full overflow-hidden flex flex-col justify-end"
            style={{ 
              height: "clamp(600px, 95vh, 100vh)", 
              borderBottom: "1px solid #1A1A1A",
            }}
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                src={study.inner_cover_image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
                transition={{ duration: 2.5, ease: luxuryEase }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
              <div className="absolute inset-0 bg-[#0A0A0A]/20" />
            </div>

            <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-[1440px] mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1, ease: luxuryEase }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8FF00] font-bold">
                        {study.category}
                      </span>
                      <div className="w-12 h-[1px] bg-white/20" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                        {study.year}
                      </span>
                    </div>
                    
                    <h1
                      style={{
                        fontFamily: "Boska, serif",
                        fontSize: "clamp(3.5rem, 10vw, 9rem)",
                        lineHeight: "0.85",
                        letterSpacing: "-0.05em",
                        color: "#FFF8EE",
                        margin: "0 0 2.5rem 0",
                      }}
                    >
                      {study.project_title}
                    </h1>

                    <p className="text-lg md:text-2xl text-white/70 max-w-2xl leading-relaxed font-light mb-8">
                      {study.description}
                    </p>

                    <div className="flex items-center gap-10">
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">Client</div>
                        <div className="text-sm uppercase tracking-widest font-medium text-white/90">{study.client_name}</div>
                      </div>
                      {study.live_site_link && (
                        <a
                          href={study.live_site_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 text-[#C8FF00] no-underline pt-4"
                          data-cursor="View Live"
                        >
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold group-hover:mr-2 transition-all">
                            Visit Live Site
                          </span>
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="group-hover:rotate-45 transition-transform">
                            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* 03. EDITORIAL STORYTELLING — Challenge & Solution */}
          <section className="px-6 md:px-16 pt-24 md:pt-32 pb-16 md:pb-20 bg-[#080808] border-y border-[#1A1A1A]">
            <div className="max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 md:gap-40">
                
                {/* Challenge */}
                <div className="lg:col-span-10 lg:col-start-2 flex flex-col gap-12">
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-bold text-white/20 tracking-[0.4em]">01</span>
                    <span className="text-[10px] font-bold text-[#C8FF00] tracking-[0.4em]">THE CHALLENGE</span>
                  </div>
                  <h3 className="text-3xl md:text-6xl font-serif italic text-white/90 leading-[1.1] max-w-5xl">
                    "{study.challenge}"
                  </h3>
                </div>

                {/* Solution */}
                <div className="lg:col-span-10 lg:col-start-2 flex flex-col gap-12">
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-bold text-white/20 tracking-[0.4em]">02</span>
                    <span className="text-[10px] font-bold text-[#C8FF00] tracking-[0.4em]">THE SOLUTION</span>
                  </div>
                  <div className="max-w-4xl">
                    <p className="text-xl md:text-3xl text-white/70 leading-relaxed font-light">
                      {study.solution}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 04. IMPACT METRICS — Premium Strip */}
          <section className="px-6 md:px-16 pt-16 md:pt-20 pb-32 md:pb-48 max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-6 mb-12">
                  <span className="text-[10px] font-bold text-white/20 tracking-[0.4em]">03</span>
                  <span className="text-[10px] font-bold text-[#C8FF00] tracking-[0.4em]">THE RESULTS</span>
                </div>
                <p className="text-2xl md:text-4xl font-serif text-white/90 leading-tight mb-8">
                  {study.results}
                </p>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <div className="grid grid-cols-1 gap-8">
                  <div className="p-10 border border-white/5 bg-white/[0.02] rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <div className="text-6xl md:text-8xl font-bold text-[#C8FF00] tracking-tighter mb-4">{study.impact_metric_1}</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">{study.impact_label_1}</div>
                  </div>
                  
                  <div className="p-10 border border-white/5 bg-white/[0.02] rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <div className="text-6xl md:text-8xl font-bold text-white/90 tracking-tighter mb-4">{study.impact_metric_2}</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">{study.impact_label_2}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 05. GALLERY SECTION — Cinematic Grid */}
          {study.gallery.length > 0 && (
            <section className="px-6 md:px-16 pb-32 md:pb-48 max-w-[1440px] mx-auto">
              <div className="flex items-center justify-between mb-16">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
                  VISUAL ARTIFACTS // {study.gallery.length} IMAGES
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
                {/* Primary Feature Image */}
                <div className="md:col-span-12 group">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#C8FF00] font-bold">01</span>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">{study.gallery[0].title}</h4>
                  </div>
                  <div className="aspect-[21/9] overflow-hidden bg-[#111] border border-white/5 relative">
                    <img
                      src={study.gallery[0].url}
                      alt={study.gallery[0].title}
                      className="cs-gallery-img w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Sub-features Grid */}
                {study.gallery.slice(1).map((item, i) => (
                  <div 
                    key={i} 
                    className={`group ${
                      i % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-[#C8FF00] font-bold">0{i + 2}</span>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">{item.title}</h4>
                    </div>
                    <div className={`overflow-hidden bg-[#111] border border-white/5 relative ${
                      i % 3 === 0 ? 'aspect-[16/10]' : 'aspect-[16/20]'
                    }`}>
                      <img
                        src={item.url}
                        alt={item.title}
                        className="cs-gallery-img w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 06. LIVE WEBSITE CTA — Refined Section */}
          {study.live_site_link && (
            <section className="px-6 md:px-16 py-32 md:py-48 border-t border-white/5 bg-gradient-to-b from-transparent to-[#C8FF00]/5 text-center">
               <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: luxuryEase }}
               >
                 <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-8 block font-bold">EXPERIENCE THE PROJECT</span>
                 <h2 className="text-4xl md:text-7xl font-serif text-white/90 mb-12">Ready to see it in action?</h2>
                 <a
                    href={study.live_site_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-6 px-12 py-6 border border-[#C8FF00]/30 text-[#C8FF00] hover:bg-[#C8FF00] hover:text-black transition-all duration-500 rounded-sm group"
                    data-cursor="Open Site"
                  >
                    <span className="text-xs uppercase tracking-[0.3em] font-bold">Visit Live Website</span>
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
               </motion.div>
            </section>
          )}

          {/* Next Project Navigator */}
          {nextStudy && (
            <section className="relative px-6 md:px-16 py-32 md:py-48 overflow-hidden border-t border-white/5">
              <Link 
                to="/case-study/$slug" 
                params={{ slug: nextStudy.slug }}
                className="group block relative z-10 no-underline"
                data-cursor="Next"
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-8 group-hover:text-[#C8FF00] transition-colors font-bold">
                    NEXT PROJECT
                  </span>
                  <h2 
                    className="text-5xl md:text-8xl lg:text-[10rem] m-0 text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/10 group-hover:from-[#C8FF00] group-hover:to-[#C8FF00]/50 transition-all duration-700"
                    style={{ fontFamily: "Boska, serif", lineHeight: "1", letterSpacing: "-0.04em" }}
                  >
                    {nextStudy.project_title.split('—')[0].trim()}
                  </h2>
                </div>
              </Link>
              
              {/* Background preview of next study */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
                <img src={nextStudy.cover_image} className="w-full h-full object-cover object-top scale-110 group-hover:scale-100 transition-transform duration-[3s]" alt="" />
              </div>
            </section>
          )}

          {/* Global Footer Navigation */}
          <footer className="px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-12 max-w-[1440px] mx-auto border-t border-white/5">
            <Link
              to="/"
              className="group flex items-center gap-4 text-white/30 no-underline hover:text-white transition-colors"
              data-cursor=""
            >
              <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Index</span>
            </Link>
            
            <div className="flex items-center gap-10">
              <a href="mailto:hello@devnest.agency" className="text-[10px] uppercase tracking-[0.3em] text-white/30 no-underline hover:text-[#C8FF00] font-bold">Email</a>
              <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-white/30 no-underline hover:text-[#C8FF00] font-bold">LinkedIn</a>
              <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-white/30 no-underline hover:text-[#C8FF00] font-bold">Twitter</a>
            </div>
            
            <a
              href="/#contact"
              className="text-[10px] uppercase tracking-[0.3em] px-10 py-5 border border-white/10 text-[#C8FF00] no-underline hover:bg-[#C8FF00] hover:text-black transition-all font-bold"
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
