import { useState, useEffect } from "react";
import mainLogo from "../assets/plants/mainlog.png";

export default function About() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigation = (hash) => {
    window.location.href = hash;
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <nav
          className={`w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 mt-2 rounded-2xl transition-all duration-500 ${
            scrolled ? "glass shadow-glass py-1.5" : "bg-transparent py-1.5 sm:py-2"
          }`}
        >
          <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
            <a
              href="#home"
              className="group shrink-0 transition-opacity duration-300 hover:opacity-90 flex items-center gap-2"
            >
              <img 
                src={mainLogo} 
                alt="Planto Logo" 
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span 
                className="font-bold tracking-tight text-brand-primary hidden sm:inline"
                style={{ fontFamily: "Geist,sans-serif", fontSize: "24px" }}
              >
                Planto
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              {[
                ["Home", "#home"],
                ["Shop", "#shop"],
                ["About", "#about"],
                ["Contact", "#home"],
              ].map(([lbl, href]) => (
                <a
                  key={lbl}
                  href={href}
                  className="nav-link"
                  style={{
                    color: lbl === "About" ? "#4edea3" : "rgba(213,230,223,0.7)",
                    fontWeight: lbl === "About" ? 600 : 400,
                    borderBottom: lbl === "About" ? "2px solid #4edea3" : "2px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {lbl}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#shop"
                className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #4edea3 0%, #3bc98a 100%)",
                  color: "#003824",
                  boxShadow: "0 4px 12px rgba(78, 222, 163, 0.3)",
                }}
              >
                <span>Buy Now</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Our <span className="text-brand-primary">Story</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Where passion for plants meets dedication to sustainable living
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* The Beginning */}
          <div className="glass rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h2 className="text-3xl font-bold">The Beginning</h2>
            </div>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                It all started in 2018, in a small apartment in San Francisco. Our founder, Emma Chen, 
                was struggling to keep her plants alive in the urban jungle. Despite her love for greenery, 
                the demands of city life made it challenging to maintain a thriving indoor garden.
              </p>
              <p>
                One day, while researching plant care, Emma realized that many people shared her struggle. 
                The disconnect between plant enthusiasts and the right knowledge, tools, and quality plants 
                was evident. That's when the idea for Planto was born.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="glass rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                At Planto, we believe that everyone deserves to experience the joy and benefits of living 
                with plants. Our mission is to make plant parenthood accessible, enjoyable, and sustainable 
                for urban dwellers and plant enthusiasts alike.
              </p>
              <p>
                We carefully curate each plant in our collection, ensuring they're not only beautiful but 
                also suited for modern living spaces. From low-maintenance succulents to air-purifying 
                tropical plants, we provide everything you need to create your own green sanctuary.
              </p>
            </div>
          </div>

          {/* Our Values */}
          <div className="glass rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                <span className="text-2xl">💚</span>
              </div>
              <h2 className="text-3xl font-bold">Our Values</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-brand-primary">Sustainability</h3>
                <p className="text-white/70">
                  We source our plants ethically and use eco-friendly packaging to minimize our environmental impact.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-brand-primary">Quality</h3>
                <p className="text-white/70">
                  Every plant is hand-selected and nurtured in our greenhouse before reaching your home.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-brand-primary">Education</h3>
                <p className="text-white/70">
                  We empower our customers with knowledge through care guides and ongoing support.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-brand-primary">Community</h3>
                <p className="text-white/70">
                  We're building a community of plant lovers who share tips, stories, and their green journey.
                </p>
              </div>
            </div>
          </div>

          {/* Today */}
          <div className="glass rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <h2 className="text-3xl font-bold">Today</h2>
            </div>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                From that small apartment, Planto has grown into a thriving business serving thousands of 
                plant parents across the country. We've helped transform countless homes and offices into 
                vibrant, oxygen-rich spaces that promote well-being and productivity.
              </p>
              <p>
                Our team has expanded to include botanists, designers, and plant care specialists who share 
                Emma's original vision. Together, we continue to innovate, bringing rare specimens, 
                sustainable practices, and expert knowledge to our growing community.
              </p>
              <p className="text-brand-primary font-semibold">
                But our story is just beginning. Every plant we deliver, every customer we help, and every 
                space we transform is a new chapter in our journey to make the world a greener place.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "200+", label: "Plant Varieties" },
              { number: "5 Years", label: "In Business" },
              { number: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="glass rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Green Journey</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Whether you're a seasoned plant parent or just starting out, we're here to help you grow. 
              Explore our collection and find your perfect plant companion today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleNavigation("#shop")}
                className="px-8 py-4 bg-brand-primary text-brand-bg font-semibold rounded-full hover:bg-brand-primary/90 transition-all duration-300 hover:scale-105"
              >
                Shop Plants
              </button>
              <button
                onClick={() => handleNavigation("#home")}
                className="px-8 py-4 border-2 border-brand-primary text-brand-primary font-semibold rounded-full hover:bg-brand-primary/10 transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-white/60">
          <p>&copy; 2024 Planto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
