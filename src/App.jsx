import { useState, useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PlantPhilosophy from "./components/PlantPhilosophy";
import TopSelling from "./components/TopSelling";
import ShopStrip from "./components/ShopStrip";
import GrowingConditions from "./components/GrowingConditions";
import GreenhouseVoices from "./components/GreenhouseVoices";
import CultivateNewsletter from "./components/CultivateNewsletter";
import BestO2 from "./components/BestO2";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Admin from "./pages/Admin";
import useCustomCursor from "./hooks/useCustomCursor";

export default function App() {
  useCustomCursor();

  const [hash, setHash] = useState(window.location.hash || "#home");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      autoPrevent: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const newHash = window.location.hash || "#home";
      // If navigating to #contact, scroll to the section instead of re-routing
      if (newHash === "#contact") {
        setHash("#home");
        setTimeout(() => {
          const el = document.getElementById("contact");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 50);
        return;
      }
      setHash(newHash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    // Don't scroll to top when navigating to #contact (it's a section scroll)
    if (hash === "#contact") return;
    window.scrollTo(0, 0);
  }, [hash]);

  const isShop = hash === "#shop";
  const isAbout = hash === "#about";
  const isAdmin = hash === "#admin";

  if (isShop) {
    return <Shop />;
  }

  if (isAbout) {
    return <About />;
  }

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark relative w-full overflow-x-clip">
      <div className="hero-bg-layer pointer-events-none absolute inset-x-0 z-0" aria-hidden="true">
        <div className="hero-bg-inner">
          <img src="/bg.png" alt="" className="hero-bg-image" />
          <div className="hero-bg-overlay" />
          <div className="hero-bg-fade" />
        </div>
      </div>
      <div className="relative z-[1]">
        <Navbar />
        <main>
          <Hero />
          <PlantPhilosophy />
          <TopSelling />
          <ShopStrip />
          <GrowingConditions />
          <GreenhouseVoices />
          <CultivateNewsletter />
          <BestO2 />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
