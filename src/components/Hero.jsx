import { useEffect, useRef } from "react";
import plant1 from "../assets/plants/1.png";

export default function Hero() {
  const wrapperRef = useRef(null);

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

  useEffect(() => {
    const video = document.getElementById("plant-bg-video");
    if (!video) return;
    const show = () => video.classList.add("ready");
    if (video.readyState >= 3) {
      show();
    } else {
      video.addEventListener("canplay", show, { once: true });
    }
    const fallback = setTimeout(show, 2000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      ref={wrapperRef}
    >
      <video
        id="plant-bg-video"
        src="/mp___1_.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div id="hero-overlay" />

      {/* Decorative glow */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(61,255,160,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Editorial Text */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow */}
            <span
              className="inline-block text-[13px] font-medium tracking-[0.2em] uppercase"
              style={{ color: "#9db59a", opacity: 0.8 }}
            >
              Hand-selected & nurtured
            </span>

            {/* Headline */}
            <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white">
              Breath Natural
            </h1>

            {/* Description */}
            <p className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed paragraphIn" style={{ animationDelay: "0.7s" }}>
              We grow each botanical specimen with care, offering hand-selected plants nurtured to bring life to your home. Because every leaf tells a story.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03]"
                style={{ background: "#9db59a", color: "#0b1d0d" }}
              >
                Browse Plants
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M13 18l6-6-6-6" />
                </svg>
              </a>
              <a
                href="#philosophy"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{ color: "#9db59a", border: "1px solid rgba(61,255,160,0.3)" }}
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
              className="secondary-link inline-flex items-center gap-2 text-white/40 text-sm font-medium hover:text-white/70 transition-colors mt-1"
            >
              <span>Meet the botanists & our community</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* RIGHT: Visual Cards */}
          <div className="relative hidden lg:flex flex-col gap-4">
            {/* Review card */}
            <div className="review-card flex items-start gap-3 w-fit max-w-[260px] rounded-2xl p-4 backdrop-blur-sm bg-white/[0.04] border border-white/[0.06]">
              <div className="w-9 h-9 rounded-full bg-[#9db59a]/20 flex items-center justify-center text-[#9db59a] text-sm font-bold shrink-0">
                JD
              </div>
              <div>
                <p className="text-white/80 text-sm leading-relaxed">
                  "This plant completely changed my living room vibe. Absolutely in love."
                </p>
                <span className="text-white/30 text-xs mt-1 block">— Jamie D.</span>
              </div>
            </div>

            {/* Plant card */}
            <div className="plant-card-self flex items-center gap-3 w-fit max-w-[220px] rounded-2xl p-3 backdrop-blur-sm bg-white/[0.04] border border-white/[0.06] ml-auto">
              <img
                src={plant1}
                alt="Calathea plant"
                className="w-12 h-12 object-contain"
                loading="lazy"
              />
              <div>
                <p className="text-white text-sm font-semibold">Calathea</p>
                <span className="text-white/30 text-xs">Easy care</span>
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
