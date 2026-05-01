export function Footer() {
  return (
    <footer className="bg-cream py-10 border-t border-forest/15">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="nav-link flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-forest" />
          FORMA STUDIO
        </span>
        <nav className="flex gap-8">
          <a href="#work" className="nav-link">WORK</a>
          <a href="#services" className="nav-link">SERVICES</a>
          <a href="#studio" className="nav-link">STUDIO</a>
          <a href="#contact" className="nav-link">CONTACT</a>
        </nav>
        <span className="label-eyebrow-muted">© 2025 FORMA STUDIO</span>
      </div>
    </footer>
  );
}
