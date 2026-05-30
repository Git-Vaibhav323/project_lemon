import rect7 from "../assets/plants/Rectangle 7.png";
import rect24 from "../assets/plants/Rectangle 24.png";
import calatheaPlant from "../assets/plants/1.png";
import plant1 from "../assets/plants/plant1.png";
import plant2 from "../assets/plants/plant2.png";
import StarRating from "./ui/StarRating";
import CartIcon from "./ui/CartIcon";
import IconButton from "./ui/IconButton";
import useScrollReveal from "../hooks/useScrollReveal";

const trendyPlants = [
  {
    id: 1,
    title: "For Small Desk Ai Plant",
    desc: "Perfect air-purifying companion for your workspace. Compact design with maximum oxygen output for healthier indoor environments.",
    price: "Rs. 599/-",
    img: plant1,
    imgSide: "left",
  },
  {
    id: 2,
    title: "For Fresh Desk Ai Plant",
    desc: "Elegant desktop greenery that naturally filters air pollutants. Low maintenance beauty that thrives in office lighting.",
    price: "Rs. 579/-",
    img: plant2,
    imgSide: "right",
  },
];

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CalatheaCard() {
  return (
    <article className="hero-calathea-card">
      <div className="hero-calathea-card__body">
        <img src={rect24} alt="" className="hero-calathea-card__shape" aria-hidden="true" />

        <div className="hero-calathea-card__visual">
          <img
            src={calatheaPlant}
            alt="Calathea plant in a white pot"
            className="hero-calathea-card__plant"
          />
        </div>

        <div className="hero-calathea-card__content">
          <p className="hero-calathea-card__label">Trendy House Plant</p>
          <h3 className="hero-calathea-card__title">
            Calathea plant
            <ChevronRight />
          </h3>
          <button type="button" className="btn-primary hero-calathea-card__btn">
            Buy Now
          </button>
          <div className="hero-calathea-card__dots" aria-label="Product slides">
            <span className="hero-calathea-card__dot hero-calathea-card__dot--active" aria-current="true" />
            <span className="hero-calathea-card__dot" />
            <span className="hero-calathea-card__dot" />
          </div>
        </div>
      </div>
    </article>
  );
}

function TrendyShowcaseCard({ plant }) {
  const isLeft = plant.imgSide === "left";

  return (
    <article className="relative w-full group">
      {/* Mobile: clean glass card — avoids stretched Rectangle 7 shape */}
      <div className="lg:hidden hero-trendy-card rounded-3xl overflow-hidden px-5 pt-5 pb-6">
        <div className="flex justify-center mb-3">
          <img
            src={plant.img}
            alt={plant.title}
            className="max-h-[150px] sm:max-h-[170px] w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)] group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>
        <div className="text-center">
          <h3 className="text-white font-semibold text-lg leading-snug mb-2">{plant.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-3">{plant.desc}</p>
          <p className="text-white font-bold text-xl mb-5">{plant.price}</p>
          <div className="flex items-center justify-center gap-3">
            <a href="#shop" className="btn-primary inline-flex items-center text-sm px-5 py-2.5">
              Explore
            </a>
            <IconButton label="Add to cart" className="w-9 h-9 rounded-lg">
              <CartIcon size={16} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Desktop: horizontal layout with Rectangle 7 shape */}
      <div className="hidden lg:block relative min-h-[17.5rem] overflow-visible">
        <img
          src={rect7}
          alt=""
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
          aria-hidden="true"
        />
        <div
          className={`absolute z-10 w-[min(42%,17.5rem)] -top-14 ${isLeft ? "left-3" : "right-2"}`}
        >
          <img
            src={plant.img}
            alt={plant.title}
            className="w-full h-auto max-h-[28rem] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
        <div
          className={`relative z-[1] py-8 px-8 flex flex-col ${
            isLeft ? "items-end text-right pl-72" : "items-start text-left pr-72"
          }`}
        >
          <h3 className="text-white font-semibold text-xl leading-snug mb-2">{plant.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-3">{plant.desc}</p>
          <p className="text-white font-bold text-xl mb-5">{plant.price}</p>
          <div className={`flex items-center gap-3 ${isLeft ? "justify-end" : ""}`}>
            <a href="#shop" className="btn-primary inline-flex items-center text-sm px-5 py-2.5">
              Explore
            </a>
            <IconButton label="Add to cart" className="w-9 h-9 rounded-lg">
              <CartIcon size={16} />
            </IconButton>
          </div>
        </div>
      </div>
    </article>
  );
}
export default function Hero() {
  const heroReveal = useScrollReveal();

  return (
    <section id="home" className="relative w-full" style={{ background: "transparent" }}>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div ref={heroReveal} className="reveal w-full min-w-0">

          {/* Hero top */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-6 w-full min-w-0">
            <div className="w-full lg:flex-1 lg:max-w-[580px] min-w-0">

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight mb-4 break-words">
  Breath Natural
</h1>

              <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-6 max-w-full sm:max-w-[420px]">
                Transform your space with nature's finest air purifiers. Our curated collection brings wellness and beauty to every corner of your home.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7">
                <a href="#shop" className="btn-primary inline-flex items-center text-sm px-5 sm:px-6 py-2.5">
                  Explore
                </a>
                <a
                  href="#shop"
                  className="flex items-center gap-2 text-white/65 text-sm hover:text-white transition-colors duration-300 group"
                >
                  <span className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center group-hover:border-white/45 group-hover:bg-white/5 transition-all duration-300 shrink-0">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
                      <path d="M0 0l10 6-10 6V0z" />
                    </svg>
                  </span>
                  Live Demo...
                </a>
              </div>

              <div className="hero-review-card rounded-2xl p-4 w-full max-w-[320px]">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xs font-bold shrink-0"
                    aria-hidden="true"
                  >
                    AP
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-semibold">Alina Patel</p>
                    <div className="my-1">
                      <StarRating count={5} size={11} />
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                      Premium indoor plants perfect for modern living spaces and offices.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[17.5rem] lg:shrink-0 flex justify-center lg:justify-end min-w-0">
              <CalatheaCard />
            </div>
          </div>

          <h2 className="text-center text-white font-semibold text-base sm:text-lg tracking-wide mt-16 sm:mt-20 mb-16 sm:mb-20 px-2">
            Our Trendy plants
          </h2>

          {/* Cards stacked vertically */}
          <div className="flex flex-col gap-8 sm:gap-12 lg:gap-24 w-full max-w-3xl mx-auto">
            {trendyPlants.map((plant) => (
              <TrendyShowcaseCard key={plant.id} plant={plant} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}