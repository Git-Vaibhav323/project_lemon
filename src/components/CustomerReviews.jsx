import { useRef, useEffect } from "react";
import gsap from "gsap";
import SectionTitle from "./ui/SectionTitle";
import StarRating from "./ui/StarRating";
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
            style={{ background: review.avatarColor || "#9db59a", color: "#000" }}
            aria-hidden="true"
          >
            {review.initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm sm:text-base font-semibold">{review.name}</p>
            <StarRating count={review.rating || 5} size={12} />
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
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".cr-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".cr-card", {
        scrollTrigger: {
          trigger: ".cr-grid",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto">
      <div>
        <div className="cr-header flex justify-center mb-10 sm:mb-12">
          <SectionTitle>What Our Plant Parents Say</SectionTitle>
        </div>

        <div className="cr-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="cr-card h-full">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
