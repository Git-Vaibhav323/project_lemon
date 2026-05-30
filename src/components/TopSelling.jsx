import plant1 from "../assets/plants/1.png";
import plant2 from "../assets/plants/2.png";
import plant3 from "../assets/plants/3.png";
import plant4 from "../assets/plants/4.png";
import plant5 from "../assets/plants/5.png";
import plant6 from "../assets/plants/6.png";
import rect24 from "../assets/plants/Rectangle 24.png";
import SectionTitle from "./ui/SectionTitle";
import CartIcon from "./ui/CartIcon";
import IconButton from "./ui/IconButton";
import useScrollReveal from "../hooks/useScrollReveal";

const plants = [
  { id: 1, name: "Calathea plant", desc: "Stunning foliage with natural air-purifying properties, perfect for bright indirect light", price: "Rs. 359/-", img: plant1 },
  { id: 2, name: "Desk plant", desc: "Compact and low-maintenance, ideal for small spaces and busy lifestyles", price: "Rs. 309/-", img: plant2 },
  { id: 3, name: "Calathea ai plant", desc: "Premium oxygen-producing variety with elegant striped leaves", price: "Rs. 399/-", img: plant3 },
  { id: 4, name: "Cal 874 plant", desc: "Hardy indoor plant that thrives in various lighting conditions", price: "Rs. 259/-", img: plant4 },
  { id: 5, name: "Show plant", desc: "Statement piece with dramatic foliage, perfect for living rooms", price: "Rs. 759/-", img: plant5 },
  { id: 6, name: "Calat O2 plant", desc: "Exceptional air purifier with beautiful variegated leaves", price: "Rs. 659/-", img: plant6 },
];

function PlantCard({ plant }) {
  return (
    <article className="relative flex flex-col h-full min-h-[22rem] group transition-all duration-500 hover:-translate-y-1 overflow-hidden rounded-3xl">
      {/* Mobile: uniform glass card */}
      <div className="sm:hidden absolute inset-0 glass-card rounded-3xl opacity-90" aria-hidden="true" />
      {/* Tablet+ : Rectangle 24 shape */}
      <img
        src={rect24}
        alt=""
        className="hidden sm:block absolute inset-0 w-full h-full object-fill opacity-80 pointer-events-none"
        aria-hidden="true"
      />

      {/* Plant image on top */}
      <div className="relative z-20 flex justify-center items-end pt-2 pb-2 -mt-10 sm:-mt-16 min-h-[9.5rem] sm:min-h-[12.5rem]">
        <img
          src={plant.img}
          alt={plant.name}
          className="w-auto max-w-[85%] sm:max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-lg max-h-[9.5rem] sm:max-h-[18.75rem]"
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col flex-1 px-5 pb-5">
        <h3 className="text-white text-sm sm:text-base font-semibold">{plant.name}</h3>
        <p className="text-white/50 text-xs sm:text-sm mt-1.5 leading-relaxed line-clamp-2 flex-1">{plant.desc}</p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
          <span className="text-white font-bold text-sm sm:text-base">{plant.price}</span>
          <IconButton label={`Add ${plant.name} to cart`} className="w-8 h-8 sm:w-9 sm:h-9 shrink-0">
            <CartIcon size={13} />
          </IconButton>
        </div>
      </div>

    </article>
  );
}
export default function TopSelling() {
  const sectionRef = useScrollReveal();

  return (
    <section id="plants" className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto">
      <div ref={sectionRef} className="reveal">
        <div className="flex justify-center mb-10 sm:mb-12">
          <SectionTitle>Our Top Selling</SectionTitle>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 auto-rows-fr">
          {plants.map((plant, i) => (
            <div key={plant.id} className={`stagger-${Math.min(i + 1, 6)} h-full`}>
              <PlantCard plant={plant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
