import { useState, useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopSelling from "./components/TopSelling";
import CustomerReviews from "./components/CustomerReviews";
import BestO2 from "./components/BestO2";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import About from "./pages/About";

export default function App() {
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
    const onHashChange = () => setHash(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  const isShop = hash === "#shop";
  const isAbout = hash === "#about";

  if (isShop) {
    return <Shop />;
  }

  if (isAbout) {
    return <About />;
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white relative w-full overflow-x-clip">
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
          <TopSelling />
          <CustomerReviews />
          <BestO2 />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
