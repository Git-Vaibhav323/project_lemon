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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="text-white/80">
      {open ? (
        <path d="M18 6 6 18M6 6l12 12" />
      ) : (
        <path d="M3 12h18M3 6h18M3 18h18" />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const DS_primary = "#9db59a";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav
        className={`w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 mt-2 sm:mt-2 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass shadow-glass py-1.5 bg-[rgba(10,25,12,0.85)] border border-white/[0.05]"
            : "bg-transparent py-1.5 sm:py-2"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
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
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link inline-flex items-center gap-1 whitespace-nowrap"
                  style={{
                    color: active ? DS_primary : "rgba(213,230,223,0.7)",
                    fontFamily: "Inter,sans-serif",
                    fontWeight: active ? 600 : 400,
                    borderBottom: active ? `2px solid ${DS_primary}` : "2px solid transparent",
                    paddingBottom: "2px",
                    fontSize: "16px",
                    transition: "color 0.2s",
                  }}
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
                className="bg-black/20 border border-white/10 rounded-full px-4 py-2 pl-10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#9db59a] w-32 focus:w-48 transition-all duration-300 cursor-pointer"
              />
              <div className="absolute left-3 text-[#9db59a] pointer-events-none">
                <SearchSVG />
              </div>
            </div>
            
            <a
              href="#shop"
              className="relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:bg-white/5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: DS_primary,
              }}
              aria-label="Shopping bag"
            >
              <CartSVG />
            </a>

            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 hover:bg-white/5 rounded-full transition-colors text-white"
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
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className="absolute top-0 left-3 right-3 bg-[rgba(10,25,12,0.95)] backdrop-blur-[14px] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-5 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 text-base font-medium hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#shop"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold mt-2"
            style={{ background: "#9db59a", color: "#0b1d0d" }}
            onClick={() => setMenuOpen(false)}
          >
            Visit Shop
          </a>
        </div>
      </div>
    </header>
  );
}
