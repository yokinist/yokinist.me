const BLOG = require("./blog.config");
const CJK = require("./lib/cjk");
// CJK fonts installed on each OS, so no web font has to be downloaded
const systemSansCJK = {
  JP: [
    '"Hiragino Kaku Gothic ProN"',
    '"Hiragino Sans"',
    '"Yu Gothic UI"',
    "Meiryo",
  ],
  SC: ['"PingFang SC"', '"Microsoft YaHei"'],
  TC: ['"PingFang TC"', '"Microsoft JhengHei"'],
  KR: ['"Apple SD Gothic Neo"', '"Malgun Gothic"'],
};
const systemSerifCJK = {
  JP: ['"Hiragino Mincho ProN"', '"Yu Mincho"'],
  SC: ['"Songti SC"', "SimSun"],
  TC: ['"Songti TC"', "PMingLiU"],
  KR: ['"AppleMyungjo"', "Batang"],
};
const fontSansCJK = !CJK()
  ? []
  : [
      ...systemSansCJK[CJK()],
      `"Noto Sans CJK ${CJK()}"`,
      `"Noto Sans ${CJK()}"`,
    ];
const fontSerifCJK = !CJK()
  ? []
  : [
      ...systemSerifCJK[CJK()],
      `"Noto Serif CJK ${CJK()}"`,
      `"Noto Serif ${CJK()}"`,
    ];

/**
 * @type {import('tailwindcss').Config}
 */
const tailwindConfig = {
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
        sans: [
          "var(--font-latin-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
          ...fontSansCJK,
        ],
        serif: [
          "var(--font-latin-serif)",
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
          ...fontSerifCJK,
        ],
      },
    },
  },
  plugins: [],
};

module.exports = tailwindConfig;
