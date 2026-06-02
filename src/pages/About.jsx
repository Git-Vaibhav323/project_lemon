import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import mainLogo from "../assets/plants/mainlog.png";
import WindyLeaves from "../components/WindyLeaves";
import BotanicGrid from "../components/BotanicGrid";

gsap.registerPlugin(ScrollTrigger);

function IconSeedling() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V12" /><path d="M12 12C12 7 7 4 3 6c0 4 3 7 9 6z" /><path d="M12 12c0-5 5-8 9-6-1 4-4 7-9 6z" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconLeaf() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const values = [
  {
    icon: "🌱",
    title: "Sustainably Sourced",
    desc: "Every plant is ethically grown. Plastic-free packaging, responsible supply chains — we're proud to talk about all of it.",
  },
  {
    icon: "✦",
    title: "Uncompromising Quality",
    desc: "Each specimen is hand-inspected before it ships. If it arrives less than perfect, we make it right. No forms, no fuss.",
  },
  {
    icon: "◎",
    title: "Radical Honesty",
    desc: "We tell you which plants are forgiving and which ones demand attention. No overselling. No surprises on your windowsill.",
  },
  {
    icon: "❋",
    title: "Living Community",
    desc: "Our customers share their spaces, their wins, and their failures. That openness is what makes Planto more than a shop.",
  },
];

const stats = [
  { number: "50K+", label: "Plant Parents" },
  { number: "200+", label: "Varieties" },
  { number: "6 yrs", label: "Growing" },
  { number: "98%", label: "Satisfaction" },
];

