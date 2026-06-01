import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import besto2Plant from "../assets/plants/besto2-plant.png";
import SectionTitle from "./ui/SectionTitle";

const slides = [
  {
    id: 1,
    title: "Small Plants. Serious Air Quality.",
    desc1: "Our compact O2 collection proves that great things come in small pots. Each plant is hand-picked for its air-purifying performance and its ability to thrive in tight spaces.",
    desc2: "Whether it's a desk, a shelf, or a bathroom corner — these plants work quietly in the background, filtering toxins and lifting the air quality of any room they're placed in.",
  },
  {
    id: 2,
    title: "Living Greenery for Every Room.",
    desc1: "Premium indoor plants chosen for real homes, not showrooms. Each variety is selected for how it actually performs under typical indoor light, humidity, and care routines.",
    desc2: "Every plant ships with detailed care guidance written by our botanists — so whether you're a seasoned plant parent or just starting out, you'll know exactly what to do.",
  },
  {
    id: 3,
    title: "Breathe Better. Live Greener.",
    desc1: "Scientifically documented species, independently verified air-benefit data. Our premium O2 plants don't just look good — they actively reduce VOCs and increase oxygen levels.",
    desc2: "Robust, mature specimens that make an immediate impact. These aren't starter plants — they're statement pieces that happen to make your home healthier.",
  },
];

export default function BestO2() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const slideNum = String(current + 1).padStart(2, "0");

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".besto2-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".besto2-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
      gsap.from(".besto2-img", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
      gsap.from(".besto2-content > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.4
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="more" ref={sectionRef} className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-30 max-w-7xl mx-auto">
      <div>

        <div className="besto2-header flex justify-center mb-10 sm:mb-12">
          <SectionTitle>Breathe Easy: Our Top O2 Purifiers</SectionTitle>
        </div>

        {/* Container with overflow visible to let plant break out */}
        <div className="relative flex items-center justify-center">
          {/* Card container — overflow hidden only on right side visually */}
          <div
            className="besto2-card rounded-3xl border border-white/[0.09] overflow-visible w-full flex flex-col lg:flex-row items-stretch relative"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Left — plant image breaks out of card */}
            <div className="lg:w-[45%] flex justify-start items-center px-0 pt-0 pb-0 lg:pb-0 min-h-[400px] lg:min-h-[420px] relative -ml-19 lg:-ml-20">
              <img
                src={besto2Plant}
                alt="Best O2 indoor plant"
                className="besto2-img w-full max-w-[600px] sm:max-w-[800x] lg:max-w-[400px] object-contain drop-shadow-[0_12px_24px_rgba(74,122,69,0.15)]"
                key={current}
              />
            </div>

            {/* Right — text content inside card */}
            <div className="besto2-content lg:w-[55%] px-6 sm:px-8 lg:px-10 py-8 lg:py-12 flex flex-col justify-center">
              <h2 className="text-brand-dark text-xl sm:text-2xl lg:text-[1.7rem] font-bold mb-5 leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>
                {slides[current].title}
              </h2>
              <p className="text-brand-dark/50 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{slides[current].desc1}</p>
              <p className="text-brand-dark/50 text-sm leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>{slides[current].desc2}</p>

              <div className="flex flex-wrap items-center gap-4">
                <button type="button" className="btn-primary text-sm px-6 py-2.5">
                  Explore
                </button>

                {/* Carousel control */}
                <div className="flex items-center gap-1 rounded-full px-1 py-1 border border-brand-bark/12 bg-white/[0.05]">
                  <button
                    type="button"
                    onClick={prev}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-brand-dark/65 hover:text-brand-dark hover:bg-brand-sand transition-all duration-300"
                    aria-label="Previous slide"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <span className="text-brand-dark/75 text-sm font-medium tabular-nums min-w-[2rem] text-center">
                    {slideNum}
                  </span>
                  <button
                    type="button"
                    onClick={next}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-brand-dark/65 hover:text-brand-dark hover:bg-brand-sand transition-all duration-300"
                    aria-label="Next slide"
                  >
                    <svg width="40" height="50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="besto2-content flex justify-center gap-2 mt-8 sm:mt-10" role="tablist" aria-label="Carousel slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}