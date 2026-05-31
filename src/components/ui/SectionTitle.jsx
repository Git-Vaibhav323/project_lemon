export default function SectionTitle({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
      <span className="section-bracket hidden sm:inline text-xl sm:text-2xl text-[#9db59a]" aria-hidden="true">
        ⌜
      </span>
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-center">
        {children}
      </h2>
      <span className="section-bracket hidden sm:inline text-xl sm:text-2xl text-[#9db59a]" aria-hidden="true">
        ⌟
      </span>
    </div>
  );
}
