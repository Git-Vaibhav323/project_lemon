import { useEffect, useRef } from "react";

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (options.staggerIndex !== undefined) {
      el.style.setProperty("--stagger-delay", `${options.staggerIndex * 100}ms`);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          if (options.once !== false) observer.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once, options.staggerIndex]);

  return ref;
}
