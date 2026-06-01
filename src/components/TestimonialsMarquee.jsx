const reviews = [
  {
    id: 1,
    initials: "SK",
    name: "Sarah Kapoor",
    plant: "Calathea Plant",
    text: "My Calathea arrived perfectly and is thriving! The care guide made it so easy to keep it happy.",
  },
  {
    id: 2,
    initials: "RJ",
    name: "Rohan Joshi",
    plant: "Desk Plant",
    text: "Perfect desk companion. Low maintenance and my office feels fresher already.",
  },
  {
    id: 3,
    initials: "AP",
    name: "Ananya Patel",
    plant: "Calathea AI",
    text: "The air quality in my apartment has noticeably improved. Love this plant!",
  },
  {
    id: 4,
    initials: "MK",
    name: "Maya Khanna",
    plant: "Show Plant",
    text: "Absolute showstopper! Gets compliments from everyone who visits. Worth every penny.",
  },
  {
    id: 5,
    initials: "AS",
    name: "Arjun Singh",
    plant: "Cal 874",
    text: "Super hardy plant that survived my forgetfulness. Perfect for beginners like me.",
  },
  {
    id: 6,
    initials: "NL",
    name: "Neha Lal",
    plant: "Calat O2",
    text: "The variegated leaves are stunning. Best air purifier I've ever owned, and so beautiful.",
  },
];

function StarRatingTeal() {
  return (
    <div className="flex gap-0.5 mb-2">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#4a7a45" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="glass p-5 sm:p-6 w-[260px] sm:w-[300px] flex-shrink-0">
      <StarRatingTeal />
      <p className="text-brand-dark/65 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3">
        "{review.text}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brand-moss flex items-center justify-center text-xs font-bold text-white shrink-0">
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="text-brand-dark text-xs font-semibold">{review.name}</p>
          <p className="text-brand-moss/60 text-[10px]">{review.plant}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 relative z-10 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-brand-dark text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Loved by Plant Parents
        </h2>
      </div>

      <div className="marquee-container relative overflow-hidden">
        <div className="marquee-track">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
