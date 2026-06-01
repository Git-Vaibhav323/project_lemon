/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#2d2416",
          bg: "#faf7f2",
          card: "#ffffff",
          green: "#4CAF50",
          forest: "#1B4332",
          light: "#6aab5e",
          accent: "#3D8B40",
          glow: "#E9F5DB",
          teal: "#4CAF50",
          cream: "#faf7f2",
          offwhite: "#F8F9FA",
          sand: "#f2ede3",
          bark: "#8b6f47",
          moss: "#4CAF50",
        },
      },
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glass: "0 4px 24px rgba(74, 122, 69, 0.08), 0 1px 4px rgba(0,0,0,0.06)",
        float: "0 12px 40px rgba(74, 122, 69, 0.12), 0 2px 8px rgba(0,0,0,0.06)",
        card: "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};
