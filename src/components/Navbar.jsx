import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function LeafMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C9.5 2 7 4.5 7 8c0 3.5 2 6.5 5 8.5V22h2v-5.5c3-2 5-5 5-8.5 0-3.5-2.5-6-5-6z" fill="#3dffa0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="text-white/60">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="text-white/60">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,25,12,0.85)] backdrop-blur-[14px] border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-4 w-full">

          {/* LEFT: Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0" aria-label="Planto home">
            <LeafMark />
            <span className="text-white text-lg font-bold tracking-tight">planto</span>
          </a>

          {/* CENTER: Nav links (desktop) */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-white/60 text-sm font-medium hover:text-white transition-colors duration-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button type="button" className="hidden sm:flex items-center justify-center w-9 h-9 hover:bg-white/5 rounded-full transition-colors" aria-label="Search">
              <SearchIcon />
            </button>

            <div className="relative">
              <button type="button" className="flex items-center justify-center w-9 h-9 hover:bg-white/5 rounded-full transition-colors" aria-label="Shopping bag">
                <BagIcon />
              </button>
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-[#3dffa0] flex items-center justify-center text-[10px] font-bold text-[#0b1d0d]">3</span>
            </div>

            <a
              href="#shop"
              className="nav-shop-btn hidden sm:inline-flex items-center px-[18px] py-[7px] rounded-full text-[13px] font-medium transition-all duration-200 hover:bg-[rgba(61,255,160,0.08)]"
              style={{ border: "1px solid rgba(61,255,160,0.5)", color: "#3dffa0" }}
            >
              Visit Shop
            </a>

            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-9 h-9 hover:bg-white/5 rounded-full transition-colors"
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
        className={`lg:hidden fixed inset-0 top-[57px] z-40 transition-all duration-300 ${
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
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
            style={{ background: "#3dffa0", color: "#0b1d0d" }}
            onClick={() => setMenuOpen(false)}
          >
            Visit Shop
          </a>
        </div>
      </div>
    </header>
  );
}
