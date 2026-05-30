export default function StarRating({ count = 5, size = 12 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="#f59e0b"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
