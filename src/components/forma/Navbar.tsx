import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { luxuryEase } from "../../lib/motion";
import { useMagnetic } from "@/hooks/useMagnetic";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Crew", href: "/#studio" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar({ isDark = false }: { isDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mag = useMagnetic(0.25);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const themeColor = scrolled ? "#043222" : (isDark ? "#FFF8EE" : "#043222");
  const subColor = scrolled ? "#4F5B57" : (isDark ? "rgba(255,248,238,0.7)" : "#4F5B57");

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9000] transition-all duration-700"
      style={{
        borderBottom: scrolled ? "1px solid rgba(4,50,34,0.09)" : "1px solid transparent",
        backgroundColor: scrolled ? "rgba(246,233,217,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
      }}
    >
      <div className="px-8 md:px-14 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-cursor=""
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              color: themeColor,
              fontSize: "0.9rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            DEVNest
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative transition-colors duration-300"
              style={{
                color: subColor,
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = themeColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = subColor;
              }}
              data-cursor=""
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: themeColor }}
              />
            </a>
          ))}
          <motion.div
            ref={mag.ref as any}
            style={{ x: mag.pos.x, y: mag.pos.y }}
            onMouseMove={mag.onMouseMove}
            onMouseLeave={mag.onMouseLeave}
          >
            <a
              href="/#contact"
              className="px-5 py-2.5 transition-all duration-400 rounded-sm"
              style={{
                display: "inline-block",
                backgroundColor: themeColor,
                color: scrolled ? "#FFF8EE" : (isDark ? "#0A0A0A" : "#FFF8EE"),
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500,
                textDecoration: "none",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                if (!scrolled && isDark) {
                  e.currentTarget.style.opacity = "0.9";
                } else {
                  e.currentTarget.style.backgroundColor = scrolled ? "#003631" : (isDark ? "#FFF8EE" : "#003631");
                }
              }}
              onMouseLeave={(e) => {
                if (!scrolled && isDark) {
                  e.currentTarget.style.opacity = "1";
                } else {
                  e.currentTarget.style.backgroundColor = themeColor;
                }
              }}
              data-cursor=""
            >
              Start A Project
            </a>
          </motion.div>
        </div>


        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "none" }}
        >
          <span
            className="block w-6 h-px transition-all duration-400"
            style={{
              backgroundColor: "#043222",
              transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "",
            }}
          />
          <span
            className="block w-4 h-px transition-opacity duration-300"
            style={{ backgroundColor: "#043222", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-px transition-all duration-400"
            style={{
              backgroundColor: "#043222",
              transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "",
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            className="md:hidden overflow-hidden"
            style={{
              borderTop: "1px solid rgba(4,50,34,0.10)",
              backgroundColor: "#FFF8EE",
            }}
          >
            <div className="px-8 py-10 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  href={link.href}
                  className="transition-colors duration-300"
                  style={{
                    color: "#043222",
                    fontSize: "2.4rem",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    fontFamily: "Boska, ui-serif, Georgia, serif",
                    textDecoration: "none",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                href="#contact"
                className="mt-4"
                style={{
                  color: "#043222",
                  fontSize: "0.78rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
                onClick={() => setMenuOpen(false)}
              >
                New Inquiry →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
