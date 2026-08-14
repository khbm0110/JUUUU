import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1E3A8A", deep: "#122a63" },
        gold: { DEFAULT: "#B45309", light: "#D97706", pale: "#FDF1E4" },
        ink: "#0F172A",
        muted: "#E9EEF5",
        border: "#CBD5E1",
        bg: "#F8FAFC",
      },
      fontFamily: {
        head: ["var(--font-playfair)", "var(--font-noto-naskh)", "serif"],
        body: ["var(--font-inter)", "var(--font-noto-sans-ar)", "sans-serif"],
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(18px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-in-start": { "0%": { opacity: "0", transform: "translateX(-24px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        "slide-in-end": { "0%": { opacity: "0", transform: "translateX(24px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        "scale-in": { "0%": { opacity: "0", transform: "scale(0.94)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        "reveal-line": { "0%": { transform: "scaleX(0)" }, "100%": { transform: "scaleX(1)" } },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fade-in 0.9s ease forwards",
        "slide-in-start": "slide-in-start 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "slide-in-end": "slide-in-end 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        "reveal-line": "reveal-line 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
