import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette taken from the Safe Steels brochure
        navy: {
          50: "#eef6ff",
          100: "#d8eafe",
          200: "#b5d6fd",
          300: "#84bbfb",
          400: "#4d9bf6",
          500: "#2480ec", // vibrant azure
          600: "#1267d8", // bright royal-blue accents (no violet cast)
          700: "#1059bd", // primary brand blue
          800: "#124c9c",
          900: "#123f7e",
          950: "#0f2f5e",
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
          DEFAULT: "#0f1d3a", // navy-tinted body text
          soft: "#3f4a5e", // neutral slate (no violet cast)
          muted: "#6c7589",
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
