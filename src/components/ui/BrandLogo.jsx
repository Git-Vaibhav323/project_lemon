import mainLogo from "../../assets/plants/mainlog.png";

export default function BrandLogo({ size = "nav", className = "" }) {
  const sizes = {
    nav: {
      img: "h-10 sm:h-15 w-auto",
      text: "text-2xl sm:text-3xl",
      gap: "gap-2.5 sm:gap-3",
    },
    lg: {
      img: "h-12 w-auto",
      text: "text-3xl",
      gap: "gap-3",
    },
  };

  const s = sizes[size] || sizes.nav;

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <img
        src={mainLogo}
        alt=""
        className={`${s.img} object-contain drop-shadow-[0_2px_8px_rgba(74,122,69,0.25)]`}
        aria-hidden="true"
      />
      <span className={`text-brand-dark font-bold ${s.text} tracking-tight leading-none whitespace-nowrap`}>
        Planto<span className="text-brand-light">.</span>
      </span>
    </span>
  );
}
