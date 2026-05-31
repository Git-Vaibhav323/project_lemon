import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const sectionRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Thank you! We'll get back to you soon.");
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setStatus("");
    }, 3000);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".contact-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
      gsap.from(".contact-form > *", {
        scrollTrigger: {
          trigger: ".contact-form-container",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
      gsap.from(".contact-info > *", {
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 90%",
        },
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="contact-header text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get in <span className="text-brand-primary">Touch</span>
          </h2>
          <p className="contact-header text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Have questions about our plants or need care advice? We're here to help you grow your green sanctuary.
          </p>
        </div>

        <div className="contact-form-container glass rounded-2xl p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="contact-form space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all resize-none"
                placeholder="Tell us about your plant needs..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-brand-primary text-brand-bg font-semibold text-base sm:text-lg hover:bg-brand-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Send Message
            </button>

            {status && (
              <div className="text-center text-brand-primary font-medium animate-fade-in">
                {status}
              </div>
            )}
          </form>

          <div className="contact-info mt-10 pt-8 border-t border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-brand-primary font-semibold mb-1">Email</div>
                <a href="mailto:hello@planto.com" className="text-white/60 hover:text-brand-primary transition-colors text-sm">
                  hello@planto.com
                </a>
              </div>
              <div>
                <div className="text-brand-primary font-semibold mb-1">Phone</div>
                <a href="tel:+1234567890" className="text-white/60 hover:text-brand-primary transition-colors text-sm">
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <div className="text-brand-primary font-semibold mb-1">Location</div>
                <p className="text-white/60 text-sm">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
