import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function PlantPhilosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".anim-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
      
      gsap.from(".anim-number", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        {/* Left column: display number + label */}
        <div className="lg:w-[45%] flex items-start gap-4">
          <span
            className="anim-number text-[120px] font-bold leading-none select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(74,122,69,0.2)",
            }}
          >
            03
          </span>
          <span
            className="anim-item text-brand-moss text-[11px] font-semibold tracking-[2px] uppercase whitespace-nowrap mt-6"
            style={{ transform: "rotate(-90deg) translateX(-100%)", transformOrigin: "left top" }}
          >
            EST. GREENHOUSE
          </span>
        </div>

        {/* Right column: content */}
        <div className="lg:w-[55%]">
          <span className="anim-item block text-brand-moss text-[11px] font-semibold tracking-[2px] uppercase">
            OUR BELIEF
          </span>
          <h2 className="anim-item text-brand-dark text-3xl sm:text-4xl lg:text-[34px] font-serif font-bold leading-[1.2] mt-3 max-w-xl">
            Plants are not decoration. They are the oldest living design.
          </h2>
          <p className="anim-item text-brand-dark/55 text-[15px] leading-relaxed mt-4 max-w-lg">
            Every specimen in our collection is chosen for character — not trends.
            We source slow, we grow patient, and we deliver something worth caring for.
          </p>
          <a
            href="#collection"
            className="anim-item inline-flex items-center gap-1.5 mt-6 text-brand-moss text-sm font-semibold hover:underline underline-offset-4 decoration-[#4a7a45]/40"
          >
            Explore the collection
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
