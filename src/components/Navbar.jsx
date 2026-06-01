import { useState, useEffect } from "react";
import BrandLogo from "./ui/BrandLogo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function SearchSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}

function CartSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="text-brand-dark/70">
      {open ? (
        <path d="M18 6 6 18M6 6l12 12" />
      ) : (
        <path d="M3 12h18M3 6h18M3 18h18" />
      )}
    </svg>
  );
}

function handleContactClick(e, onClose) {
  e.preventDefault();
  if (onClose) onClose();
  const currentHash = window.location.hash;
  const isHome = !currentHash || currentHash === "#home";

  if (isHome) {
    // Already on home — just scroll to the contact section
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  } else {
    // Navigate to home first, then scroll after render
    window.location.hash = "#home";
    // Use sessionStorage to signal that we want to scroll to contact
    sessionStorage.setItem("scrollTo", "contact");
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);

  // Handle scrollTo signal set by contact link when coming from another page
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  useEffect(() => {
    const fn = () => {
      const heroEl = document.getElementById("home");
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      const y = window.scrollY;
      setScrolled(y > 20);
      setOnHero(y < heroHeight - 80);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkColor = onHero ? "rgba(255,255,255,0.75)" : "rgba(45,36,22,0.65)";
  const activeLinkColor = "#4CAF50";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav
        className={`w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 mt-2 sm:mt-2 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "py-1.5 bg-white/90 border border-brand-bark/10 shadow-card"
            : "bg-transparent py-1.5 sm:py-2"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
          <a
            href="#home"
            className="group shrink-0 min-w-0 transition-opacity duration-300 hover:opacity-90 flex items-center"
          >
            <BrandLogo size="nav" className="[&_img]:transition-transform [&_img]:duration-300 group-hover:[&_img]:scale-105" />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = link.label === "Home";
              const isContact = link.label === "Contact";
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link inline-flex items-center gap-1 whitespace-nowrap"
                  style={{
                    color: active ? activeLinkColor : linkColor,
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: active ? 600 : 400,
                    borderBottom: active ? `2px solid ${activeLinkColor}` : "2px solid transparent",
                    paddingBottom: "2px",
                    fontSize: "15px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = activeLinkColor; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = linkColor; }}
                  onClick={isContact ? (e) => handleContactClick(e) : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group hidden sm:flex items-center">
              <input
                type="text"
                placeholder="Search plants..."
                onClick={() => { window.location.hash = "#shop"; }}
                readOnly
                className="rounded-full px-4 py-2 pl-10 text-sm focus:outline-none w-32 focus:w-48 transition-all duration-300 cursor-pointer"
                style={{
                  background: scrolled ? "#ffffff" : "rgba(255,255,255,0.15)",
                  border: scrolled ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.3)",
                  color: scrolled ? "#1B4332" : "#ffffff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                  backdropFilter: scrolled ? "none" : "blur(8px)",
                }}
              />
              <div className="absolute left-3 pointer-events-none" style={{ color: scrolled ? "#6B7280" : "rgba(255,255,255,0.7)" }}>
                <SearchSVG />
              </div>
            </div>

            <a
              href="#shop"
              className="relative flex items-center justify-center p-2 rounded-xl transition-all duration-300"
              style={{
                background: scrolled ? "rgba(74,122,69,0.07)" : "rgba(255,255,255,0.15)",
                border: scrolled ? "1px solid rgba(74,122,69,0.15)" : "1px solid rgba(255,255,255,0.25)",
                color: scrolled ? "#4CAF50" : "#ffffff",
                backdropFilter: scrolled ? "none" : "blur(8px)",
              }}
              aria-label="Shopping bag"
            >
              <CartSVG />
            </a>

            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 hover:bg-brand-sand rounded-full transition-colors"
              style={{ color: onHero && !scrolled ? "#ffffff" : "#2d2416" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 top-[60px] z-40 transition-all duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className="absolute top-0 left-3 right-3 bg-white/95 backdrop-blur-[14px] border border-brand-bark/10 rounded-2xl p-6 flex flex-col gap-5 shadow-float">
          {navLinks.map((link) => {
            const isContact = link.label === "Contact";
            return (
              <a
                key={link.label}
                href={link.href}
                className="text-brand-dark/65 text-base font-medium hover:text-brand-dark transition-colors"
                onClick={
                  isContact
                    ? (e) => handleContactClick(e, () => setMenuOpen(false))
                    : () => setMenuOpen(false)
                }
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#shop"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold mt-2"
            style={{ background: "#4a7a45", color: "#ffffff" }}
            onClick={() => setMenuOpen(false)}
          >
            Visit Shop
          </a>
        </div>
      </div>
    </header>
  );
}
