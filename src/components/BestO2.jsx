import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import besto2Plant from "../assets/plants/besto2-plant.png";
import SectionTitle from "./ui/SectionTitle";

const slides = [
  {
    id: 1,
    title: "We Have Small And Best O2 Plants Collection's",
    desc1: "Discover our curated selection of compact oxygen-producing plants perfect for any space. Each plant is carefully chosen for its air-purifying properties and aesthetic appeal.",
    desc2: "Transform your indoor environment with nature's best air filters. Our O2 plants not only beautify your space but actively improve air quality, creating a healthier living environment for you and your family.",
  },
  {
    id: 2,
    title: "Fresh Indoor Plants For Your Living Space",
    desc1: "Bring life and vitality to your home with our premium indoor plant collection. Expertly selected varieties that thrive in indoor conditions while adding natural elegance to your decor.",
    desc2: "Each plant comes with detailed care instructions and our commitment to quality. Whether you're a seasoned plant parent or just starting your green journey, we have the perfect plants for your lifestyle.",
  },
  {
    id: 3,
    title: "Premium O2 Plants For Healthy Environment",
    desc1: "Invest in your wellbeing with our premium oxygen-producing plants. Scientifically proven to reduce toxins and increase oxygen levels, creating a fresher, healthier indoor atmosphere.",
    desc2: "Experience the difference that quality plants make. Our premium collection features robust, mature specimens that deliver immediate impact and long-lasting beauty to your space.",
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
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Left — plant image breaks out of card */}
            <div className="lg:w-[45%] flex justify-start items-center px-0 pt-0 pb-0 lg:pb-0 min-h-[400px] lg:min-h-[420px] relative -ml-19 lg:-ml-20">
              <img
                src={besto2Plant}
                alt="Best O2 indoor plant"
                className="besto2-img w-full max-w-[600px] sm:max-w-[800x] lg:max-w-[400px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                key={current}
              />
            </div>

            {/* Right — text content inside card */}
            <div className="besto2-content lg:w-[55%] px-6 sm:px-8 lg:px-10 py-8 lg:py-12 flex flex-col justify-center">
              <h2 className="text-white text-xl sm:text-2xl lg:text-[1.65rem] font-bold mb-5 leading-snug">
                {slides[current].title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{slides[current].desc1}</p>
              <p className="text-white/50 text-sm leading-relaxed mb-8">{slides[current].desc2}</p>

              <div className="flex flex-wrap items-center gap-4">
                <button type="button" className="btn-primary text-sm px-6 py-2.5">
                  Explore
                </button>

                {/* Carousel control */}
                <div className="flex items-center gap-1 rounded-full px-1 py-1 border border-white/10 bg-white/[0.05]">
                  <button
                    type="button"
                    onClick={prev}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                    aria-label="Previous slide"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <span className="text-white/80 text-sm font-medium tabular-nums min-w-[2rem] text-center">
                    {slideNum}
                  </span>
                  <button
                    type="button"
                    onClick={next}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
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