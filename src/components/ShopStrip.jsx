import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ShopStrip() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".shop-strip-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d0d] via-[#112a18] to-[#0b1d0d]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="shop-strip-item inline-block text-[13px] font-medium tracking-[0.2em] uppercase" style={{ color: "#9db59a", opacity: 0.7 }}>
          Curated collection
        </span>
        <h2 className="shop-strip-item text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mt-4 tracking-tight">
          Ready to bring the outdoors in?
        </h2>
        <p className="shop-strip-item text-white/50 text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
          Every plant in our shop is hand-picked and pre-quarantined so it arrives healthy, happy, and ready to thrive.
        </p>
        <a
          href="#shop"
          className="shop-strip-item inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03] mt-8"
          style={{ background: "#9db59a", color: "#0b1d0d" }}
        >
          Visit the Shop
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M13 18l6-6-6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