export default function About() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigation = (hash) => { window.location.href = hash; };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".about-blob-1", {
        y: 160, ease: "none",
        scrollTrigger: { trigger: ".about-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".about-blob-2", {
        y: -100, ease: "none",
        scrollTrigger: { trigger: ".about-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.from(".about-eyebrow", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.1 });
      gsap.from(".about-hero-word", {
        y: 90, opacity: 0, duration: 1.1, stagger: 0.1, ease: "power4.out", delay: 0.25,
      });
      gsap.from(".about-hero-sub", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.7 });

      gsap.utils.toArray(".about-card").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 50, opacity: 0, duration: 0.9, ease: "power3.out", delay: i * 0.05,
        });
      });

      gsap.from(".about-stat", {
        scrollTrigger: { trigger: ".about-stats-row", start: "top 88%" },
        scale: 0.8, opacity: 0, duration: 0.65, stagger: 0.1, ease: "back.out(1.6)",
      });

      gsap.from(".about-value-card", {
        scrollTrigger: { trigger: ".about-values-grid", start: "top 88%" },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
      });

      gsap.from(".about-cta-inner", {
        scrollTrigger: { trigger: ".about-cta-section", start: "top 92%" },
        y: 30, opacity: 0, duration: 0.9, ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#faf7f2] text-[#2d2416] overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <nav
          className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 rounded-2xl transition-all duration-500 ${
            scrolled ? "py-1.5 bg-white/90 border border-[#8b6f47]/10 shadow-sm" : "bg-transparent py-2"
          }`}
          style={{ backdropFilter: scrolled ? "blur(20px)" : "none", WebkitBackdropFilter: scrolled ? "blur(20px)" : "none" }}
        >
          <div className="flex items-center justify-between gap-4 w-full">
            <a href="#home" className="group flex items-center gap-2 transition-opacity hover:opacity-90">
              <img src={mainLogo} alt="Planto" className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105" />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "20px", fontWeight: 700, color: "#1B4332" }}>Planto</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              {[["Home","#home"],["Shop","#shop"],["About","#about"],["Contact","#home"]].map(([lbl, href]) => (
                <a key={lbl} href={href}
                  style={{
                    color: lbl === "About" ? "#4a7a45" : "rgba(45,36,22,0.65)",
                    fontWeight: lbl === "About" ? 600 : 400,
                    fontSize: "15px", fontFamily: "'DM Sans',sans-serif",
                    borderBottom: lbl === "About" ? "2px solid #4a7a45" : "2px solid transparent",
                    paddingBottom: "2px", transition: "color 0.2s",
                  }}
                >{lbl}</a>
              ))}
            </div>
            <a href="#shop"
              className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: "#4a7a45", color: "#fff", boxShadow: "0 4px 16px rgba(74,122,69,0.25)" }}
            >
              <span>Shop Now</span><IconArrow />
            </a>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="about-hero relative pt-48 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="about-blob-1 absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(74,122,69,0.12) 0%, transparent 70%)", filter: "blur(90px)", opacity: 0.7 }} />
          <div className="about-blob-2 absolute -bottom-24 -right-24 w-[480px] h-[480px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,232,194,0.25) 0%, transparent 70%)", filter: "blur(80px)", opacity: 0.8 }} />
          {/* Decorative grid lines */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(rgba(45,36,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,36,22,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="about-eyebrow inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase mb-6 px-4 py-1.5 rounded-full"
            style={{ color: "#4a7a45", background: "rgba(74,122,69,0.08)", border: "1px solid rgba(74,122,69,0.15)" }}>
            ✦ &nbsp;Our Story
          </span>

          <h1 className="overflow-hidden flex justify-center gap-x-4 flex-wrap mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(52px, 10vw, 96px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", color: "#1B4332" }}>
            <span className="about-hero-word inline-block">Rooted</span>
            <span className="about-hero-word inline-block italic" style={{ color: "#4a7a45", fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>in</span>
            <span className="about-hero-word inline-block">Purpose</span>
          </h1>

          <p className="about-hero-sub mx-auto text-[#2d2416]/55 leading-[1.8]"
            style={{ fontSize: "clamp(16px, 1.8vw, 19px)", maxWidth: "540px", fontFamily: "'DM Sans', sans-serif" }}>
            A small apartment, a few struggling plants, and one question that changed everything — what if caring for plants didn't have to be so hard?
          </p>
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="pb-28 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto space-y-5">

          {/* ── Card 1: The Beginning ── */}
          <div className="about-card rounded-[28px] overflow-hidden"
            style={{ background: "#fff", border: "1px solid rgba(45,36,22,0.07)", boxShadow: "0 4px 32px rgba(0,0,0,0.05)" }}>
            {/* Card header strip */}
            <div className="flex items-center gap-4 px-8 sm:px-12 pt-8 pb-6"
              style={{ borderBottom: "1px solid rgba(74,122,69,0.08)" }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(74,122,69,0.08)", border: "1px solid rgba(74,122,69,0.15)", color: "#4a7a45" }}>
                <IconSeedling />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-0.5" style={{ color: "#4a7a45" }}>Chapter 01</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 600, color: "#1B4332", lineHeight: 1.2 }}>
                  The Beginning
                </h2>
              </div>
              <span className="text-[40px] font-black opacity-[0.06] select-none" style={{ color: "#4a7a45", fontFamily: "'DM Sans', sans-serif" }}>01</span>
            </div>
            <div className="px-8 sm:px-12 py-7 space-y-4"
              style={{ color: "rgba(45,36,22,0.62)", fontSize: "16px", lineHeight: "1.9", fontFamily: "'DM Sans', sans-serif" }}>
              <p>It started in 2018 in a small San Francisco apartment. Emma Chen loved plants but kept losing them — not from lack of care, but from lack of the right guidance. She'd buy something beautiful, follow the tag instructions, and watch it slowly fade.</p>
              <p>After talking to dozens of people with the same story, she realized the problem wasn't the plants. It was the gap between enthusiasm and knowledge. So she set out to close it — and <strong style={{ color: "#1B4332", fontWeight: 600 }}>Planto</strong> was born.</p>
            </div>
          </div>

          {/* ── Card 2: Our Mission ── */}
          <div className="about-card rounded-[28px] overflow-hidden"
            style={{ background: "linear-gradient(135deg, #f0f7ee 0%, #faf7f2 60%)", border: "1px solid rgba(74,122,69,0.12)", boxShadow: "0 4px 32px rgba(74,122,69,0.06)" }}>
            <div className="flex items-center gap-4 px-8 sm:px-12 pt-8 pb-6"
              style={{ borderBottom: "1px solid rgba(74,122,69,0.1)" }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(74,122,69,0.12)", border: "1px solid rgba(74,122,69,0.2)", color: "#4a7a45" }}>
                <IconTarget />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-0.5" style={{ color: "#4a7a45" }}>Chapter 02</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 600, color: "#1B4332", lineHeight: 1.2 }}>
                  Our Mission
                </h2>
              </div>
              <span className="text-[40px] font-black opacity-[0.06] select-none" style={{ color: "#4a7a45", fontFamily: "'DM Sans', sans-serif" }}>02</span>
            </div>
            <div className="px-8 sm:px-12 py-7 space-y-4"
              style={{ color: "rgba(45,36,22,0.62)", fontSize: "16px", lineHeight: "1.9", fontFamily: "'DM Sans', sans-serif" }}>
              <p>We believe a home with plants is a home that breathes. Our mission is simple: make it easy for anyone — regardless of experience — to bring living greenery into their space and actually keep it thriving.</p>
              <p>Every plant in our collection is chosen for how it performs in real homes, not just greenhouses. We pair each one with honest care guidance, so you're never left guessing.</p>
            </div>
          </div>

          {/* ── Card 3: Values ── */}
          <div className="about-card rounded-[28px] overflow-hidden"
            style={{ background: "#fff", border: "1px solid rgba(45,36,22,0.07)", boxShadow: "0 4px 32px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-4 px-8 sm:px-12 pt-8 pb-6"
              style={{ borderBottom: "1px solid rgba(74,122,69,0.08)" }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(74,122,69,0.08)", border: "1px solid rgba(74,122,69,0.15)", color: "#4a7a45" }}>
                <IconHeart />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-0.5" style={{ color: "#4a7a45" }}>Chapter 03</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 600, color: "#1B4332", lineHeight: 1.2 }}>
                  What We Stand For
                </h2>
              </div>
              <span className="text-[40px] font-black opacity-[0.06] select-none" style={{ color: "#4a7a45", fontFamily: "'DM Sans', sans-serif" }}>03</span>
            </div>
            <div className="about-values-grid grid sm:grid-cols-2 gap-3 px-8 sm:px-12 py-7">
              {values.map((val, idx) => (
                <div key={idx} className="about-value-card group rounded-2xl p-5 transition-all duration-300 cursor-default"
                  style={{ background: "rgba(74,122,69,0.04)", border: "1px solid rgba(74,122,69,0.09)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(74,122,69,0.08)"; e.currentTarget.style.borderColor = "rgba(74,122,69,0.18)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(74,122,69,0.04)"; e.currentTarget.style.borderColor = "rgba(74,122,69,0.09)"; }}>
                  <div className="text-xl mb-3 select-none">{val.icon}</div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 700, color: "#1B4332", letterSpacing: "-0.01em", marginBottom: "6px" }}>
                    {val.title}
                  </h3>
                  <p style={{ color: "#2d2416", fontSize: "14px", lineHeight: "1.75", fontWeight: 500 }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 4: Where We Are Now ── */}
          <div className="about-card rounded-[28px] overflow-hidden"
            style={{ background: "#fff", border: "1px solid rgba(45,36,22,0.07)", boxShadow: "0 4px 32px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-4 px-8 sm:px-12 pt-8 pb-6"
              style={{ borderBottom: "1px solid rgba(74,122,69,0.08)" }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(74,122,69,0.08)", border: "1px solid rgba(74,122,69,0.15)", color: "#4a7a45" }}>
                <IconLeaf />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-0.5" style={{ color: "#4a7a45" }}>Chapter 04</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 600, color: "#1B4332", lineHeight: 1.2 }}>
                  Where We Are Now
                </h2>
              </div>
              <span className="text-[40px] font-black opacity-[0.06] select-none" style={{ color: "#4a7a45", fontFamily: "'DM Sans', sans-serif" }}>04</span>
            </div>
            <div className="px-8 sm:px-12 py-7 space-y-4"
              style={{ color: "rgba(45,36,22,0.62)", fontSize: "16px", lineHeight: "1.9", fontFamily: "'DM Sans', sans-serif" }}>
              <p>That apartment is long gone, but the question that started it all still drives us. Today, Planto serves tens of thousands of plant parents across the country — from first-time buyers to serious collectors.</p>
              <p>Our team now includes botanists, growers, and designers who all share one thing: a genuine belief that the right plant, in the right hands, can change how a space feels.</p>
              <blockquote className="mt-6 pl-5 py-1"
                style={{ borderLeft: "3px solid #4a7a45", fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "18px", fontWeight: 500, color: "#1B4332", lineHeight: 1.65 }}>
                "We're still just getting started. Every plant we send out is a small bet that someone's home is about to feel a little more alive."
              </blockquote>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div className="about-stats-row grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat rounded-2xl p-6 text-center transition-all duration-300"
                style={{ background: "#fff", border: "1px solid rgba(74,122,69,0.12)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(74,122,69,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)"; }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, color: "#4a7a45", lineHeight: 1.1, marginBottom: "4px" }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(45,36,22,0.45)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="about-cta-section about-card rounded-[28px] overflow-hidden relative"
            style={{ background: "#1B4332", border: "1px solid rgba(74,122,69,0.2)" }}>
            <WindyLeaves opacity={0.6} />
            <BotanicGrid />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex:2 }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px]"
                style={{ background: "radial-gradient(ellipse, rgba(74,122,69,0.25) 0%, transparent 70%)", filter: "blur(40px)" }} />
              {/* Decorative dots */}
              <div className="absolute bottom-6 right-8 opacity-10 select-none text-white text-[80px] font-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>✦</div>
            </div>
            <div className="about-cta-inner relative z-10 px-8 sm:px-14 py-12 sm:py-16 text-center">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase mb-5 px-4 py-1.5 rounded-full"
                style={{ color: "rgba(212,232,194,0.9)", background: "rgba(74,122,69,0.25)", border: "1px solid rgba(74,122,69,0.3)" }}>
                ✦ &nbsp;Ready to start?
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 600, color: "#fff", lineHeight: 1.15, marginBottom: "16px", fontStyle: "italic" }}>
                Find your perfect plant.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", lineHeight: "1.8", maxWidth: "400px", margin: "0 auto 32px" }}>
                Browse our full collection — from easy-care starters to rare collector pieces. Something in there is waiting for your windowsill.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => handleNavigation("#shop")}
                  className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ background: "#4a7a45", color: "#fff", boxShadow: "0 8px 28px rgba(74,122,69,0.4)" }}>
                  Browse Plants <IconArrow />
                </button>
                <button onClick={() => handleNavigation("#home")}
                  className="px-8 py-3.5 font-semibold text-sm rounded-full transition-all duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}>
                  Get in Touch
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 relative z-10" style={{ borderTop: "1px solid rgba(45,36,22,0.07)" }}>
        <div className="max-w-3xl mx-auto text-center" style={{ color: "rgba(45,36,22,0.35)", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>
          &copy; 2025 Planto. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
