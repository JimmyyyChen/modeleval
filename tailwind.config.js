/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#497174",

          "primary-content": "#ffffff",

          secondary: "#D6E4E5",

          "secondary-content": "#000000",

          accent: "#EB6440",

          "accent-content": "#ffffff",

          neutral: "#000000",

          "neutral-content": "#ffffff",

          "base-100": "#ffffff",

          info: "#5eead4",

          success: "#10b981",

          warning: "#facc15",

          error: "#ef4444",
        },
      },
    ],
  },
  plugins: [
    // require("@tailwindcss/forms")({ strategy: "class" }), // this fixes collapse bug in daisyui, see https://stackoverflow.com/questions/76715043/tailwind-daisyui-accordion-and-switch-are-not-working
    require("daisyui"),
  ],
};
