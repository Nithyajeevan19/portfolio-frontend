import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "WORK", to: "/", hash: "work" },
  { label: "SERVICES", to: "/", hash: "services" },
  { label: "STUDIO", to: "/", hash: "studio" },
  { label: "CONTACT", to: "/", hash: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <Link to="/" className="nav-link flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-forest" />
          FORMA STUDIO
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a key={l.label} href={`#${l.hash}`} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn-primary hidden md:inline-flex">
          NEW INQUIRY
        </a>

        <button
          className="md:hidden text-forest"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-cream md:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <span className="nav-link flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-forest" />
              FORMA STUDIO
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6 text-forest" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-start gap-6 px-8 pt-12">
            {links.map((l) => (
              <a
                key={l.label}
                href={`#${l.hash}`}
                onClick={() => setOpen(false)}
                className="display-serif text-5xl text-forest"
              >
                {l.label.toLowerCase()}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-6"
            >
              NEW INQUIRY
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
