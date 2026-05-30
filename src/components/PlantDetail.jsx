import { useState, useEffect } from "react";

const plantDetails = {
  1: {
    description: "The Calathea plant is prized for its strikingly patterned foliage. Originating from the tropical Americas, it thrives in low to medium indirect light and makes a stunning addition to any indoor garden.",
    light: "Low to medium indirect",
    water: "Keep soil consistently moist",
    humidity: "High — mist regularly",
  },
  2: {
    description: "A compact and resilient companion for your desk or workspace. This plant purifies the air while adding a refreshing touch of green to your daily environment with minimal upkeep required.",
    light: "Medium indirect",
    water: "Once a week",
    humidity: "Medium",
  },
  3: {
    description: "Renowned for its exceptional air-purifying qualities, the Calathea AI plant filters toxins and improves indoor air quality. Its broad, lush leaves create a calming atmosphere in any room.",
    light: "Low to medium",
    water: "Keep soil moist, not soggy",
    humidity: "High",
  },
  4: {
    description: "A low-maintenance desert beauty that thrives on neglect. The cactus is perfect for beginners and adds a sculptural, modern accent to shelves, desks, or sunny windowsills.",
    light: "Bright direct",
    water: "Every 2–3 weeks (let soil dry)",
    humidity: "Low",
  },
  5: {
    description: "The Monstera is an iconic tropical plant with distinctive split leaves. It grows vigorously in bright indirect light and becomes the centerpiece of any plant collection.",
    light: "Bright indirect",
    water: "Weekly, let top soil dry",
    humidity: "Medium to high",
  },
  6: {
    description: "The Areca Palm brings a tropical vibe to any space with its feathery, arching fronds. It is an excellent natural humidifier and air purifier, perfect for bright rooms.",
    light: "Bright indirect",
    water: "Twice a week in summer, reduce in winter",
    humidity: "Medium to high",
  },
  101: {
    description: "A living masterpiece featuring rare sectoral variegation. Each leaf is a unique canvas of pristine white and deep emerald green. Exceptionally scarce — grown from select genetic lineage in our private greenhouse.",
    light: "Bright indirect",
    water: "Weekly, allow top 2\" to dry",
    humidity: "High — 60%+",
  },
  102: {
    description: "The architectural Fiddle Leaf Fig is a statement of sophisticated minimalism. Its large, violin-shaped leaves command space and bring structural elegance to any interior design scheme.",
    light: "Bright indirect",
    water: "Once a week",
    humidity: "Medium",
  },
  103: {
    description: "The Calathea Orbifolia captivates with large, round leaves adorned with silver-green stripes. Its striking patterns shimmer under atmospheric lighting — a living sculpture for the discerning collector.",
    light: "Low to medium indirect",
    water: "Keep evenly moist",
    humidity: "High — mist regularly",
  },
  104: {
    description: "The Sansevieria Zeylanica is a sleek, architectural specimen with vertical sword-like leaves edged in yellow. Near indestructible and an exceptional air purifier — perfect for low-light environments.",
    light: "Low to bright indirect",
    water: "Every 2–4 weeks",
    humidity: "Low to medium",
  },
  105: {
    description: "The Philodendron Gloriosum enchants with heart-shaped velvety leaves traced by striking white veins. A terrestrial crawler from Colombian rainforests — rare, coveted, and breathtaking.",
    light: "Medium indirect",
    water: "Weekly when top inch is dry",
    humidity: "High",
  },
};

function CareIcon({ type }) {
  if (type === "light") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    );
  }
  if (type === "water") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    );
  }
  if (type === "humidity") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 2v10h10" />
      </svg>
    );
  }
  return null;
}

export default function PlantDetail({ plant, onClose }) {
  const [imgError, setImgError] = useState(false);
  const details = plantDetails[plant.id] || plantDetails[1];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const priceDisplay = plant.priceDisplay || `Rs. ${plant.price}/-`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-stretch sm:items-center justify-end sm:justify-center"
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />

      <div
        className="relative w-full sm:max-w-2xl sm:mx-4 h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl overflow-y-auto animate-slide-in-right"
        style={{
          background: "rgba(20,34,30,0.97)",
          border: "1px solid rgba(78,222,163,0.15)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(78,222,163,0.05)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
          style={{
            color: "#bbcabf",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          aria-label="Close details"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row">
          <div
            className="sm:w-1/2 flex items-center justify-center p-8 sm:rounded-l-2xl"
            style={{ background: "rgba(8,22,18,0.8)" }}
          >
            {plant.imageUrl ? (
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full max-w-[240px] object-contain"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}
              />
            ) : imgError ? (
              <span className="text-6xl">🌿</span>
            ) : (
              <img
                src={plant.image}
                alt={plant.name}
                onError={() => setImgError(true)}
                className="w-full max-w-[220px] sm:max-w-none object-contain"
                style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.6))" }}
              />
            )}
          </div>

          <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col gap-5">
            <div>
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 mb-3"
                style={{
                  color: "#4edea3",
                  background: "rgba(78,222,163,0.1)",
                  border: "1px solid rgba(78,222,163,0.2)",
                }}
              >
                {plant.category || plant.badge || "SPECIMEN"}
              </span>
              <h2
                className="text-xl font-bold leading-tight"
                style={{ color: "#d5e6df", fontFamily: "Geist, sans-serif" }}
              >
                {plant.name}
              </h2>
            </div>

            <p className="text-2xl font-bold" style={{ color: "#4edea3", fontFamily: "Geist, sans-serif" }}>
              {priceDisplay}
            </p>

            <p className="text-sm leading-relaxed" style={{ color: "#bbcabf" }}>
              {details.description}
            </p>

            <div
              className="grid grid-cols-3 gap-3 pt-4"
              style={{ borderTop: "1px solid rgba(78,222,163,0.1)" }}
            >
              {[
                { type: "light", label: "Light", value: details.light },
                { type: "water", label: "Water", value: details.water },
                { type: "humidity", label: "Humidity", value: details.humidity },
              ].map(({ type, label, value }) => (
                <div key={type} className="flex flex-col items-center gap-2 text-center">
                  <div style={{ color: "#4edea3", opacity: 0.8 }}>
                    <CareIcon type={type} />
                  </div>
                  <span
                    className="text-xs font-medium tracking-widest uppercase"
                    style={{ color: "#bbcabf" }}
                  >
                    {label}
                  </span>
                  <span className="text-xs leading-tight" style={{ color: "#d5e6df" }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-auto w-full font-bold py-4 text-sm transition-all duration-300 active:scale-[0.98]"
              style={{
                background: "#4edea3",
                color: "#003824",
                boxShadow: "0 0 24px rgba(78,222,163,0.3)",
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
