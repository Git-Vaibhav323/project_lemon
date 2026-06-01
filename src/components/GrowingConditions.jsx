import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const items = [
  {
    id: 1,
    question: "How do I know which light my space gets?",
    answer:
      "Stand where you'd place the plant at noon. Direct sun = square of sunlight on floor. Indirect = bright but no direct beam. Low light = comfortable reading without a lamp.",
  },
  {
    id: 2,
    question: "When exactly should I water?",
    answer:
      "Push a finger 2cm into the soil. If it comes out clean and dry — water. If soil clings — wait. Most indoor plants fail from overwatering, not drought.",
  },
  {
    id: 3,
    question: "Do all plants actually clean air?",
    answer:
      "Yes, but the effect is real at scale. Studies show noticeable VOC reduction with 6–8 plants per 100 sq ft. Our air-benefit labels reflect independently documented species data.",
  },
  {
    id: 4,
    question: "What size pot should I repot into?",
    answer:
      "Go one size up only — 2–3cm wider than current pot. Too large a pot holds excess moisture the roots can't absorb, which causes root rot.",
  },
];

export default function GrowingConditions() {
  const [openId, setOpenId] = useState(null);
  const sectionRef = useRef(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".gc-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".gc-item", {
        scrollTrigger: {
          trigger: ".gc-list",
          start: "top 80%",
        },
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="care" ref={sectionRef} className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 max-w-4xl mx-auto relative z-10">
      <div className="gc-header text-center mb-10 sm:mb-12">
        <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase mb-3 px-3 py-1 rounded-full"
          style={{ color: "#4a7a45", background: "rgba(74,122,69,0.08)", border: "1px solid rgba(74,122,69,0.15)" }}>
          Plant Care
        </span>
        <h2 className="text-brand-dark text-2xl sm:text-3xl md:text-4xl font-bold" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>
          Everything your plant needs to thrive
        </h2>
        <p className="text-brand-dark/50 text-sm sm:text-base mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Honest guidance — not generic tips.
        </p>
      </div>

      <div className="gc-list">
        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="gc-item border-b border-brand-bark/10"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between py-5 text-left text-brand-dark text-sm sm:text-base font-medium hover:text-brand-dark/85 transition-colors"
              >
                <span>{item.question}</span>
                <span
                  className={`text-brand-moss text-lg font-light transition-transform duration-300 shrink-0 ml-4 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-350 ease"
                style={{
                  maxHeight: isOpen ? "300px" : "0",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p className="pb-5 text-brand-dark/55 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
