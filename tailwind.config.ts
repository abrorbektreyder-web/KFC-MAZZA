import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0B0E",
        surface: {
          50: "#22242C",
          100: "#1A1B22",
          200: "#14151B",
          300: "#0F1014",
          DEFAULT: "#131418",
        },
        crispy: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#FF7A00", // Brand Primary
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          DEFAULT: "#FF7A00",
        },
        spicy: {
          500: "#E53835",
          600: "#D32F2F",
          700: "#B71C1C",
          DEFAULT: "#E53835",
        },
        ivory: {
          100: "#FFFFFF",
          200: "#F7F7F2",
          300: "#E2E2DC",
          400: "#9E9EA0",
          DEFAULT: "#F7F7F2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        "glow-orange": "0 0 35px -5px rgba(255, 122, 0, 0.35)",
        "glow-red": "0 0 35px -5px rgba(229, 56, 53, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1.5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
