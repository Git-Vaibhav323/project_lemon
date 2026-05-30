import { useEffect } from "react";

export default function useCustomCursor() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const style = document.createElement("style");
    style.textContent = "*{cursor:none!important}";
    document.head.appendChild(style);

    const ring = document.createElement("div");
    ring.id = "cursor-ring";
    Object.assign(ring.style, {
      position: "fixed",
      width: "36px",
      height: "36px",
      border: "1.5px solid rgba(61,255,160,0.55)",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "9999",
      transform: "translate(-50%,-50%)",
      transition: "width .2s, height .2s, background .2s",
    });

    const dot = document.createElement("div");
    dot.id = "cursor-dot";
    Object.assign(dot.style, {
      position: "fixed",
      width: "6px",
      height: "6px",
      background: "#3dffa0",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "10000",
      transform: "translate(-50%,-50%)",
    });

    document.body.append(ring, dot);

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMouse = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMouse);
    dot.style.left = mx + "px";
    dot.style.top = my + "px";

    let rafId;
    function lerp() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      rafId = requestAnimationFrame(lerp);
    }
    rafId = requestAnimationFrame(lerp);

    const enlarge = () => {
      ring.style.width = "54px";
      ring.style.height = "54px";
      ring.style.background = "rgba(61,255,160,0.07)";
    };
    const shrink = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.background = "transparent";
    };

    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", enlarge);
      el.addEventListener("mouseleave", shrink);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", enlarge);
        el.removeEventListener("mouseleave", shrink);
        el.addEventListener("mouseenter", enlarge);
        el.addEventListener("mouseleave", shrink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouse);
      style.remove();
      ring.remove();
      dot.remove();
      observer.disconnect();
    };
  }, []);
}
