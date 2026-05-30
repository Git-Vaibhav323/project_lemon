import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";
import PlantDetail from "../components/PlantDetail";
import CartModal from "../components/CartModal";
import AiScanner from "../components/AiScanner";
import mainLogo from "../assets/plants/mainlog.png";
import img1 from "../assets/plants/1.png";
import img2 from "../assets/plants/2.png";
import img3 from "../assets/plants/3.png";
import img4 from "../assets/plants/4.png";
import img5 from "../assets/plants/5.png";
import img6 from "../assets/plants/6.png";

// ─── Local Images ─────────────────────────────────────────────────────────────
import imgVariegated from "../assets/plants/variegated_monstera.png";
import imgFicus from "../assets/plants/ficus_lyrata.png";
import imgCalatheaO from "../assets/plants/calathea_orbifolia.png";
import imgSansevieria from "../assets/plants/sansevieria_zeylanica.png";
import imgPhilodendron from "../assets/plants/philodendron_gloriosum.png";

const HERO_IMG        = img1;
const IMG_VARIEGATED  = imgVariegated;
const IMG_FICUS       = imgFicus;
const IMG_CALATHEA_O  = imgCalatheaO;
const IMG_SANSEVIERIA = imgSansevieria;
const IMG_PHILODENDRON= imgPhilodendron;

// ─── Design System Tokens ─────────────────────────────────────────────────────
const DS = {
  surface:        "#081612",
  surfaceCont:    "#14221e",
  surfaceContHi:  "#1e2d28",
  surfaceContLo:  "#101e1a",
  surfaceContLow: "#04110d",
  primary:        "#4edea3",
  onPrimary:      "#003824",
  onSurface:      "#d5e6df",
  onSurfaceVar:   "#bbcabf",
  outlineVar:     "#3c4a42",
  outline:        "#86948a",
};

const glass = {
  background:           "rgba(20, 34, 30, 0.4)",
  backdropFilter:       "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border:               "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow:            "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
};

// ─── Product Data ─────────────────────────────────────────────────────────────
const bentoPlants = [
  { id: 101, name: "Variegated Monstera",    badge: "SCARCE SPECIMEN", category: "Indoor",       priceDisplay: "$1,240", price: 1240, imageUrl: IMG_VARIEGATED,  layout: "featured" },
  { id: 102, name: "Ficus Lyrata",           badge: "MINIMALIST",      category: "Indoor",       priceDisplay: "$340",   price: 340,  imageUrl: IMG_FICUS,       layout: "tall" },
  { id: 103, name: "Calathea Orbifolia",     badge: "COLLECTOR",       category: "Indoor",       priceDisplay: "$85",    price: 85,   imageUrl: IMG_CALATHEA_O,  layout: "small" },
  { id: 104, name: "Sansevieria Zeylanica",  badge: "AIR PURIFIER",    category: "Air Purifying",priceDisplay: "$60",    price: 60,   imageUrl: IMG_SANSEVIERIA, layout: "small" },
  { id: 105, name: "Philodendron Gloriosum", badge: "RARE FIND",       category: "Indoor",       priceDisplay: "$195",   price: 195,  imageUrl: IMG_PHILODENDRON,layout: "small" },
];

const rarePlants = [
  { id: 201, name: "Monstera Obliqua",       badge: "ULTRA RARE",   category: "Rare",   priceDisplay: "$3,800", price: 3800, image: img5 },
  { id: 202, name: "Amorphophallus Titanum", badge: "COLLECTOR",    category: "Rare",   priceDisplay: "$2,400", price: 2400, image: img3 },
  { id: 203, name: "Ghost Orchid",           badge: "LIMITED 3",    category: "Rare",   priceDisplay: "$1,100", price: 1100, image: img1 },
  { id: 204, name: "Corpse Flower",          badge: "BY REQUEST",   category: "Rare",   priceDisplay: "$4,200", price: 4200, image: img6 },
];

const bestSellers = [
  { id: 301, name: "Calathea Plant",         badge: "TRENDING #1",  category: "Indoor", priceDisplay: "$359",   price: 359,  image: img1 },
  { id: 302, name: "Desk Companion",         badge: "BESTSELLER",   category: "Office", priceDisplay: "$309",   price: 309,  image: img2 },
  { id: 303, name: "Areca Palm",             badge: "POPULAR",      category: "Outdoor",priceDisplay: "$529",   price: 529,  image: img6 },
];

const newArrivals = [
  { id: 401, name: "Cactus Specimen",        badge: "NEW",          category: "Desert", priceDisplay: "$249",   price: 249,  image: img4 },
  { id: 402, name: "Calathea AI",            badge: "JUST ARRIVED", category: "Air Purifying", priceDisplay: "$399", price: 399, image: img3 },
  { id: 403, name: "Monstera Deliciosa",     badge: "RESTOCK",      category: "Indoor", priceDisplay: "$479",   price: 479,  image: img5 },
];

// ─── Dynamic text content based on flower animation progress ─────────────────
const flowerTextStages = [
  {
    range: [0, 12],
    badge: "PRIVATE SELECTION",
    title: "The Architecture",
    titleAccent: "of Flora",
    description: "Curated specimen plants for architectural interiors. High-contrast organisms that redefine spatial luxury."
  },
  {
    range: [13, 24],
    badge: "NATURE AWAKENS",
    title: "Witness the",
    titleAccent: "Unfolding",
    description: "Each petal reveals nature's intricate design. A moment of transformation captured in botanical elegance."
  },
  {
    range: [25, 37],
    badge: "BOTANICAL ARTISTRY",
    title: "The Poetry",
    titleAccent: "of Bloom",
    description: "Where organic form meets architectural precision. Living sculptures that breathe life into modern spaces."
  },
  {
    range: [38, 49],
    badge: "FULL BLOOM",
    title: "Pure",
    titleAccent: "Magnificence",
    description: "The complete revelation of nature's masterpiece. Timeless beauty in its most exquisite form."
  }
];

// ─── Utility: lerp ─────────────────────────────────────────────────────────────
const lerp = (a, b, n) => (1 - n) * a + n * b;

// ─── Import flower frames ─────────────────────────────────────────────────────
const flowerFrames = Array.from({ length: 50 }, (_, i) => {
  const frameNum = String(i + 1).padStart(3, '0');
  return `/ezgif-6d2a08a35083e533-jpg/ezgif-frame-${frameNum}.jpg`;
});

