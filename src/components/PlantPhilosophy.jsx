export default function PlantPhilosophy() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        {/* Left column: display number + label */}
        <div className="lg:w-[45%] flex items-start gap-4">
          <span
            className="text-[120px] font-bold leading-none select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(61,255,160,0.2)",
            }}
          >
            03
          </span>
          <span
            className="text-[#3dffa0] text-[11px] font-semibold tracking-[2px] uppercase whitespace-nowrap mt-6"
            style={{ transform: "rotate(-90deg) translateX(-100%)", transformOrigin: "left top" }}
          >
            EST. GREENHOUSE
          </span>
        </div>

        {/* Right column: content */}
        <div className="lg:w-[55%]">
          <span className="text-[#3dffa0] text-[11px] font-semibold tracking-[2px] uppercase">
            OUR BELIEF
          </span>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-[32px] font-serif font-bold leading-[1.2] mt-3 max-w-xl">
            Plants are not decoration. They are the oldest living design.
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed mt-4 max-w-lg">
            Every specimen in our collection is chosen for character — not trends.
            We source slow, we grow patient, and we deliver something worth caring for.
          </p>
          <a
            href="#collection"
            className="inline-block mt-6 text-[#3dffa0] text-sm font-medium hover:underline underline-offset-4 decoration-[#3dffa0]/40"
          >
            See our collection &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
