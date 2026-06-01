import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import plant1 from "../assets/plants/1.png";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;
const currentFrame = (index) => `/hero-sequence/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

export default function Hero() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

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
  }, []);

  // GSAP Canvas Sequence
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const images = [];
    let loadedCount = 0;

    const render = (img) => {
      if (!img || !img.complete) return;
      const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      const cw = img.width * ratio;
      const ch = img.height * ratio;
      const cx = (canvas.width - cw) / 2;
      const cy = (canvas.height - ch) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height, cx, cy, cw, ch);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (images[0]) render(images[0]);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
      img.onload = () => {
        loadedCount++;
        if (i === 1) {
          render(img); // Draw first frame immediately
        }
        if (loadedCount === FRAME_COUNT) {
          setImagesPreloaded(true);
        }
      };
    }

    const sequence = { frame: 0 };

    const ctxGsap = gsap.context(() => {
      gsap.to(sequence, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=150%", // Smooth, short scroll to complete
          scrub: 0.5,
          pin: true,
        },
        onUpdate: () => {
          render(images[sequence.frame]);
        }
      });
    }, wrapperRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctxGsap.revert();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center overflow-hidden bg-brand-cream"
      ref={wrapperRef}
    >
      <canvas
        id="hero-canvas"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 1 }}
      />
      {/* Dark overlay for contrast — rgba(0,0,0,0.45) */}
      <div
        id="hero-overlay"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Decorative glow */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(74,122,69,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 pointer-events-none">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Editorial Text */}
          <div className="flex flex-col gap-6 pointer-events-auto">

            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
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

          {/* RIGHT: Visual Cards */}
          <div className="relative hidden lg:flex flex-col gap-4 pointer-events-auto">
            {/* Review card — glassmorphism */}
            <div
              className="review-card flex items-start gap-3 w-fit max-w-[260px] rounded-2xl p-4"
              style={{
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

            {/* Plant card — glassmorphism */}
            <div
              className="plant-card-self flex items-center gap-3 w-fit max-w-[220px] rounded-2xl p-3 ml-auto"
              style={{
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

            {/* Decorative plant images */}
            <img
              src={plant1}
              alt=""
              className="absolute -bottom-10 -right-6 w-32 opacity-40 pointer-events-none rotate-6"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
