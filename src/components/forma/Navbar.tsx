import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
          <div
            style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#043222" }}
          />
          <span
            style={{
              color: "#043222",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Forma Studio
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative transition-colors duration-300"
              style={{
                color: "#4F5B57",
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#043222";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#4F5B57";
              }}
              data-cursor=""
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: "#043222" }}
              />
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 transition-all duration-400 rounded-sm"
            style={{
              backgroundColor: "#043222",
              color: "#FFF8EE",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
              fontWeight: 500,
              textDecoration: "none",
              cursor: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#003631";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#043222";
            }}
            data-cursor=""
          >
            New Inquiry
          </a>
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

      <div
        className="md:hidden overflow-hidden transition-all duration-600"
        style={{
          maxHeight: menuOpen ? "360px" : "0",
          borderTop: menuOpen ? "1px solid rgba(4,50,34,0.10)" : "none",
          backgroundColor: "#FFF8EE",
        }}
      >
        <div className="px-8 py-8 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors duration-300"
              style={{
                color: "#043222",
                fontSize: "2.2rem",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontFamily: "Boska, ui-serif, Georgia, serif",
                textDecoration: "none",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2"
            style={{
              color: "#043222",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
              textDecoration: "none",
            }}
            onClick={() => setMenuOpen(false)}
          >
            New Inquiry →
          </a>
        </div>
      </div>
    </nav>
  );
}
