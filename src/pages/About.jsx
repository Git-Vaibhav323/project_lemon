import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import mainLogo from "../assets/plants/mainlog.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigation = (hash) => {
    window.location.href = hash;
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // High-end Hero Parallax
      gsap.to(".about-hero-bg1", {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(".about-hero-bg2", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Split text like reveal for hero title
      gsap.from(".about-hero-title span", {
        y: 100,
        opacity: 0,
        rotation: 10,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });

      // Story Cards 3D reveal
      gsap.utils.toArray(".about-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          y: 100,
          rotationX: 15,
          transformPerspective: 1000,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        });
      });

      // Floating icons in cards
      gsap.utils.toArray(".about-icon").forEach((icon) => {
        gsap.to(icon, {
          y: -10,
          rotation: 5,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      });

      // Stats staggered counter reveal
      gsap.from(".about-stat", {
        scrollTrigger: {
          trigger: ".about-stats-container",
          start: "top 85%",
        },
        scale: 0.5,
        opacity: 0,
        rotation: -10,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)"
      });

      // CTA dynamic scale
      gsap.from(".about-cta-content", {
        scrollTrigger: {
          trigger: ".about-cta",
          start: "top 90%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.2)"
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-bg text-white overflow-x-hidden">
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
                    color: lbl === "About" ? "#9db59a" : "rgba(213,230,223,0.7)",
                    fontWeight: lbl === "About" ? 600 : 400,
                    borderBottom: lbl === "About" ? "2px solid #9db59a" : "2px solid transparent",
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
                  background: "linear-gradient(135deg, #9db59a 0%, #3bc98a 100%)",
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
      <section className="about-hero relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="about-hero-bg1 absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-[#9db59a]/20 rounded-full blur-[120px]" />
          <div className="about-hero-bg2 absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#3bc98a]/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 about-hero-title">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black mb-6 tracking-tighter overflow-hidden flex justify-center gap-4 flex-wrap" style={{ fontFamily: "Geist, sans-serif" }}>
              <span className="inline-block">Our</span> <span className="inline-block text-[#9db59a] italic">Story</span>
            </h1>
            <p className="about-hero-title text-xl sm:text-3xl text-white/60 max-w-4xl mx-auto font-light leading-relaxed overflow-hidden">
              <span className="inline-block">Where passion for plants meets a dedication to</span> <br className="hidden sm:block"/><span className="inline-block">sustainable, modern living.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* The Beginning */}
          <div className="about-section glass rounded-[3rem] p-10 sm:p-16 hover:-translate-y-4 transition-all duration-700 border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#9db59a]/10 to-transparent rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="md:w-1/3">
                <div className="about-icon w-20 h-20 rounded-3xl bg-gradient-to-br from-[#9db59a]/20 to-transparent flex items-center justify-center mb-8 border border-[#9db59a]/30 shadow-[0_0_30px_rgba(157,181,154,0.15)]">
                  <span className="text-4xl drop-shadow-xl">🌱</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "Geist, sans-serif" }}>The Beginning</h2>
                <div className="h-1.5 w-16 bg-gradient-to-r from-[#9db59a] to-transparent rounded-full" />
              </div>
              <div className="md:w-2/3 space-y-6 text-white/70 text-xl leading-relaxed font-light">
                <p>
                  It all started in 2018, in a small apartment in San Francisco. Our founder, Emma Chen, 
                  was struggling to keep her plants alive in the urban jungle. Despite her love for greenery, 
                  the demands of city life made it challenging to maintain a thriving indoor garden.
                </p>
                <p>
                  One day, while researching plant care, Emma realized that many people shared her struggle. 
                  The disconnect between plant enthusiasts and the right knowledge, tools, and quality plants 
                  was evident. That's when the idea for <span className="text-[#9db59a] font-medium border-b border-[#9db59a]/30 pb-1">Planto</span> was born.
                </p>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="about-section glass rounded-[3rem] p-10 sm:p-16 relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#3bc98a]/10 to-transparent rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row-reverse gap-12 items-center">
              <div className="md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right">
                <div className="about-icon w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-primary/20 to-transparent flex items-center justify-center mb-8 border border-brand-primary/30 shadow-[0_0_30px_rgba(157,181,154,0.15)]">
                  <span className="text-4xl drop-shadow-xl">🎯</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "Geist, sans-serif" }}>Our Mission</h2>
                <div className="h-1.5 w-16 bg-gradient-to-l from-brand-primary to-transparent rounded-full" />
              </div>
              <div className="md:w-2/3 space-y-6 text-white/80 text-xl leading-relaxed font-light">
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
          </div>

          {/* Our Values */}
          <div className="about-section glass rounded-[3rem] p-10 sm:p-16 relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="flex items-center gap-6 mb-12">
              <div className="about-icon w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-primary/20 to-transparent flex items-center justify-center border border-brand-primary/30 shadow-[0_0_30px_rgba(157,181,154,0.15)]">
                <span className="text-4xl drop-shadow-xl">💚</span>
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: "Geist, sans-serif" }}>Our Values</h2>
                <div className="h-1.5 w-16 bg-gradient-to-r from-brand-primary to-transparent rounded-full mt-4" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-10 mt-8">
              {[
                { title: "Sustainability", desc: "We source our plants ethically and use eco-friendly packaging to minimize our environmental impact." },
                { title: "Quality", desc: "Every plant is hand-selected and nurtured in our greenhouse before reaching your home." },
                { title: "Education", desc: "We empower our customers with knowledge through care guides and ongoing support." },
                { title: "Community", desc: "We're building a community of plant lovers who share tips, stories, and their green journey." },
              ].map((val, idx) => (
                <div key={idx} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors duration-300">
                  <h3 className="text-2xl font-semibold text-brand-primary mb-3">{val.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed font-light">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Today */}
          <div className="about-section glass rounded-[3rem] p-10 sm:p-16 relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3">
                <div className="about-icon w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-primary/20 to-transparent flex items-center justify-center mb-8 border border-brand-primary/30 shadow-[0_0_30px_rgba(157,181,154,0.15)]">
                  <span className="text-4xl drop-shadow-xl">🌿</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: "Geist, sans-serif" }}>Today</h2>
                <div className="h-1.5 w-16 bg-gradient-to-r from-brand-primary to-transparent rounded-full mt-4" />
              </div>
              <div className="md:w-2/3 space-y-6 text-white/80 text-xl leading-relaxed font-light">
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
                <p className="text-brand-primary font-medium text-2xl leading-snug mt-8 border-l-4 border-brand-primary pl-6">
                  But our story is just beginning. Every plant we deliver, every customer we help, and every 
                  space we transform is a new chapter in our journey to make the world a greener place.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats-container grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "200+", label: "Plant Varieties" },
              { number: "5 Years", label: "In Business" },
              { number: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="about-stat glass rounded-[2rem] p-8 text-center border border-brand-primary/20 hover:border-brand-primary/50 transition-colors duration-500 shadow-xl">
                <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-brand-primary to-white mb-3" style={{ fontFamily: "Geist, sans-serif" }}>
                  {stat.number}
                </div>
                <div className="text-base text-white/60 font-medium tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="about-cta about-section glass rounded-[3rem] p-10 sm:p-20 text-center relative overflow-hidden border border-[#9db59a]/30 shadow-[0_0_50px_rgba(157,181,154,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#9db59a]/10 to-transparent pointer-events-none" />
            <div className="about-cta-content relative z-10">
              <h2 className="text-5xl sm:text-6xl font-black mb-8" style={{ fontFamily: "Geist, sans-serif" }}>Join Our Green Journey</h2>
              <p className="text-white/70 text-xl sm:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Whether you're a seasoned plant parent or just starting out, we're here to help you grow. 
                Explore our collection and find your perfect plant companion today.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => handleNavigation("#shop")}
                  className="px-12 py-5 bg-[#9db59a] text-[#081612] font-bold text-lg rounded-full hover:bg-white transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(78,222,163,0.4)]"
                >
                  Shop Plants
                </button>
                <button
                  onClick={() => handleNavigation("#home")}
                  className="px-12 py-5 border-2 border-[#9db59a]/40 text-[#9db59a] font-bold text-lg rounded-full hover:border-[#9db59a] transition-all duration-300 hover:bg-[#9db59a]/10"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-20 relative z-20">
        <div className="max-w-6xl mx-auto text-center text-white/50 font-light">
          <p>&copy; 2024 Planto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
