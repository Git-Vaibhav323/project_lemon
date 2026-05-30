import SectionTitle from "./ui/SectionTitle";
import StarRating from "./ui/StarRating";
import useScrollReveal from "../hooks/useScrollReveal";
import rect8 from "../assets/plants/Rectangle 8.png";


const reviews = [
  {
    id: 1,
    name: "Maxn Raval",
    initials: "MR",
    color: "from-amber-500 to-orange-600",
    text: "Absolutely love my new plants! The quality is exceptional and they arrived in perfect condition. The air quality in my home has noticeably improved. Highly recommend Planto for anyone looking to bring nature indoors.",
  },
  {
    id: 2,
    name: "venely k",
    initials: "VK",
    color: "from-purple-500 to-pink-600",
    text: "Best plant shopping experience ever! The team helped me choose the perfect plants for my office space. They're thriving beautifully and my colleagues constantly compliment them. Professional service and healthy plants.",
  },
  {
    id: 3,
    name: "Lil thakur",
    initials: "LT",
    color: "from-blue-500 to-cyan-600",
    text: "I'm a plant beginner and Planto made it so easy! Clear care instructions and responsive customer support. My apartment feels like a jungle now and I couldn't be happier. Will definitely order more plants soon!",
  },
];

function ReviewCard({ review }) {
  return (
    <article className="relative flex flex-col h-full group transition-all duration-500 hover:-translate-y-1">
      
      {/* Rectangle 8 as the card shape */}
      <img
        src={rect8}
        alt=""
        className="absolute inset-0 w-full h-full object-fill"
        style={{ opacity: "0.8" }}
        aria-hidden="true"
      />

      {/* Content on top */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-7">
        
        {/* Avatar + Name + Stars */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0"
            style={{ background: review.avatarColor }}
            aria-hidden="true"
          >
            {review.initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm sm:text-base font-semibold">{review.name}</p>
            <StarRating count={review.rating} size={12} />
          </div>
        </div>

        {/* Review text */}
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed flex-1">
          {review.text}
        </p>
      </div>

    </article>
  );
}

export default function CustomerReviews() {
  const sectionRef = useScrollReveal();

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto">
      <div ref={sectionRef} className="reveal">
        <div className="flex justify-center mb-10 sm:mb-12">
          <SectionTitle>Customer Review</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {reviews.map((review, i) => (
            <div key={review.id} className={`stagger-${i + 1} h-full`}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
