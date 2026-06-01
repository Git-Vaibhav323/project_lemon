import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

const LEAF_COLORS = [
  "rgba(74,122,69,VAL)",
  "rgba(100,140,70,VAL)",
  "rgba(139,111,71,VAL)",
  "rgba(60,100,55,VAL)",
  "rgba(80,130,65,VAL)",
];

function createBunch(index, total, edgeBias) {
  const edge =
    edgeBias === "left"
      ? -1
      : edgeBias === "right"
        ? 1
        : index % 2 === 0
          ? -1
          : 1;
  const side = edge > 0 ? "right" : "left";
  const angleBase = (Math.random() - 0.5) * 0.6;
  const leaves = [];
  const leafCount = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < leafCount; i++) {
    const len = 30 + Math.random() * 60;
    const width = 6 + Math.random() * 14;
    const angle = angleBase + (i - (leafCount - 1) / 2) * 0.25;
    const speed = 0.3 + Math.random() * 0.5;
    const phase = Math.random() * Math.PI * 2;
    const amp = 0.08 + Math.random() * 0.12;
    const yOff = (i - (leafCount - 1) / 2) * 18;
    const colorIdx = Math.floor(Math.random() * LEAF_COLORS.length);
    leaves.push({ len, width, angle, speed, phase, amp, yOff, colorIdx });
  }
  return {
    side,
    edge,
    x: edge === -1 ? -10 - Math.random() * 20 : 110 + Math.random() * 20,
    y: Math.random() * 120,
    angleBase,
    swayAmp: 0.1 + Math.random() * 0.15,
    swaySpeed: 0.15 + Math.random() * 0.25,
    swayPhase: Math.random() * Math.PI * 2,
    leaves,
    alpha: 0.3 + Math.random() * 0.4,
  };
}

const WindyLeaves = forwardRef(function WindyLeaves(
  { leafCount = 14, opacity = 1, edgeBias = "both", scrollEffect = true },
  ref
) {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const bunchesRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef(null);

  useImperativeHandle(ref, () => ({
    get scrollRef() {
      return scrollRef;
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bunches = Array.from({ length: leafCount }, (_, i) =>
      createBunch(i, leafCount, edgeBias)
    );
    bunchesRef.current = bunches;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      sizeRef.current = { w, h };
    }
    resize();
    window.addEventListener("resize", resize);

    function drawLeaf(ctx, x, y, len, width, angle, alpha, scrollTilt) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + scrollTilt);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(len * 0.3, -width, len * 0.7, -width * 0.6, len, 0);
      ctx.bezierCurveTo(len * 0.7, width * 0.6, len * 0.3, width, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function draw(t) {
      const { w, h } = sizeRef.current;
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);

      const scrollTilt = scrollEffect ? scrollRef.current * 0.4 : 0;

      for (const bunch of bunches) {
        const bunchAlpha = bunch.alpha * opacity;
        const sway =
          Math.sin(t * bunch.swaySpeed + bunch.swayPhase) * bunch.swayAmp;
        const bx = (bunch.x / 100) * w;
        const by = (bunch.y / 100) * h;

        for (const leaf of bunch.leaves) {
          const leafSway =
            Math.sin(t * leaf.speed + leaf.phase) * leaf.amp;
          const angle = bunch.angleBase + leaf.angle + sway + leafSway;
          const baseAlpha = LEAF_COLORS[leaf.colorIdx].includes("rgba")
            ? bunchAlpha
            : 1;
          const fillColor = LEAF_COLORS[leaf.colorIdx].replace(
            "VAL",
            String(Math.round(baseAlpha * 255))
          );
          ctx.fillStyle = fillColor;
          const leafX = bx;
          const leafY = by + leaf.yOff;
          drawLeaf(ctx, leafX, leafY, leaf.len, leaf.width, angle, baseAlpha, scrollTilt);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [leafCount, opacity, edgeBias, scrollEffect]);

  useEffect(() => {
    if (!scrollEffect) return;
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollEffect]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
});

export default WindyLeaves;
