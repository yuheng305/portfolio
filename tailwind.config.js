/** @type {import('tailwindcss').Config} */

// Semantic colours backed by CSS variables (see src/index.css), so light/dark
// themes swap in one place and components never need `dark:` variants.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        page: token("page"), // app background
        card: token("card"), // cards, sidebar, bars
        subtle: token("subtle"), // hover backgrounds, tags
        line: token("line"), // borders, dividers
        ink: token("ink"), // headings, strong text
        body: token("body"), // paragraph text
        muted: token("muted"), // secondary text
        faint: token("faint"), // captions, placeholders
        accent: token("accent"), // links, highlights
        "accent-soft": token("accent-soft"), // tinted backgrounds
        inverse: token("inverse"), // primary buttons, active nav
        "on-inverse": token("on-inverse"), // text on inverse
        success: token("success"),
        "success-soft": token("success-soft"),
      },
    },
  },
  plugins: [],
};
