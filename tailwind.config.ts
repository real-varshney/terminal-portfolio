import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: "class", // Enables dark mode with 'class' strategy
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Sets 'Inter' as default font
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
