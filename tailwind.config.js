/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        "primary-50": "#EBEEFD",
        "primary-100": "#D8DDFA",
        "primary-200": "#B0BCF6",
        "primary-300": "#899AF1",
        "primary-400": "#6179ED",
        "primary-500": "#3A57E8",
        "primary-600": "#2E46BA",
        "primary-700": "#23348B",
        "primary-800": "#17235D",
        "primary-900": "#0C112E",
      },
    },
  },
  plugins: [],
};
