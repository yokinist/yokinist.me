const BLOG = require("./blog.config");
const { fontFamily } = require("tailwindcss/defaultTheme");
const CJK = require("./lib/cjk");
const fontSansCJK = !CJK()
  ? []
  : [`"Noto Sans CJK ${CJK()}"`, `"Noto Sans ${CJK()}"`];
const fontSerifCJK = !CJK()
  ? []
  : [`"Noto Serif CJK ${CJK()}"`, `"Noto Serif ${CJK()}"`];

/**
 * @type {import('tailwindcss').Config}
 */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: BLOG.lightBackground || "#ffffff",
        },
        night: {
          DEFAULT: BLOG.darkBackground || "#111827",
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', ...fontFamily.sans, ...fontSansCJK],
        serif: ['"Source Serif"', ...fontFamily.serif, ...fontSerifCJK],
      },
    },
  },
  plugins: [],
};

module.exports = tailwindConfig;
