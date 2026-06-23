import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          950: "#0a0c0f",
          900: "#0e1116",
          800: "#161b22",
          700: "#21262d",
          600: "#30363d",
          500: "#484f58",
          400: "#6e7681",
          300: "#9da7b3",
        },
        zinc: {
          accent: "#7dd3fc",
        },
        ember: "#ff6b35",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
