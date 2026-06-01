import { useRef, useEffect } from "react";
import gsap from "gsap";

const reviews = [
  {
    id: 1,
    initials: "PM",
    name: "Priya M.",
    plant: "Calathea Medallion",
    text: "honestly the best packaging i've ever seen. soil didn't spill at all and she looks so healthy",
  },
  {
    id: 2,
    initials: "AK",
    name: "Arjun K.",
    plant: "Compact Hosta",
    text: "I usually kill everything I touch lol but this one has actually been surviving on my desk for months",
  },
  {
    id: 3,
    initials: "SR",
    name: "Sneha R.",
    plant: "Snake Plant",
    text: "arrived faster than expected. exactly as pictured.",
  },
  {
    id: 4,
    initials: "RV",
    name: "Rahul V.",
    plant: "Ficus Lyrata",
    text: "it dropped two leaves when it first got here but the care card helped me fix the watering. doing great now!",
  },
  {
    id: 5,
    initials: "MT",
    name: "Meera T.",
    plant: "White Fusion",
    text: "gorgeous plant. my partner thought it was fake because the leaves are so perfect.",
  },
  {
    id: 6,
    initials: "DS",
    name: "Dev S.",
    plant: "Monstera Deliciosa",
    text: "love that they are super upfront about the care level needed. repotted it immediately.",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-brand-moss text-[13px]">★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 w-[300px] mr-5 rounded-2xl p-5 sm:p-[22px]"
      style={{
        background: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(139,111,71,0.1)",
      }}
    >
      <StarRow />
      <p className="text-brand-dark/65 text-sm leading-relaxed mb-3">
        "{review.text}"
      </p>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-brand-moss flex items-center justify-center text-[10px] font-bold text-white shrink-0">
          {review.initials}
        </div>
        <span className="text-brand-dark/75 text-xs">{review.name}</span>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full ml-auto"
          style={{
            background: "rgba(74,122,69,0.1)",
            color: "#4a7a45",
            border: "1px solid rgba(74,122,69,0.15)",
          }}
        >
          {review.plant}
        </span>
      </div>
    </div>
  );
}

export default function GreenhouseVoices() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".ghv-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
      gsap.from(".marquee-container", {
        scrollTrigger: {
          trigger: ".marquee-container",
          start: "top 90%",
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 sm:py-16 lg:py-20 relative z-10 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto mb-3">
        <span className="ghv-header text-brand-moss text-[11px] font-semibold tracking-[2px] uppercase block">
          GREENHOUSE VOICES
        </span>
      </div>
      <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto mb-8 sm:mb-10">
        <h2 className="ghv-header text-brand-dark text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>
          Voices from our greenhouse community.
        </h2>
        <p className="ghv-header text-brand-dark/55 max-w-2xl text-base sm:text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Real words from real plant parents. No scripts, no incentives — just honest experiences from people who brought a little green into their lives.
        </p>
      </div>

      <div className="marquee-container relative overflow-hidden">
        <div className="marquee-track-voices">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
