import { useState, useRef, useCallback } from "react";
import CartIcon from "./ui/CartIcon";
import useScrollReveal from "../hooks/useScrollReveal";

export default function PlantCard({ plant, index, onClick }) {
  const [cartPulse, setCartPulse] = useState(false);
  const tiltRef = useRef(null);
  const cardRef = useScrollReveal({ staggerIndex: index, threshold: 0.08, rootMargin: "0px 0px -20px 0px" });

  const handleCartClick = (e) => {
    e.stopPropagation();
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 300);
  };

  const handleTilt = useCallback((e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    el.style.setProperty("--rx", `${((y - cy) / cy) * -6}deg`);
    el.style.setProperty("--ry", `${((x - cx) / cx) * 6}deg`);
    el.style.setProperty("--sx", `${x}px`);
    el.style.setProperty("--sy", `${y}px`);
  }, []);

  const handleTiltLeave = useCallback((e) => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <article
      ref={(node) => {
        cardRef.current = node;
        tiltRef.current = node;
      }}
      onClick={onClick}
      onMouseMove={handleTilt}
      onMouseLeave={handleTiltLeave}
      className="shop-card-entry card-tilt group cursor-pointer rounded-3xl bg-brand-card border border-white/[0.06] overflow-hidden flex flex-col"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), rgba(139,195,74,0.15) 0%, transparent 60%)",
        }}
      />

      <div 
        className="relative flex justify-center items-end pt-2 pb-2 -mt-8 sm:-mt-12 min-h-[9.5rem] sm:min-h-[12.5rem] overflow-hidden"
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        <div className="plant-float" style={{ transformStyle: "preserve-3d" }}>
          <img
            src={plant.image}
            alt={plant.name}
            className="w-auto max-w-[85%] sm:max-w-full object-contain transition-all duration-500 drop-shadow-lg max-h-[9.5rem] sm:max-h-[18.75rem] group-hover:scale-110"
            style={{ transform: "translateZ(40px)" }}
          />
        </div>
        {plant.badge && (
          <span 
            className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-brand-green text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg z-10"
            style={{ transform: "translateZ(20px)" }}
          >
            {plant.badge}
          </span>
        )}
      </div>

      {/* Bottom glow line on hover */}
      <div className="absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-brand-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      <div 
        className="relative flex flex-col flex-1 px-4 sm:px-5 pb-4 sm:pb-5 pt-1"
        style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
      >
        <h3 className="text-white text-sm sm:text-base font-semibold truncate">{plant.name}</h3>
        <p className="text-white/50 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2 flex-1">
          Beautiful indoor plant perfect for home and office spaces.
        </p>
        <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 border-t border-white/[0.06]">
          <span className="text-white font-bold text-sm sm:text-base">Rs. {plant.price}/-</span>
          <button
            type="button"
            onClick={handleCartClick}
            className={`cart-btn w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl border border-white/15 text-white/80 hover:bg-white/10 hover:border-white/25 transition-all duration-300 ${
              cartPulse ? "scale-125" : ""
            }`}
            aria-label={`Add ${plant.name} to cart`}
            style={{ transform: "translateZ(15px)" }}
          >
            <CartIcon size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
