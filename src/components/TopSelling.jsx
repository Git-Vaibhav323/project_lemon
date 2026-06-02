import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
    stock: "60%",
    careNote: "Bright indirect light. Water twice weekly.",
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
    stock: "42%",
    careNote: "Low light tolerant. Water once weekly.",
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
    stock: "78%",
    careNote: "Thrives in any light. Water fortnightly.",
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
    stock: "15%",
    careNote: "Bright indirect light. Water weekly.",
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
    stock: "8%",
    careNote: "Low to medium light. Keep soil moist.",
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
    stock: "0%",
    careNote: "Bright direct light. Water weekly.",
  },
];

function PlantCard({ plant, index, visible, isHidden, revealDelay = 0, stock, careNote }) {
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
        transitionDelay: `${revealDelay}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        className={`group flex flex-col sm:flex-row w-full overflow-hidden rounded-3xl border border-white/[0.07] transition-all duration-300 ${entered ? "sm:h-[280px]" : ""}`}
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: entered ? "none" : "0 8px 30px rgba(74,122,69,0.1)",
          flexDirection: isEven ? "row-reverse" : "row",
        }}
      >
        <div
          className={`relative flex items-center justify-center overflow-hidden ${entered ? "sm:w-[40%] sm:h-full" : "w-full h-[160px] sm:h-[160px]"} transition-all duration-700`}
          style={{
            background: "radial-gradient(ellipse at center, rgba(212,232,194,0.5) 0%, rgba(250,247,242,0.9) 100%)",
          }}
        >
          <img
            src={plant.img}
            alt={plant.name}
            className="h-full w-auto max-h-full object-contain transition-transform duration-350 group-hover:scale-[1.03]"
            style={{ filter: "drop-shadow(0 12px 24px rgba(74,122,69,0.15))" }}
          />
          {stock !== undefined && (
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px]"
              style={{ background: "rgba(0,0,0,0.08)" }}
            >
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{
                  width: entered ? stock : "0%",
                  background: "linear-gradient(90deg, #8fa896, #b8ffb8)",
                }}
              />
            </div>
          )}
        </div>

        <div
          className={`flex flex-col justify-between p-5 sm:p-6 ${entered ? "sm:w-[60%]" : "w-full"} transition-all duration-700`}
        >
          <span className="text-brand-moss text-[11px] font-semibold tracking-[2px] uppercase opacity-75">
            {plant.category}
          </span>
          <h3 className="text-brand-dark text-[26px] font-bold leading-tight mt-1">{plant.name}</h3>
          <p className="italic text-sm text-brand-dark/50 mt-1 leading-snug">{plant.editorial}</p>

          {careNote && (
            <p className="text-xs text-brand-moss/70 mt-1 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {careNote}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 max-w-[320px]">
            {plant.specs.map((spec) => (
              <div key={spec.label}>
                <div className="text-[10px] tracking-[1px] uppercase text-brand-dark/35 mb-[3px]">{spec.label}</div>
                <div className="text-[15px] font-semibold text-brand-dark">{spec.value}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-3">
            <span className="text-brand-moss text-[22px] font-bold">{plant.price}</span>
            <div className="relative card-tooltip-group">
              <button
                type="button"
                onClick={() => { window.location.hash = "#shop"; }}
                className="px-[22px] py-[10px] rounded-full text-[13px] font-semibold transition-all duration-300 bg-brand-moss text-white hover:bg-brand-moss/90"
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
      { threshold: 0.1, rootMargin: "-60px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".top-selling-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".top-selling-btn", {
        scrollTrigger: {
          trigger: ".top-selling-btn-container",
          start: "top 90%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const visiblePlants = showAll ? plants : plants.slice(0, 3);

  return (
    <section
      id="collection"
      className="relative z-10 overflow-hidden"
      style={{ backgroundColor: "#f5f2eb" }}
    >
      <div
        ref={sectionRef}
        className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto"
      >
      <h2 className="top-selling-header text-brand-dark text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 tracking-tight">
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
            revealDelay={i * 0.1}
            stock={plant.stock}
            careNote={plant.careNote}
          />
        ))}
      </div>

      {plants.length > 3 && (
        <div className="top-selling-btn-container flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="top-selling-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-brand-sand"
            style={{ color: "#4a7a45", border: "1px solid rgba(74,122,69,0.3)" }}
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
      </div>
    </section>
  );
}
