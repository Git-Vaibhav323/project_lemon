import { useState, useCallback } from "react";
import CartIcon from "./ui/CartIcon";
import useScrollReveal from "../hooks/useScrollReveal";

export default function PlantCard({ plant, onClick, revealDelay = 0, careNote = "", stock }) {
  const [cartPulse, setCartPulse] = useState(false);
  const cardRef = useScrollReveal();

  const handleCartClick = useCallback((e) => {
    e.stopPropagation();
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 300);
  }, []);

  return (
    <article
      ref={cardRef}
      onClick={onClick}
      className="plant-card"
      style={{ "--delay": `${revealDelay}s`, "--fill": stock || "60%" }}
    >
      <div className="card-img-wrap">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-contain"
        />
        {plant.badge && (
          <span className="plant-card-badge">{plant.badge}</span>
        )}
      </div>

      {careNote && <div className="card-care-note">{careNote}</div>}

      <div className="rarity-bar">
        <div className="rarity-fill" />
      </div>

      <div className="plant-card-footer">
        <h3 className="text-brand-dark text-sm sm:text-base font-semibold truncate">{plant.name}</h3>
        <p className="text-brand-dark/50 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2 flex-1">
          Beautiful indoor plant perfect for home and office spaces.
        </p>
        <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 border-t border-white/15">
          <span className="plant-card-price">Rs. {plant.price}/-</span>
          <button
            type="button"
            onClick={handleCartClick}
            className={`plant-card-add-btn ${cartPulse ? "scale-125" : ""}`}
            aria-label={`Add ${plant.name} to cart`}
          >
            <CartIcon size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
