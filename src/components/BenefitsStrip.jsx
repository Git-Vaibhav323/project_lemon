import { useEffect, useRef, useState } from "react";

const benefits = [
  { id: 1, value: 73, suffix: "%", label: "Air Toxins Removed" },
  { id: 2, value: 40, suffix: "%", label: "Stress Reduction" },
  { id: 3, value: 20, suffix: "%", label: "Humidity Boost" },
];

function CountUp({ target, suffix, visible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible, target]);

  return (
    <span className="count-up-value">
      {count}{suffix}
    </span>
  );
}

export default function BenefitsStrip() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16 max-w-7xl mx-auto relative z-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {benefits.map((b) => (
          <div
            key={b.id}
            className="glass flex flex-col items-center justify-center py-8 sm:py-10 px-6 text-center"
          >
            <div className="benefit-count font-serif">
              <CountUp target={b.value} suffix={b.suffix} visible={visible} />
            </div>
            <div className="benefit-label">{b.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
