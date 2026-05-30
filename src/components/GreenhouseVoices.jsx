const reviews = [
  {
    id: 1,
    initials: "PM",
    name: "Priya M.",
    plant: "Calathea Medallion",
    text: "Arrived wrapped in paper, smelled like a forest. The Calathea opened up in three days.",
  },
  {
    id: 2,
    initials: "AK",
    name: "Arjun K.",
    plant: "Compact Hosta",
    text: "I've killed every plant I've ever owned. This one's been on my desk for 4 months.",
  },
  {
    id: 3,
    initials: "SR",
    name: "Sneha R.",
    plant: "Snake Plant",
    text: "The packaging was as thoughtful as the plant. That's rare.",
  },
  {
    id: 4,
    initials: "RV",
    name: "Rahul V.",
    plant: "Desk Plant",
    text: "I ordered one. I came back for two more. That says enough.",
  },
  {
    id: 5,
    initials: "MT",
    name: "Meera T.",
    plant: "Calathea AI",
    text: "Grew an inch in the first week. My partner thought I was lying.",
  },
  {
    id: 6,
    initials: "DS",
    name: "Dev S.",
    plant: "Monstera Deliciosa",
    text: "Finally a plant shop that tells you the truth about maintenance.",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-[#3dffa0] text-[13px]">★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 w-[300px] mr-5 rounded-2xl p-5 sm:p-[22px]"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <StarRow />
      <p className="text-white/70 text-sm leading-relaxed mb-3">
        "{review.text}"
      </p>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#3dffa0] flex items-center justify-center text-[10px] font-bold text-[#0b1d0d] shrink-0">
          {review.initials}
        </div>
        <span className="text-white/80 text-xs">{review.name}</span>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full ml-auto"
          style={{
            background: "rgba(61,255,160,0.1)",
            color: "#3dffa0",
            border: "1px solid rgba(61,255,160,0.15)",
          }}
        >
          {review.plant}
        </span>
      </div>
    </div>
  );
}

export default function GreenhouseVoices() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 relative z-10 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto mb-3">
        <span className="text-[#3dffa0] text-[11px] font-semibold tracking-[2px] uppercase">
          GREENHOUSE VOICES
        </span>
      </div>
      <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
          From the people who keep them alive.
        </h2>
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