// ──────────────────────────────────────────────────────────────────────────────
// ATMOSPHERIC LAYER  — particles + light beams + breathing blobs
// ──────────────────────────────────────────────────────────────────────────────
function AtmosphericLayer() {
  const particles = useMemo(() =>
    Array.from({ length: 45 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top:  Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur:  Math.random() * 14 + 10,
      del:  Math.random() * 14,
      drift:Math.random() * 50 - 25,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* breathing blobs */}
      <div style={{ position:"absolute", top:"-10%", left:"-10%", width:"600px", height:"600px",
        borderRadius:"50%", background:"rgba(30,80,50,0.18)", filter:"blur(130px)",
        animation:"breatheBlob 10s ease-in-out infinite" }} />
      <div style={{ position:"absolute", top:"20%", right:"-15%", width:"500px", height:"500px",
        borderRadius:"50%", background:"rgba(20,60,35,0.15)", filter:"blur(150px)",
        animation:"breatheBlob 14s ease-in-out 3s infinite reverse" }} />
      <div style={{ position:"absolute", bottom:0, left:"40%", width:"400px", height:"400px",
        borderRadius:"50%", background:"rgba(40,100,60,0.12)", filter:"blur(100px)",
        animation:"breatheBlob 12s ease-in-out 6s infinite" }} />

      {/* light ray sweep */}
      <div style={{ position:"absolute", inset:0, animation:"lightRay 18s ease-in-out 4s infinite",
        background:"linear-gradient(110deg, transparent 0%, rgba(78,222,163,0.025) 45%, rgba(78,222,163,0.04) 50%, transparent 80%)",
        width:"70%", height:"90%", top:"5%", left:"-60%" }} />

      {/* Botanical silhouettes */}
      <svg className="absolute bottom-0 left-0 opacity-[0.03]" style={{ animation:"sihouetteSway 9s ease-in-out infinite" }}
        width="220" height="220" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <path d="M100 20 C120 60 160 80 180 120 C190 140 170 180 150 190 C130 200 70 200 50 190 C30 180 10 140 20 120 C40 80 80 60 100 20Z" stroke="rgba(139,195,74,0.9)" strokeWidth="0.5"/>
        <path d="M100 40 L100 180" stroke="rgba(139,195,74,0.5)" strokeWidth="0.4"/>
      </svg>
      <svg className="absolute bottom-10 right-0 opacity-[0.025]" style={{ animation:"sihouetteSway 11s ease-in-out 2s infinite reverse" }}
        width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <path d="M100 30 C130 50 170 70 185 110 C195 140 170 185 150 190 C130 195 70 195 50 190 C30 185 5 140 15 110 C30 70 70 50 100 30Z" stroke="rgba(78,222,163,0.7)" strokeWidth="0.5"/>
        <path d="M100 50 L100 180" stroke="rgba(78,222,163,0.35)" strokeWidth="0.3"/>
      </svg>

      {/* Floating dust particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position:"absolute", left:`${p.left}%`, top:`${p.top}%`,
          width:`${p.size}px`, height:`${p.size}px`, borderRadius:"50%",
          background:"rgba(78,222,163,0.35)", pointerEvents:"none",
          animation:`particleFloat ${p.dur}s ${p.del}s ease-in-out infinite`,
          "--drift": `${p.drift}px`,
        }}/>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SCROLL-BASED FLOWER ANIMATION WITH COMPLETE SCROLL LOCK
// ──────────────────────────────────────────────────────────────────────────────
function ScrollFlowerAnimation({ onAnimationStateChange, onFrameChange }) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const wheelAccumulator = useRef(0);
  const isInHeroSection = useRef(true);

  // Notify parent of frame changes
  useEffect(() => {
    if (onFrameChange) {
      onFrameChange(currentFrame);
    }
  }, [currentFrame, onFrameChange]);

  useEffect(() => {
    const handleWheel = (e) => {
      // Check if we're in the hero section
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9; // Approximate hero section height
      
      isInHeroSection.current = scrollY < heroHeight;
      
      // Only control scroll when in hero section
      if (!isInHeroSection.current) {
        // Allow normal scrolling when outside hero section
        return;
      }
      
      // If animation is not complete, ALWAYS prevent scroll
      if (currentFrame < flowerFrames.length - 1) {
        e.preventDefault();
        e.stopPropagation();
        
        // Only advance frames on scroll down
        if (e.deltaY > 0) {
          // Accumulate wheel delta
          wheelAccumulator.current += Math.abs(e.deltaY);
          
          // Lower threshold = faster, smoother frame changes
          const threshold = 8; // Reduced from 15 for smoother animation
          
          if (wheelAccumulator.current >= threshold) {
            setCurrentFrame(prev => {
              const next = Math.min(prev + 1, flowerFrames.length - 1);
              wheelAccumulator.current = 0;
              
              // Notify when animation completes
              if (next === flowerFrames.length - 1 && onAnimationStateChange) {
                onAnimationStateChange(false);
              }
              
              return next;
            });
          }
        }
        // Scroll up - close flower
        else if (e.deltaY < 0 && currentFrame > 0) {
          wheelAccumulator.current += Math.abs(e.deltaY);
          
          const threshold = 8;
          
          if (wheelAccumulator.current >= threshold) {
            setCurrentFrame(prev => {
              const next = Math.max(prev - 1, 0);
              wheelAccumulator.current = 0;
              return next;
            });
          }
        }
      }
      // Animation complete - allow scroll down only
      else if (currentFrame === flowerFrames.length - 1 && e.deltaY > 0) {
        // Allow normal scroll to continue
        return;
      }
      // At last frame but scrolling up - close flower
      else if (currentFrame === flowerFrames.length - 1 && e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        wheelAccumulator.current += Math.abs(e.deltaY);
        
        if (wheelAccumulator.current >= 8) {
          setCurrentFrame(prev => {
            wheelAccumulator.current = 0;
            return Math.max(prev - 1, 0);
          });
        }
      }
    };

    // Capture phase to intercept BEFORE any other scroll handlers (including Lenis)
    document.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    
    return () => {
      document.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [currentFrame, onAnimationStateChange]);

  return (
    <div ref={sectionRef} className="w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center relative"
        style={{
          background: "transparent"
        }}
      >
        {/* Flower image with better visibility */}
        <img 
          src={flowerFrames[currentFrame]} 
          alt="Blooming flower animation"
          className="w-full h-full object-contain object-center relative"
          style={{ 
            transform: "scale(1.3)",
            transition: "none",
            filter: "brightness(0.75) contrast(1.3) saturate(1.2)",
            imageRendering: "high-quality",
            opacity: 1,
            maxWidth: "100%",
            maxHeight: "600px"
          }}
        />
        
        {/* Subtle edge fade only on left to blend with text */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right, #000000 0%, transparent 25%)`
          }}
        />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL HOOK
// ──────────────────────────────────────────────────────────────────────────────
function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: options.threshold || 0.12, rootMargin: options.rootMargin || "0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

// ──────────────────────────────────────────────────────────────────────────────
// 3D TILT CARD WRAPPER
// ──────────────────────────────────────────────────────────────────────────────
function TiltCard({ children, className = "", style = {}, onClick, intensity = 12 }) {
  const cardRef = useRef(null);
  const rafRef  = useRef(null);
  const targetRef = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const currentRef = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const animate = useCallback(() => {
    const t = targetRef.current;
    const c = currentRef.current;
    c.rx = lerp(c.rx, t.rx, 0.1);
    c.ry = lerp(c.ry, t.ry, 0.1);
    c.gx = lerp(c.gx, t.gx, 0.1);
    c.gy = lerp(c.gy, t.gy, 0.1);
    const card = cardRef.current;
    if (card) {
      card.style.transform = `perspective(1000px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) translateZ(0)`;
      card.style.setProperty("--sx", `${c.gx}%`);
      card.style.setProperty("--sy", `${c.gy}%`);
    }
    setSpotlight({ x: c.gx, y: c.gy });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    targetRef.current.rx = ((y - cy) / cy) * -intensity;
    targetRef.current.ry = ((x - cx) / cx) *  intensity;
    targetRef.current.gx = (x / rect.width)  * 100;
    targetRef.current.gy = (y / rect.height) * 100;
  }, [intensity]);

  const onEnter = useCallback(() => {
    setHovered(true);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const onLeave = useCallback(() => {
    setHovered(false);
    targetRef.current = { rx: 0, ry: 0, gx: 50, gy: 50 };
    // Let it settle then stop
    setTimeout(() => { cancelAnimationFrame(rafRef.current); }, 600);
  }, []);

  return (
    <div
      ref={cardRef}
      data-card="true"
      className={className}
      style={{
        ...style,
        willChange: "transform",
        transformStyle: "preserve-3d",
        transition: hovered ? "box-shadow 0.3s ease" : "transform 0.6s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        position: "relative",
        boxShadow: hovered
          ? "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(78,222,163,0.08)"
          : "0 8px 32px rgba(0,0,0,0.3)",
      }}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Spotlight overlay */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10, borderRadius: "inherit",
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(78,222,163,0.08) 0%, transparent 60%)`,
          transition: "none",
        }}/>
      )}
      {/* Glass edge shine */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 9, borderRadius: "inherit",
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
      }}/>
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON WRAPPER
// ──────────────────────────────────────────────────────────────────────────────
function MagneticBtn({ children, className="", style={}, onClick, strength=0.35, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) * strength;
    const dy = (e.clientY - (rect.top  + rect.height / 2)) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <button
      ref={ref} data-magnetic="true" className={className} style={{ ...style, transition:"transform 0.3s cubic-bezier(.23,1,.32,1)", willChange:"transform" }}
      onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} {...rest}
    >
      {children}
    </button>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SVG ICONS
// ──────────────────────────────────────────────────────────────────────────────
const CartSVG = ({ size=20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const SearchSVG = ({ size=18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const FilterSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
  </svg>
);
const AddCartSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

// ──────────────────────────────────────────────────────────────────────────────
// FLY-TO-CART ANIMATION
// ──────────────────────────────────────────────────────────────────────────────
function FlyParticle({ x, y, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{
      position:"fixed", left: x, top: y, width:"12px", height:"12px", borderRadius:"50%",
      background: DS.primary, pointerEvents:"none", zIndex:9990,
      animation:"flyToCart 0.9s cubic-bezier(.23,1,.32,1) forwards",
      boxShadow: `0 0 12px ${DS.primary}`,
    }}/>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// NAVBAR (consistent with Home page)
// ──────────────────────────────────────────────────────────────────────────────
function ShopNav({ cartCount, cartBump, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav
        className={`w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 mt-2 sm:mt-2 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass shadow-glass py-1.5"
            : "bg-transparent py-1.5 sm:py-2"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        }}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
          <a
            href="#home"
            className="group shrink-0 min-w-0 transition-opacity duration-300 hover:opacity-90 flex items-center gap-2"
          >
            <img 
              src={mainLogo}
              alt="Planto Logo" 
              className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span 
              className="font-bold tracking-tight hidden sm:inline"
              style={{ color: DS.primary, fontFamily: "Geist,sans-serif", fontSize: "24px" }}
            >
              Planto
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {[["Home", "#home", false], ["Shop", "#shop", true], ["About", "#about", false], ["Contact", "#home", false]].map(([lbl, href, active]) => (
              <a
                key={lbl}
                href={href}
                className="nav-link inline-flex items-center gap-1 whitespace-nowrap"
                style={{
                  color: active ? DS.primary : "rgba(213,230,223,0.7)",
                  fontFamily: "Inter,sans-serif",
                  fontWeight: active ? 600 : 400,
                  borderBottom: active ? `2px solid ${DS.primary}` : "2px solid transparent",
                  paddingBottom: "2px",
                  fontSize: "16px",
                  transition: "color 0.2s",
                }}
              >
                {lbl}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MagneticBtn
              aria-label="Search"
              style={{
                ...glass,
                color: DS.primary,
                padding: "8px",
                borderRadius: "12px",
              }}
            >
              <SearchSVG />
            </MagneticBtn>
            <div className="relative" id="cart-target">
              <MagneticBtn
                onClick={onCartClick}
                aria-label="Shopping bag"
                style={{
                  ...glass,
                  color: DS.primary,
                  padding: "8px",
                  borderRadius: "12px",
                }}
              >
                <CartSVG />
              </MagneticBtn>
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full font-bold ${cartBump ? "cart-bump" : ""}`}
                  style={{
                    background: DS.primary,
                    color: DS.onPrimary,
                    fontSize: "10px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// HERO SECTION (with scroll-based flower animation, black background, and dynamic text)
// ──────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const prevStageRef = useRef(0);

  // Determine which text stage to show based on current frame
  useEffect(() => {
    const stage = flowerTextStages.findIndex(
      s => currentFrame >= s.range[0] && currentFrame <= s.range[1]
    );
    if (stage !== -1 && stage !== prevStageRef.current) {
      setCurrentStage(stage);
      prevStageRef.current = stage;
    }
  }, [currentFrame]);

  const currentText = flowerTextStages[currentStage];

  return (
    <section className="relative flex flex-col justify-center items-start pt-20"
      style={{ 
        minHeight:"90vh", 
        padding:"80px 32px 60px", 
        maxWidth:"1400px", 
        margin:"0 auto",
        background: "#000000" // Pure black background for better blending
      }}>
      <div className="relative w-full flex items-center" style={{ minHeight: "600px" }}>
        {/* Text with roll-up animation - Left Side */}
        <div className="relative z-20 w-full md:w-1/2 space-y-8 pr-8">
          <div className="space-y-4">
            <div className="overflow-hidden" style={{ height: "auto", minHeight: "20px" }}>
              <span 
                key={`badge-${currentStage}`}
                className="hero-text-rollup font-semibold uppercase tracking-[0.2em] block"
                style={{ 
                  color: DS.primary, 
                  fontSize: "13px", 
                  fontFamily: "Inter,sans-serif",
                  animation: "rollUpText 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                  textShadow: "0 2px 8px rgba(0,0,0,0.8)"
                }}>
                {currentText.badge}
              </span>
            </div>
            
            <div className="overflow-hidden" style={{ minHeight: "auto" }}>
              <h1 
                key={`title-${currentStage}`}
                className="hero-text-rollup leading-tight block" 
                style={{
                  fontFamily: "Geist,sans-serif", 
                  fontSize: "clamp(36px,5vw,72px)",
                  fontWeight: 700, 
                  lineHeight: 1.1, 
                  letterSpacing: "-0.02em", 
                  color: "#ffffff",
                  animation: "rollUpText 0.7s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards",
                  textShadow: "0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)"
                }}>
                {currentText.title} <br/>
                <span style={{ color: DS.primary, fontStyle: "italic" }}>
                  {currentText.titleAccent}
                </span>
              </h1>
            </div>
            
            <div className="overflow-hidden" style={{ minHeight: "auto" }}>
              <p 
                key={`desc-${currentStage}`}
                className="hero-text-rollup max-w-lg block" 
                style={{
                  fontFamily: "Inter,sans-serif", 
                  fontSize: "17px", 
                  lineHeight: "28px", 
                  color: "rgba(255,255,255,0.85)",
                  animation: "rollUpText 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards",
                  textShadow: "0 2px 8px rgba(0,0,0,0.9)"
                }}>
                {currentText.description}
              </p>
            </div>
          </div>
          
          <div className="hero-sub-anim flex flex-wrap items-center gap-4 pt-4">
            <MagneticBtn
              className="px-8 py-4 font-bold text-sm rounded-full"
              style={{ 
                background:DS.primary, 
                color:DS.onPrimary, 
                boxShadow:"0 0 24px rgba(78,222,163,0.4), 0 4px 12px rgba(0,0,0,0.5)", 
                fontFamily:"Inter,sans-serif", 
                letterSpacing:"0.05em",
                border: "none"
              }}
              onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior:"smooth" })}
            >
              ACQUIRE PIECE
            </MagneticBtn>
            <MagneticBtn className="px-8 py-4 font-bold text-sm rounded-full"
              style={{ 
                border:"2px solid rgba(78,222,163,0.5)", 
                color:DS.primary, 
                background:"rgba(0,0,0,0.6)", 
                fontFamily:"Inter,sans-serif", 
                letterSpacing:"0.05em",
                backdropFilter: "blur(8px)"
              }}>
              VIEW CATALOG
            </MagneticBtn>
          </div>
        </div>

        {/* Scroll-based flower animation - Right Side */}
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-10">
          <ScrollFlowerAnimation onFrameChange={setCurrentFrame} />
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// BENTO GRID  (preserved structure + 3D tilt + spotlight + floating images)
// ──────────────────────────────────────────────────────────────────────────────
function BentoGrid({ onSelectPlant, onAddToCart }) {
  const [ref, visible] = useScrollReveal();
  const [variegated, ficus, calatheaO, sansevieria, philodendron] = bentoPlants;

  return (
    <section id="collection" ref={ref} className="mx-auto"
      style={{ maxWidth:"1280px", padding:"80px 64px" }}>

      {/* Header */}
      <div className={`flex justify-between items-end mb-12 section-reveal ${visible ? "section-reveal--in" : ""}`}>
        <div className="space-y-2">
          <h2 style={{ fontFamily:"Geist,sans-serif", fontSize:"40px", fontWeight:600, color:DS.onSurface, letterSpacing:"-0.01em" }}>
            Current Collection
          </h2>
          <p style={{ color:DS.onSurfaceVar, fontFamily:"Inter,sans-serif", fontSize:"16px" }}>
            Botanical specimen from our greenhouse reserves.
          </p>
        </div>
        <MagneticBtn className="p-4" style={{ border:`1px solid rgba(60,74,66,0.5)`, color:DS.onSurface }} aria-label="Filter collection">
          <FilterSVG/>
        </MagneticBtn>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* ── Featured 8-col ── */}
        <div className={`md:col-span-8 stagger-reveal ${visible ? "stagger-reveal--in" : ""}`} style={{ "--delay":"0ms" }}>
          <TiltCard
            intensity={8}
            onClick={() => onSelectPlant(variegated)}
            style={{ ...glass, height:"600px", padding:"48px", display:"flex", flexDirection:"column", justifyContent:"space-between", overflow:"hidden", position:"relative" }}
          >
            <div style={{ position:"relative", zIndex:2 }}>
              <span className="font-semibold uppercase tracking-[0.2em]"
                style={{ color:DS.primary, fontSize:"12px", fontFamily:"Inter,sans-serif" }}>
                {variegated.badge}
              </span>
              <h3 className="mt-2" style={{ fontFamily:"Geist,sans-serif", fontSize:"40px", fontWeight:600, color:DS.onSurface }}>
                {variegated.name}
              </h3>
              <p className="max-w-xs mt-4" style={{ color:DS.onSurfaceVar, fontFamily:"Inter,sans-serif", fontSize:"16px" }}>
                A living masterpiece featuring rare sectoral variegation and structural elegance.
              </p>
            </div>

            {/* Floating plant image */}
            <div style={{ position:"absolute", right:"-40px", bottom:"-40px", width:"55%", pointerEvents:"none", zIndex:1,
              animation:"plantFloat 6s ease-in-out infinite", filter:"drop-shadow(0 30px 60px rgba(0,0,0,0.5))" }}>
              <img src={variegated.imageUrl} alt={variegated.name} style={{ width:"100%", objectFit:"contain" }}/>
            </div>

            <div style={{ position:"relative", zIndex:2 }} className="flex items-center gap-4">
              <span style={{ fontFamily:"Geist,sans-serif", fontSize:"24px", fontWeight:600, color:DS.primary }}>
                {variegated.priceDisplay}
              </span>
              <MagneticBtn
                className="w-12 h-12 flex items-center justify-center rounded-full"
                style={{ background:DS.primary, color:DS.onPrimary, flexShrink:0 }}
                onClick={(e) => { e.stopPropagation(); onAddToCart(variegated, e); }}
                aria-label={`Add ${variegated.name} to cart`}
              ><AddCartSVG/></MagneticBtn>
            </div>
          </TiltCard>
        </div>

        {/* ── Tall 4-col ── */}
        <div className={`md:col-span-4 stagger-reveal ${visible ? "stagger-reveal--in" : ""}`} style={{ "--delay":"100ms" }}>
          <TiltCard intensity={10} onClick={() => onSelectPlant(ficus)}
            style={{ ...glass, minHeight:"600px", padding:"40px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <div>
              <span className="font-semibold uppercase tracking-[0.2em]"
                style={{ color:DS.onSurfaceVar, fontSize:"12px", fontFamily:"Inter,sans-serif" }}>
                {ficus.badge}
              </span>
              <h3 className="mt-2" style={{ fontFamily:"Geist,sans-serif", fontSize:"24px", fontWeight:600, color:DS.onSurface }}>
                {ficus.name}
              </h3>
            </div>

            <div style={{ padding:"32px 0", display:"flex", justifyContent:"center",
              animation:"plantFloat 5s ease-in-out 1s infinite", filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}>
              <img src={ficus.imageUrl} alt={ficus.name}
                style={{ width:"100%", height:"260px", objectFit:"contain", transition:"transform 0.5s ease" }}/>
            </div>

            <div className="flex justify-between items-center">
              <span style={{ fontFamily:"Geist,sans-serif", fontSize:"24px", fontWeight:600, color:DS.primary }}>
                {ficus.priceDisplay}
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DS.primary} strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </TiltCard>
        </div>

        {/* ── Small 3 cards ── */}
        {[calatheaO, sansevieria, philodendron].map((plant, i) => (
          <div key={plant.id} className={`md:col-span-4 stagger-reveal ${visible ? "stagger-reveal--in" : ""}`}
            style={{ "--delay":`${(i + 2) * 80}ms` }}>
            <TiltCard intensity={14} onClick={() => onSelectPlant(plant)}
              style={{ ...glass, padding:"32px", display:"flex", alignItems:"center", gap:"24px" }}>
              <div style={{ position:"relative", flexShrink:0, animation:`plantFloat ${5+i}s ease-in-out ${i*0.7}s infinite` }}>
                <img src={plant.imageUrl} alt={plant.name}
                  style={{ width:"96px", height:"96px", objectFit:"cover", borderRadius:"12px",
                    boxShadow:"0 8px 24px rgba(0,0,0,0.4)", transition:"transform 0.4s ease" }}/>
                {/* glow dot badge */}
                <div style={{ position:"absolute", top:"-4px", right:"-4px", width:"12px", height:"12px",
                  borderRadius:"50%", background:DS.primary, boxShadow:`0 0 8px ${DS.primary}`,
                  animation:"pulseGlow 2s ease-in-out infinite" }}/>
              </div>
              <div>
                <span style={{ color:DS.primary, fontSize:"10px", fontFamily:"Inter,sans-serif", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase" }}>
                  {plant.badge}
                </span>
                <h4 style={{ fontFamily:"Geist,sans-serif", fontSize:"16px", fontWeight:600, color:DS.onSurface, marginTop:"4px" }}>
                  {plant.name}
                </h4>
                <p className="mt-1 font-bold" style={{ color:DS.primary, fontFamily:"Inter,sans-serif" }}>
                  {plant.priceDisplay}
                </p>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// RARE PLANTS SECTION  (new, bento-consistent)
// ──────────────────────────────────────────────────────────────────────────────
function RarePlantsSection({ onSelectPlant, onAddToCart }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section ref={ref} style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 64px 80px" }}>
      <div className={`flex justify-between items-end mb-12 section-reveal ${visible ? "section-reveal--in" : ""}`}>
        <div className="space-y-2">
          <span style={{ color:DS.primary, fontSize:"12px", fontFamily:"Inter,sans-serif", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" }}>
            Exclusive
          </span>
          <h2 style={{ fontFamily:"Geist,sans-serif", fontSize:"40px", fontWeight:600, color:DS.onSurface, letterSpacing:"-0.01em" }}>
            Rare Specimens
          </h2>
          <p style={{ color:DS.onSurfaceVar, fontFamily:"Inter,sans-serif", fontSize:"16px" }}>
            Genetically distinct. Exceptionally limited. Never restocked.
          </p>
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          {["All","Ultra Rare","Collector","By Request"].map((f,i) => (
            <button key={f} style={{
              padding:"8px 16px", fontSize:"12px", fontFamily:"Inter,sans-serif", fontWeight:500,
              borderRadius:"9999px", cursor:"pointer", transition:"all 0.25s ease",
              background: i===0 ? DS.primary : "transparent",
              color: i===0 ? DS.onPrimary : DS.onSurfaceVar,
              border: i===0 ? "none" : `1px solid rgba(60,74,66,0.5)`,
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {rarePlants.map((plant, i) => (
          <div key={plant.id} className={`stagger-reveal ${visible ? "stagger-reveal--in" : ""}`}
            style={{ "--delay":`${i * 80}ms` }}>
            <TiltCard intensity={12} onClick={() => onSelectPlant(plant)}
              style={{ ...glass, padding:"0", overflow:"hidden", display:"flex", flexDirection:"column" }}>
              {/* Image area */}
              <div style={{ height:"240px", position:"relative", overflow:"hidden",
                background:"linear-gradient(135deg, rgba(8,22,18,0.8) 0%, rgba(20,34,30,0.4) 100%)" }}>
                <img src={plant.image} alt={plant.name}
                  style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center",
                    animation:`plantFloat ${5+i}s ease-in-out ${i*0.5}s infinite`,
                    filter:"drop-shadow(0 16px 32px rgba(0,0,0,0.5))", transition:"transform 0.5s ease",
                    padding:"24px" }}/>
                {/* Rarity badge */}
                <div style={{ position:"absolute", top:"12px", left:"12px",
                  background:"rgba(78,222,163,0.15)", border:"1px solid rgba(78,222,163,0.3)",
                  color:DS.primary, fontSize:"10px", fontFamily:"Inter,sans-serif", fontWeight:600,
                  letterSpacing:"0.15em", textTransform:"uppercase", padding:"4px 10px" }}>
                  {plant.badge}
                </div>
                {/* Corner glow */}
                <div style={{ position:"absolute", bottom:0, right:0, width:"120px", height:"120px",
                  background:"radial-gradient(circle at bottom right, rgba(78,222,163,0.12), transparent 70%)",
                  pointerEvents:"none" }}/>
              </div>

              {/* Info area */}
              <div style={{ padding:"24px", flex:1, display:"flex", flexDirection:"column", gap:"8px" }}>
                <span style={{ color:DS.onSurfaceVar, fontSize:"11px", fontFamily:"Inter,sans-serif", textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  {plant.category}
                </span>
                <h4 style={{ fontFamily:"Geist,sans-serif", fontSize:"18px", fontWeight:600, color:DS.onSurface }}>
                  {plant.name}
                </h4>
                <div className="flex items-center justify-between mt-auto pt-3"
                  style={{ borderTop:"1px solid rgba(60,74,66,0.3)", marginTop:"8px" }}>
                  <span style={{ fontFamily:"Geist,sans-serif", fontSize:"20px", fontWeight:600, color:DS.primary }}>
                    {plant.priceDisplay}
                  </span>
                  <MagneticBtn
                    style={{ width:"36px", height:"36px", borderRadius:"50%", background:`rgba(78,222,163,0.15)`,
                      border:`1px solid rgba(78,222,163,0.3)`, color:DS.primary, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}
                    onClick={(e) => { e.stopPropagation(); onAddToCart(plant, e); }}
                    aria-label={`Add ${plant.name} to cart`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </MagneticBtn>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// BEST SELLERS SECTION
// ──────────────────────────────────────────────────────────────────────────────
function BestSellersSection({ onSelectPlant, onAddToCart }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section ref={ref} style={{
      background:`linear-gradient(180deg, ${DS.surface} 0%, ${DS.surfaceCont} 50%, ${DS.surface} 100%)`,
      padding:"80px 0",
    }}>
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 64px" }}>
        <div className={`flex justify-between items-end mb-12 section-reveal ${visible ? "section-reveal--in" : ""}`}>
          <div className="space-y-2">
            <span style={{ color:DS.primary, fontSize:"12px", fontFamily:"Inter,sans-serif", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" }}>
              Most Coveted
            </span>
            <h2 style={{ fontFamily:"Geist,sans-serif", fontSize:"40px", fontWeight:600, color:DS.onSurface, letterSpacing:"-0.01em" }}>
              Best Sellers
            </h2>
          </div>
          <a href="#collection" style={{ color:DS.primary, fontFamily:"Inter,sans-serif", fontSize:"14px", fontWeight:600,
            letterSpacing:"0.08em", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px" }}>
            VIEW ALL
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* 3-col large cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bestSellers.map((plant, i) => (
            <div key={plant.id} className={`stagger-reveal ${visible ? "stagger-reveal--in" : ""}`}
              style={{ "--delay":`${i * 100}ms` }}>
              <TiltCard intensity={10} onClick={() => onSelectPlant(plant)}
                style={{ ...glass, overflow:"hidden" }}>
                {/* Image */}
                <div style={{ height:"320px", position:"relative", overflow:"hidden",
                  background:"linear-gradient(135deg,rgba(8,22,18,0.9) 0%,rgba(20,34,30,0.5) 100%)" }}>
                  <img src={plant.image} alt={plant.name}
                    style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center",
                      padding:"32px", animation:`plantFloat ${6+i}s ease-in-out ${i*0.8}s infinite`,
                      filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.5))", transition:"transform 0.5s ease" }}/>

                  {/* Rank badge */}
                  <div style={{ position:"absolute", top:"16px", right:"16px",
                    background:DS.primary, color:DS.onPrimary,
                    fontFamily:"Geist,sans-serif", fontSize:"22px", fontWeight:700,
                    width:"44px", height:"44px", borderRadius:"50%",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:`0 0 20px rgba(78,222,163,0.4)` }}>
                    {i + 1}
                  </div>

                  <div style={{ position:"absolute", top:"16px", left:"16px",
                    background:"rgba(78,222,163,0.15)", border:"1px solid rgba(78,222,163,0.3)",
                    color:DS.primary, fontSize:"10px", fontFamily:"Inter,sans-serif", fontWeight:600,
                    letterSpacing:"0.15em", textTransform:"uppercase", padding:"4px 10px" }}>
                    {plant.badge}
                  </div>

                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"60px",
                    background:"linear-gradient(to top, rgba(20,34,30,0.8), transparent)", pointerEvents:"none" }}/>
                </div>

                {/* Info */}
                <div style={{ padding:"24px 28px" }}>
                  <h4 style={{ fontFamily:"Geist,sans-serif", fontSize:"20px", fontWeight:600, color:DS.onSurface }}>
                    {plant.name}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    <span style={{ fontFamily:"Geist,sans-serif", fontSize:"22px", fontWeight:600, color:DS.primary }}>
                      {plant.priceDisplay}
                    </span>
                    <MagneticBtn
                      className="flex items-center gap-2"
                      style={{ background:DS.primary, color:DS.onPrimary, padding:"10px 20px",
                        fontSize:"12px", fontFamily:"Inter,sans-serif", fontWeight:700, letterSpacing:"0.08em",
                        flexShrink:0 }}
                      onClick={(e) => { e.stopPropagation(); onAddToCart(plant, e); }}
                      aria-label={`Add ${plant.name} to cart`}
                    >
                      ADD <AddCartSVG/>
                    </MagneticBtn>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// NEW ARRIVALS SECTION
// ──────────────────────────────────────────────────────────────────────────────
function NewArrivalsSection({ onSelectPlant, onAddToCart }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section ref={ref} style={{ maxWidth:"1280px", margin:"0 auto", padding:"80px 64px" }}>
      <div className={`mb-12 section-reveal ${visible ? "section-reveal--in" : ""}`}>
        <span style={{ color:DS.primary, fontSize:"12px", fontFamily:"Inter,sans-serif", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" }}>
          Fresh Stock
        </span>
        <h2 style={{ fontFamily:"Geist,sans-serif", fontSize:"40px", fontWeight:600, color:DS.onSurface, letterSpacing:"-0.01em", marginTop:"8px" }}>
          New Arrivals
        </h2>
      </div>

      {/* Horizontal bento for new arrivals */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Wide first card */}
        <div className={`md:col-span-6 stagger-reveal ${visible ? "stagger-reveal--in" : ""}`} style={{ "--delay":"0ms" }}>
          <TiltCard intensity={8} onClick={() => onSelectPlant(newArrivals[0])}
            style={{ ...glass, overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <div style={{ height:"280px", position:"relative", overflow:"hidden" }}>
              <img src={newArrivals[0].image} alt={newArrivals[0].name}
                style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center",
                  padding:"32px", animation:"plantFloat 6s ease-in-out infinite",
                  filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}/>
              <div style={{ position:"absolute", top:"16px", left:"16px",
                background:"rgba(78,222,163,0.15)", border:"1px solid rgba(78,222,163,0.3)",
                color:DS.primary, fontSize:"10px", fontFamily:"Inter,sans-serif", fontWeight:600,
                letterSpacing:"0.15em", textTransform:"uppercase", padding:"4px 10px" }}>
                {newArrivals[0].badge}
              </div>
            </div>
            <div style={{ padding:"28px" }}>
              <h4 style={{ fontFamily:"Geist,sans-serif", fontSize:"22px", fontWeight:600, color:DS.onSurface }}>{newArrivals[0].name}</h4>
              <div className="flex items-center justify-between mt-3">
                <span style={{ fontFamily:"Geist,sans-serif", fontSize:"22px", fontWeight:600, color:DS.primary }}>{newArrivals[0].priceDisplay}</span>
                <MagneticBtn style={{ ...glass, color:DS.primary, padding:"10px 20px", fontSize:"12px", fontFamily:"Inter,sans-serif", fontWeight:600, letterSpacing:"0.08em" }}
                  onClick={(e) => { e.stopPropagation(); onAddToCart(newArrivals[0], e); }}>
                  ADD TO CART
                </MagneticBtn>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Stack 2 small cards */}
        <div className="md:col-span-6 flex flex-col gap-6">
          {newArrivals.slice(1).map((plant, i) => (
            <div key={plant.id} className={`stagger-reveal ${visible ? "stagger-reveal--in" : ""}`}
              style={{ "--delay":`${(i+1)*100}ms`, flex:1 }}>
              <TiltCard intensity={12} onClick={() => onSelectPlant(plant)}
                style={{ ...glass, display:"flex", alignItems:"center", gap:"24px", padding:"28px", height:"100%" }}>
                <div style={{ position:"relative", flexShrink:0, animation:`plantFloat ${5+i}s ease-in-out ${i*0.6}s infinite` }}>
                  <img src={plant.image} alt={plant.name}
                    style={{ width:"110px", height:"110px", objectFit:"contain",
                      filter:"drop-shadow(0 8px 20px rgba(0,0,0,0.45))" }}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ background:"rgba(78,222,163,0.12)", border:"1px solid rgba(78,222,163,0.25)",
                    color:DS.primary, fontSize:"10px", fontFamily:"Inter,sans-serif", fontWeight:600,
                    letterSpacing:"0.15em", textTransform:"uppercase", padding:"3px 8px", display:"inline-block", marginBottom:"8px" }}>
                    {plant.badge}
                  </div>
                  <h4 style={{ fontFamily:"Geist,sans-serif", fontSize:"18px", fontWeight:600, color:DS.onSurface }}>{plant.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span style={{ fontFamily:"Geist,sans-serif", fontSize:"20px", fontWeight:600, color:DS.primary }}>{plant.priceDisplay}</span>
                    <MagneticBtn
                      style={{ background:"rgba(78,222,163,0.1)", border:`1px solid rgba(78,222,163,0.25)`,
                        color:DS.primary, padding:"8px 16px", fontSize:"11px", fontFamily:"Inter,sans-serif",
                        fontWeight:600, letterSpacing:"0.08em" }}
                      onClick={(e) => { e.stopPropagation(); onAddToCart(plant, e); }}>
                      ADD
                    </MagneticBtn>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// NEWSLETTER  (preserved)
// ──────────────────────────────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [ref, visible] = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  return (
    <section ref={ref} style={{
      padding:"80px 64px", background:DS.surfaceContLo,
      borderTop:`1px solid rgba(60,74,66,0.1)`, borderBottom:`1px solid rgba(60,74,66,0.1)`,
    }}>
      <div className={`max-w-screen-xl mx-auto text-center space-y-12 section-reveal ${visible ? "section-reveal--in" : ""}`}
        style={{ maxWidth:"1280px" }}>
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 style={{ fontFamily:"Geist,sans-serif", fontSize:"40px", fontWeight:600, letterSpacing:"-0.01em", color:DS.onSurface }}>
            Join the Conservancy
          </h2>
          <p style={{ fontFamily:"Inter,sans-serif", fontSize:"18px", lineHeight:"28px", color:DS.onSurfaceVar }}>
            Receive exclusive access to monthly specimen drops and architectural botanical guides.
          </p>
        </div>
        {subscribed ? (
          <p style={{ color:DS.primary, fontFamily:"Geist,sans-serif", fontSize:"18px" }}>
            ✓ Welcome to the Conservancy. Watch your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row max-w-xl mx-auto gap-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address" required
              className="flex-grow h-14 px-6 outline-none transition-all"
              style={{ background:DS.surface, border:`1px solid ${DS.outlineVar}`, color:DS.onSurface, fontFamily:"Inter,sans-serif" }}
              onFocus={(e) => { e.target.style.borderColor = DS.primary; e.target.style.boxShadow="0 0 0 2px rgba(78,222,163,0.15)"; }}
              onBlur={(e)  => { e.target.style.borderColor = DS.outlineVar; e.target.style.boxShadow="none"; }}/>
            <MagneticBtn type="submit" className="h-14 px-10 font-bold text-sm"
              style={{ background:DS.primary, color:DS.onPrimary, fontFamily:"Inter,sans-serif",
                letterSpacing:"0.05em", boxShadow:"0 0 20px rgba(78,222,163,0.25)", flexShrink:0 }}>
              SUBSCRIBE
            </MagneticBtn>
          </form>
        )}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// FOOTER  (preserved)
// ──────────────────────────────────────────────────────────────────────────────
function ShopFooter() {
  return (
    <footer style={{ background:DS.surfaceContLow, padding:"80px 64px", borderTop:`1px solid rgba(60,74,66,0.2)` }}>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-6" style={{ maxWidth:"1280px" }}>
        <div className="space-y-6">
          <a href="#shop" style={{ fontFamily:"Geist,sans-serif", fontSize:"24px", fontWeight:600, color:DS.primary }}>Planto</a>
          <p style={{ color:DS.onSurfaceVar, fontFamily:"Inter,sans-serif", fontSize:"16px", lineHeight:"24px", marginTop:"16px" }}>
            Botanical curation for the discerning space. Elevating interior architecture through living specimen.
          </p>
        </div>
        {[["Collection",["Best Sellers","Rare Specimens","Care Accessories","Gift Cards"]],
          ["Support",["Care Guides","Shipping Info","Terms of Service","Privacy Policy"]]].map(([title, items]) => (
          <div key={title}>
            <h4 className="mb-6 uppercase tracking-widest" style={{ color:DS.onSurface, fontFamily:"Inter,sans-serif", fontSize:"12px", fontWeight:600 }}>{title}</h4>
            <ul className="space-y-4" style={{ fontFamily:"Inter,sans-serif", fontSize:"16px" }}>
              {items.map(item => (
                <li key={item}><a href="#shop" style={{ color:DS.onSurfaceVar, transition:"color 0.2s" }}
                  onMouseEnter={e=>e.target.style.color=DS.primary}
                  onMouseLeave={e=>e.target.style.color=DS.onSurfaceVar}>{item}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="mb-6 uppercase tracking-widest" style={{ color:DS.onSurface, fontFamily:"Inter,sans-serif", fontSize:"12px", fontWeight:600 }}>Connect</h4>
          <div className="flex gap-4">
            {[
              { l:"Website",   p:"M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0v20M2 12h20" },
              { l:"Instagram", p:"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
              { l:"Email",     p:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
            ].map(({ l, p }) => (
              <a key={l} href="#shop" aria-label={l}
                className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-all"
                style={{ ...glass }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.onSurface} strokeWidth="1.8"><path d={p}/></svg>
              </a>
            ))}
          </div>
          <p className="mt-8" style={{ color:DS.onSurfaceVar, fontFamily:"Inter,sans-serif", fontSize:"12px", letterSpacing:"0.05em" }}>
            © 2024 Planto Botanical Artistry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// FAB  (AI Scanner)
// ──────────────────────────────────────────────────────────────────────────────
function FAB({ onClick }) {
  return (
    <MagneticBtn
      onClick={onClick}
      className="fixed bottom-10 right-10 w-16 h-16 rounded-full flex items-center justify-center z-[60]"
      style={{ background:DS.primary, color:DS.onPrimary, boxShadow:"0 8px 32px rgba(78,222,163,0.45)", flexShrink:0 }}
      strength={0.5} aria-label="AI Plant Scanner"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </MagneticBtn>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// ROOT SHOP COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
export default function Shop() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [cartItems, setCartItems]         = useState([]);
  const [isCartOpen, setIsCartOpen]       = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [cartBump, setCartBump]           = useState(false);
  const [flyParticles, setFlyParticles]   = useState([]);

  // Hero entrance animations
  useEffect(() => {
    gsap.fromTo(".hero-title-anim",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15 }
    );
    gsap.fromTo(".hero-sub-anim",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.35 }
    );
  }, []);

  const handleAddToCart = useCallback((plant, e) => {
    // Fly-to-cart effect
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setFlyParticles(prev => [...prev, { id, x: rect.left + rect.width/2, y: rect.top + rect.height/2 }]);
    }
    // Add to cart state
    setCartItems(prev => {
      const existing = prev.find(p => p.id === plant.id);
      if (existing) {
        return prev.map(p => p.id === plant.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p);
      }
      return [...prev, { ...plant, quantity: 1 }];
    });

    // Bump counter
    setCartBump(true);
    setTimeout(() => setCartBump(false), 400);
  }, []);

  const removeFlyParticle = useCallback((id) => {
    setFlyParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        /* Keyframes */
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideInRight { from{transform:translateX(100%)} to{transform:translateX(0)} }
        .animate-fade-in   { animation: fadeIn 400ms ease-out; }
        .animate-slide-in-right { animation: slideInRight 400ms ease-out; }

        @keyframes breatheBlob {
          0%,100% { opacity:0.7; transform:scale(1); }
          50%      { opacity:0.3; transform:scale(1.12); }
        }
        @keyframes lightRay {
          0%   { transform:translateX(-100%) rotate(12deg); opacity:0; }
          8%   { opacity:1; }
          92%  { opacity:0.8; }
          100% { transform:translateX(300%) rotate(12deg); opacity:0; }
        }
        @keyframes particleFloat {
          0%   { transform:translateY(0) translateX(0); opacity:0; }
          10%  { opacity:0.6; }
          80%  { opacity:0.2; }
          100% { transform:translateY(-18vh) translateX(var(--drift,12px)); opacity:0; }
        }
        @keyframes sihouetteSway {
          0%,100%{ transform:rotate(-2deg) scaleY(1); }
          50%    { transform:rotate(2deg) scaleY(1.04); }
        }
        @keyframes plantFloat {
          0%,100%{ transform:translateY(0) rotate(0deg); }
          30%    { transform:translateY(-8px) rotate(1deg); }
          60%    { transform:translateY(-4px) rotate(-0.5deg); }
        }
        @keyframes pulseGlow {
          0%,100%{ box-shadow:0 0 6px rgba(78,222,163,0.6); transform:scale(1); }
          50%    { box-shadow:0 0 16px rgba(78,222,163,1); transform:scale(1.2); }
        }
        @keyframes flyToCart {
          0%   { transform:translate(0,0) scale(1); opacity:1; }
          80%  { transform:translate(calc(var(--tx,200px)),calc(var(--ty,-200px))) scale(0.4); opacity:0.8; }
          100% { transform:translate(calc(var(--tx,200px)),calc(var(--ty,-200px))) scale(0); opacity:0; }
        }
        @keyframes cartBump {
          0%  { transform:scale(1); }
          40% { transform:scale(1.5); }
          70% { transform:scale(0.9); }
          100%{ transform:scale(1); }
        }
        .cart-bump { animation: cartBump 0.4s cubic-bezier(.36,.07,.19,.97); }

        /* Roll-up text animation */
        @keyframes rollUpText {
          0%   { transform:translateY(100%); opacity:0; }
          100% { transform:translateY(0); opacity:1; }
        }
        .hero-text-rollup {
          animation: rollUpText 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        /* Hero animations */
        .hero-title-anim, .hero-sub-anim { opacity:0; }

        /* Scroll reveal */
        .section-reveal {
          opacity:0; transform:translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .section-reveal--in { opacity:1; transform:translateY(0); }

        .stagger-reveal {
          opacity:0; transform:translateY(32px);
          transition: opacity 0.6s ease var(--delay,0ms), transform 0.6s ease var(--delay,0ms);
        }
        .stagger-reveal--in { opacity:1; transform:translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
          .hero-title-anim, .hero-sub-anim,
          .section-reveal, .stagger-reveal { opacity:1 !important; transform:none !important; }
        }
      `}</style>

      {/* Fly-to-cart particles */}
      {flyParticles.map(p => (
        <FlyParticle key={p.id} x={p.x} y={p.y} onDone={() => removeFlyParticle(p.id)}/>
      ))}

      {/* Page wrapper */}
      <div style={{ minHeight:"100vh", background:DS.surface, color:DS.onSurface, overflowX:"clip", position:"relative" }}>

        {/* Atmospheric layer (fixed, z-0) */}
        <AtmosphericLayer/>

        {/* Subtle global radial glow */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true"
          style={{ background:"radial-gradient(ellipse at top right, rgba(16,185,129,0.05) 0%, transparent 60%)" }}/>

        {/* Content */}
        <div className="relative z-[1]">
          <ShopNav 
            cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} 
            cartBump={cartBump} 
            onCartClick={() => setIsCartOpen(true)} 
          />

          <main>
            <HeroSection/>
            <BentoGrid           onSelectPlant={setSelectedPlant} onAddToCart={handleAddToCart}/>
            <RarePlantsSection   onSelectPlant={setSelectedPlant} onAddToCart={handleAddToCart}/>
            <BestSellersSection  onSelectPlant={setSelectedPlant} onAddToCart={handleAddToCart}/>
            <NewArrivalsSection  onSelectPlant={setSelectedPlant} onAddToCart={handleAddToCart}/>
            <NewsletterSection/>
          </main>

          <ShopFooter/>
        </div>

        <FAB onClick={() => setIsScannerOpen(true)} />
      </div>

      {/* Detail modal */}
      {selectedPlant && (
        <PlantDetail plant={selectedPlant} onClose={() => setSelectedPlant(null)}/>
      )}

      {/* Cart modal */}
      {isCartOpen && (
        <CartModal 
          cartItems={cartItems} 
          onClose={() => setIsCartOpen(false)} 
          onCheckoutSuccess={() => {
            setCartItems([]);
            setIsCartOpen(false);
          }} 
        />
      )}
      
      {/* AI Scanner modal */}
      {isScannerOpen && (
        <AiScanner onClose={() => setIsScannerOpen(false)} />
      )}
    </>
  );
}
