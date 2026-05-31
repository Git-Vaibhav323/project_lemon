import { useEffect, useRef, useState } from "react";
import plant1 from "../assets/plants/1.png";
import plant2 from "../assets/plants/2.png";
import plant3 from "../assets/plants/3.png";
import plant4 from "../assets/plants/4.png";
import plant5 from "../assets/plants/5.png";
import plant6 from "../assets/plants/6.png";

const plants = [
  {
    id: 1,
    category: "RARE FOLIAGE",
    name: "Calathea Medallion",
    editorial: "A living canvas of emerald patterns, at home in filtered light.",
    specs: [
      { label: "Light", value: "Indirect" },
      { label: "Watering", value: "Twice weekly" },
      { label: "Temp", value: "18 – 26°C" },
      { label: "Air", value: "Humidity boost" },
    ],
    price: "Rs. 359 /-",
    img: plant1,
  },
  {
    id: 2,
    category: "DESK ESSENTIAL",
    name: "Compact Hosta",
    editorial: "Quiet, resilient, and perfectly scaled for the spaces where you think.",
    specs: [
      { label: "Light", value: "Low – Med" },
      { label: "Watering", value: "Once weekly" },
      { label: "Temp", value: "15 – 28°C" },
      { label: "Air", value: "CO₂ reduction" },
    ],
    price: "Rs. 309 /-",
    img: plant2,
  },
  {
    id: 3,
    category: "OXYGEN SERIES",
    name: "Snake Plant Zeylanica",
    editorial: "Architectural lines, effortless care — oxygen delivered around the clock.",
    specs: [
      { label: "Light", value: "Any light" },
      { label: "Watering", value: "Fortnightly" },
      { label: "Temp", value: "16 – 27°C" },
      { label: "Air", value: "Oxygen rich" },
    ],
    price: "Rs. 399 /-",
    img: plant3,
  },
  {
    id: 4,
    category: "STATEMENT LEAF",
    name: "Monstera Deliciosa",
    editorial: "Bold fenestrated leaves that command attention in any room.",
    specs: [
      { label: "Light", value: "Bright indirect" },
      { label: "Watering", value: "Weekly" },
      { label: "Temp", value: "18 – 29°C" },
      { label: "Air", value: "Air purifying" },
    ],
    price: "Rs. 599 /-",
    img: plant4,
  },
  {
    id: 5,
    category: "BLOOM FRIENDLY",
    name: "Peace Lily",
    editorial: "Elegant white blooms and lush green foliage — a natural air purifier.",
    specs: [
      { label: "Light", value: "Low – Med" },
      { label: "Watering", value: "Twice weekly" },
      { label: "Temp", value: "18 – 27°C" },
      { label: "Air", value: "Toxin removal" },
    ],
    price: "Rs. 449 /-",
    img: plant5,
  },
  {
    id: 6,
    category: "TROPICAL SHOW",
    name: "Bird of Paradise",
    editorial: "Majestic leaves that evoke tropical warmth and natural grandeur.",
    specs: [
      { label: "Light", value: "Bright direct" },
      { label: "Watering", value: "Weekly" },
      { label: "Temp", value: "18 – 28°C" },
      { label: "Air", value: "Humidity lover" },
    ],
    price: "Rs. 749 /-",
    img: plant6,
  },
];

function PlantCard({ plant, index, visible, isHidden }) {
  const cardRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25, rootMargin: "-60px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const isEven = index % 2 !== 0;

  return (
    <div
      ref={cardRef}
      className={`w-full transition-all duration-700 ${isHidden ? "plant-hidden" : "plant-visible"}`}
      style={{
        opacity: entered ? 1 : 0,
        transform: entered
          ? "translateX(0)"
          : `translateX(${isEven ? "90px" : "-90px"})`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        className={`group flex flex-col sm:flex-row w-full overflow-hidden rounded-3xl border border-white/[0.07] transition-all duration-300 ${entered ? "sm:h-[280px]" : ""}`}
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          boxShadow: entered ? "none" : "0 8px 30px rgba(0,0,0,0.35)",
          flexDirection: isEven ? "row-reverse" : "row",
        }}
      >
        <div
          className={`relative flex items-center justify-center overflow-hidden ${entered ? "sm:w-[40%] sm:h-full" : "w-full h-[160px] sm:h-[160px]"} transition-all duration-700`}
          style={{
            background: "radial-gradient(ellipse at center, rgba(20,50,30,0.6) 0%, rgba(10,25,15,0.8) 100%)",
          }}
        >
          <img
            src={plant.img}
            alt={plant.name}
            className="h-full w-auto max-h-full object-contain transition-transform duration-350 group-hover:scale-[1.03]"
            style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.5))" }}
          />
        </div>

        <div
          className={`flex flex-col justify-between p-5 sm:p-6 ${entered ? "sm:w-[60%]" : "w-full"} transition-all duration-700`}
        >
          <span className="text-[#9db59a] text-[11px] font-semibold tracking-[2px] uppercase opacity-75">
            {plant.category}
          </span>
          <h3 className="text-white text-[26px] font-bold leading-tight mt-1">{plant.name}</h3>
          <p className="italic text-sm text-white/50 mt-1 leading-snug">{plant.editorial}</p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 max-w-[320px]">
            {plant.specs.map((spec) => (
              <div key={spec.label}>
                <div className="text-[10px] tracking-[1px] uppercase text-white/35 mb-[3px]">{spec.label}</div>
                <div className="text-[15px] font-semibold text-white">{spec.value}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-3">
            <span className="text-[#9db59a] text-[22px] font-bold">{plant.price}</span>
            <div className="relative card-tooltip-group">
              <button
                type="button"
                onClick={() => { window.location.hash = "#shop"; }}
                className="px-[22px] py-[10px] rounded-full text-[13px] font-semibold transition-all duration-300 bg-[#9db59a] text-[#0b1d0d] hover:bg-[#9db59a]/90"
              >
                Add to Collection
              </button>
              <span className="card-tooltip">Add to cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopSelling() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

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
      { threshold: 0.25, rootMargin: "-60px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visiblePlants = showAll ? plants : plants.slice(0, 3);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto relative z-10"
    >
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 tracking-tight">
        Our Top Selling
      </h2>

      <div className="flex flex-col gap-6 sm:gap-8">
        {visiblePlants.map((plant, i) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            index={i}
            visible={visible}
            isHidden={!showAll && i >= 3}
          />
        ))}
      </div>

      {plants.length > 3 && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
            style={{ color: "#9db59a", border: "1px solid rgba(61,255,160,0.3)" }}
          >
            {showAll ? "Show Less" : "Explore More Plants"}
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" aria-hidden="true"
              className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
