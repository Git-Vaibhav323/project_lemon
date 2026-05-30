import { useState, useEffect } from "react";
import BrandLogo from "./ui/BrandLogo";
import IconButton from "./ui/IconButton";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function SearchIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CartIconSvg() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav
        className={`w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 mt-2 sm:mt-2 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass shadow-glass py-1.5"
            : "bg-transparent py-1.5 sm:py-2"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
          <a
            href="#home"
            className="group shrink-0 min-w-0 transition-opacity duration-300 hover:opacity-90"
            aria-label="Planto home"
          >
            <BrandLogo size="nav" className="[&_img]:transition-transform [&_img]:duration-300 group-hover:[&_img]:scale-105" />
          </a>

          <ul className="hidden lg:flex items-center justify-center gap-6 xl:gap-9 flex-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="nav-link inline-flex items-center gap-1 whitespace-nowrap">
                  {link.label}
                  {link.hasChevron && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <a
              href="#shop"
              className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #4edea3 0%, #3bc98a 100%)",
                color: "#003824",
                boxShadow: "0 4px 12px rgba(78, 222, 163, 0.3)",
              }}
            >
              <span>Buy Now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <IconButton
              label={menuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon open={menuOpen} />
            </IconButton>
            <IconButton label="Menu" className="hidden lg:flex">
              <MenuIcon open={false} />
            </IconButton>
          </div>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 top-[5rem] z-40 transition-all duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className="absolute top-0 left-3 right-3 glass rounded-2xl p-6 flex flex-col gap-5 shadow-float">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-base"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#shop"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #4edea3 0%, #3bc98a 100%)",
              color: "#003824",
              boxShadow: "0 4px 12px rgba(78, 222, 163, 0.3)",
            }}
            onClick={() => setMenuOpen(false)}
          >
            <span>Buy Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
