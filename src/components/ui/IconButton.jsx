export default function IconButton({ children, className = "", label, ...props }) {
  return (
    <button
      type="button"
      className={`btn-icon ${className}`}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
}
