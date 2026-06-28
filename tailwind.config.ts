import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette taken from the Safe Steels brochure
        navy: {
          50: "#eff5ff",
          100: "#dbe8fe",
          200: "#bdd5fd",
          300: "#90b8fb",
          400: "#5d93f6",
          500: "#3a72ef",
          600: "#2456e3", // vibrant royal accents
          700: "#1e4ed1", // primary brand blue (lighter, more vibrant)
          800: "#1d44ad",
          900: "#1c3c8f",
          950: "#162e6b",
        },
        orange: {
          50: "#fef5e8",
          100: "#fde6c4",
          200: "#fbcf8c",
          300: "#f9b452",
          400: "#f89c2a",
          500: "#f7941d", // brochure orange
          600: "#e07d10",
          700: "#bb620f",
          800: "#954e14",
        },
        ink: {
          DEFAULT: "#0f1d3d", // navy-tinted body text
          soft: "#3a456b",
          muted: "#6b7494",
        },
        surface: {
          DEFAULT: "#ffffff",
          50: "#f6f9fd",
          100: "#eef3fb", // light page tint / scene fill
          200: "#e2eaf6",
          300: "#d2ddef",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,29,61,0.04), 0 12px 32px -12px rgba(15,29,61,0.18)",
        "card-lg": "0 2px 4px rgba(15,29,61,0.05), 0 24px 60px -20px rgba(15,29,61,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
