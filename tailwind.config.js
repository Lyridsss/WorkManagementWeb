/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        // eslint-disable-next-line no-undef
        ...require("daisyui/src/theming/themes")["light"],
        "accent-content": "#1c1917",
        "base-100": "#f9fafb",
        "base-200": "#f3f4f6",
        "base-300": "#e5e7eb",
      },
    },],
    darkTheme: "light",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}

