export default function SectionTitle({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
      <span className="section-bracket hidden sm:inline" aria-hidden="true">
        ⌜
      </span>
      <h2 className="text-white text-lg sm:text-xl font-semibold tracking-wide text-center whitespace-nowrap">
        {children}
      </h2>
      <span className="section-bracket hidden sm:inline" aria-hidden="true">
        ⌟
      </span>
    </div>
  );
}
