import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: 1,
    title: "Browse",
    desc: "Explore our curated collection of premium indoor plants, each with detailed care information.",
  },
  {
    number: 2,
    title: "Select",
    desc: "Choose your perfect plant and add it to your cart. We'll carefully pack it for safe travel.",
  },
  {
    number: 3,
    title: "Delivered in 48hrs",
    desc: "Your plant arrives at your doorstep, healthy and ready to thrive in its new home.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (lineRef.current) lineRef.current.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto relative z-10"
    >
      <div className="glass py-12 sm:py-14 px-6 sm:px-8 lg:px-12">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12">
          From Greenhouse to Your Home
        </h2>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
          {/* Connecting SVG line - desktop only */}
          <div className="hidden lg:block absolute top-8 left-[calc(16.66%+30px)] right-[calc(16.66%+30px)] h-[2px] pointer-events-none z-0">
            <svg width="100%" height="2" viewBox="0 0 800 2" preserveAspectRatio="none">
              <path
                ref={lineRef}
                className={`step-line ${visible ? "visible" : ""}`}
                d="M0 1 L800 1"
                stroke="#9db59a"
                strokeWidth="2"
                strokeDasharray="12 8"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>

          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center relative z-10 lg:w-1/3 px-4"
            >
              <div className="step-circle mb-4">{step.number}</div>
              <h3 className="text-white text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
