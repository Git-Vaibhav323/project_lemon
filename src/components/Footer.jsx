import { useRef, useEffect } from "react";
import gsap from "gsap";
import BrandLogo from "./ui/BrandLogo";

const quickLinks = ["Home", "Type's of plants", "Contact", "Privacy"];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
      gsap.from(".footer-bottom", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="bg-brand-sand border-t border-brand-bark/10 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="footer-col sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              className="inline-block mb-4 transition-opacity duration-300 hover:opacity-90"
              aria-label="Planto home"
            >
              <BrandLogo size="lg" />
            </a>
            <p className="text-brand-dark/50 text-xs sm:text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Thoughtfully curated plants for real homes. We make it easy to bring living greenery into your space — and actually keep it thriving.
            </p>
            <div className="flex gap-5 mt-6">
              {[
                { label: "Facebook", abbr: "FB" },
                { label: "Twitter", abbr: "TW" },
                { label: "LinkedIn", abbr: "Li" },
              ].map((s) => (
                <a
                  key={s.abbr}
                  href="#"
                  className="text-brand-dark/45 text-xs font-semibold hover:text-brand-dark transition-colors duration-300"
                  aria-label={s.label}
                >
                  {s.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="text-brand-dark text-sm sm:text-base font-semibold mb-4 sm:mb-5">
              Quick Link&apos;s
            </h3>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-brand-dark/50 text-xs sm:text-sm hover:text-brand-dark transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col sm:col-span-2 lg:col-span-1">
            <h3 className="text-brand-dark text-sm sm:text-base font-semibold mb-4 sm:mb-5">
              For Every Update
            </h3>
            <form
              className="relative max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter Email........"
                className="w-full bg-white border border-brand-bark/15 rounded-full text-brand-dark text-xs sm:text-sm pl-5 pr-28 sm:pr-32 py-3 sm:py-3.5 outline-none placeholder:text-brand-dark/30 focus:border-brand-moss/30 transition-colors duration-300"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-moss hover:bg-brand-green text-brand-dark text-[10px] sm:text-xs font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 active:scale-95 tracking-wide"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Admin Link */}
        <div className="footer-bottom border-t border-brand-bark/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-brand-dark/35 text-xs sm:text-sm text-center sm:text-left" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            &copy; 2025 Planto. All rights reserved.
          </p>
          <a 
            href="#admin" 
            className="text-xs sm:text-sm text-brand-dark/50 hover:text-brand-moss transition-colors border border-brand-bark/12 px-4 py-1.5 rounded-full bg-white/60"
          >
            Admin Dashboard
          </a>
        </div>
      </div>
    </footer>
  );
}
