import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D3A4A",
          light: "#3E5060",
          deep: "#1A2530",
        },
        secondary: "#6B7D8D",
        accent: "#8FA3B3",
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#C4A030",
        },
        surface: "#F7F8F9",
        ink: "#1A1A1A",
        muted: "#6B7D8D",
        line: "#E0E4E8",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      fontSize: {
        h1: ["clamp(2.25rem, 5vw, 3.25rem)", { lineHeight: "1.15", fontWeight: "200" }],
        h2: ["clamp(1.75rem, 3.5vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "200" }],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "300" }],
        h4: ["1.125rem", { lineHeight: "1.4", fontWeight: "300" }],
        display: ["clamp(2.75rem, 7vw, 5rem)", { lineHeight: "1.05", fontWeight: "200" }],
      },
      backgroundImage: {
        "nexus-gradient": "linear-gradient(135deg, #2D3A4A 0%, #4A5E6F 50%, #6B7D8D 100%)",
        "nexus-gradient-dark": "linear-gradient(135deg, #2D3A4A 0%, #3E5060 100%)",
      },
      boxShadow: {
        nav: "0 2px 12px rgba(45, 58, 74, 0.08)",
        card: "0 4px 20px rgba(45, 58, 74, 0.08)",
        cardHover: "0 8px 32px rgba(45, 58, 74, 0.15)",
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-right": {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.9s ease-out both",
        "scale-in": "scale-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-right": "slide-right 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-left": "slide-left 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
