import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import plant1 from "../assets/plants/1.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  // Animate headline words
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const headline = el.querySelector(".hero-headline");
    if (!headline) return;
    const text = headline.textContent.trim();
    const words = text.split(/\s+/);
    headline.innerHTML = words
      .map((w) => `<span class="hero-word">${w}</span>`)
      .join(" ");

    const spans = headline.querySelectorAll(".hero-word");
    spans.forEach((span, i) => {
      span.style.animationDelay = `${0.12 + i * 0.18}s`;
    });

    const stats = el.querySelector(".hero-stats");
    if (stats) {
      setTimeout(() => stats.classList.add("revealed"), 800);
    }
  }, []);

  // Scroll-based canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 300;
    const currentFrame = (index) =>
      `/ezgif-4/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const images = [];
    const seq = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const img = images[seq.frame];
      if (img && img.complete) {
        // Draw image covering the canvas (object-fit: cover equivalent)
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    };

    images[0].onload = render;

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener("resize", handleResize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=250%", // How long the scroll effect lasts
        pin: true,
        scrub: 0.5,
      },
    });

    tl.to(seq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
      // Clean up all scroll triggers created by this component
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden"
      ref={wrapperRef}
    >
      {/* Canvas background replacing video */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "rgba(0,0,0,0.45)",
        }}
      />

      {/* Decorative glow */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{
          zIndex: 1,
          background: "radial-gradient(circle, rgba(74,122,69,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Content — left-aligned overlay */}
      <div
        className="flex flex-col gap-6"
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          transform: "translateY(-50%)",
          width: "45%",
          textAlign: "left",
          zIndex: 10,
          paddingTop: "80px",
        }}
      >
        {/* Eyebrow */}
        <span
          className="inline-flex items-center gap-2 w-fit text-[12px] font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
          style={{ color: "#d4e8c2", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}
        >
          ✦ &nbsp;Hand-selected &amp; nurtured
        </span>

        {/* Headline */}
        <h1
          className="hero-headline leading-[1.05] tracking-tight"
          style={{
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: "clamp(44px, 7vw, 80px)",
            textShadow: "0 4px 24px rgba(0,0,0,0.3)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Breathe&nbsp;Natural
        </h1>

        {/* Description */}
        <p
          className="text-base sm:text-lg max-w-md paragraphIn"
          style={{
            color: "rgba(255,255,255,0.80)",
            lineHeight: 1.8,
            animationDelay: "0.7s",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Every botanical specimen in our collection is hand-selected and nurtured to bring living beauty into your home. Because every leaf tells a story worth keeping.
        </p>

        {/* Decorative rule + stat pills */}
        <div className="hero-stats" style={{ position:"relative", zIndex:2 }}>
          <hr style={{ width:"40px", border:"none", borderTop:"1px solid rgba(80,120,50,0.2)", margin:"0 0 24px" }} />
          <div className="flex flex-row items-center" style={{ gap:"2px" }}>
            {[
              { label:"Rare specimens", value:"240+" },
              { label:"Countries sourced", value:"38" },
              { label:"Years cultivating", value:"12" },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  display:"flex", flexDirection:"column", alignItems:"center",
                  background:"rgba(255,255,255,0.45)", backdropFilter:"blur(8px)",
                  WebkitBackdropFilter:"blur(8px)",
                  border:"0.5px solid rgba(100,140,70,0.2)",
                  borderRadius:"999px", padding:"10px 28px",
                  borderRight: i < 2 ? "0.5px solid rgba(100,140,70,0.2)" : "0.5px solid transparent",
                }}
              >
                <span style={{ color:"#d4e8c2", fontSize:"10px", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500 }}>
                  {s.label}
                </span>
                <span style={{ color:"#ffffff", fontSize:"22px", fontWeight:600 }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#collection"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "#4CAF50",
              color: "#ffffff",
              boxShadow: "0 10px 30px rgba(76,175,80,0.3)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#3D8B40"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#4CAF50"; }}
          >
            Browse Plants
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M13 18l6-6-6-6" />
            </svg>
          </a>
          <a
            href="#philosophy"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4CAF50"; e.currentTarget.style.color = "#4CAF50"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#ffffff"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Our Philosophy
          </a>
        </div>

        {/* Secondary link */}
        <a
          href="#testimonials"
          className="secondary-link inline-flex items-center gap-2 text-sm font-medium transition-colors mt-1"
          style={{ color: "rgba(255,255,255,0.55)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
        >
          <span>Meet the botanists & our community</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </div>

      {/* Testimonial card — floating */}
      <div
        className="absolute hidden lg:flex items-start gap-3 w-fit max-w-[260px] rounded-2xl p-4"
        style={{
          zIndex: 10,
          right: "5%",
          top: "22%",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: "rgba(76,175,80,0.35)", color: "#ffffff" }}
        >
          JD
        </div>
        <div>
          <p className="text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
            "This plant completely changed my living room vibe. Absolutely in love."
          </p>
          <span className="text-xs mt-1 block" style={{ color: "rgba(255,255,255,0.6)" }}>— Jamie D.</span>
        </div>
      </div>

      {/* Calathea plant card — floating */}
      <div
        className="absolute hidden lg:flex items-center gap-3 w-fit max-w-[220px] rounded-2xl p-3"
        style={{
          zIndex: 10,
          right: "8%",
          bottom: "22%",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        <img
          src={plant1}
          alt="Calathea plant"
          className="w-12 h-12 object-contain"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>Calathea</p>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>Easy care</span>
        </div>
      </div>
    </section>
  );
}
