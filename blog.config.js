// @ts-check
/**
 * @type {import('~/types').BlogConfig}
 */
const BLOG = {
  title: "yokinist.me",
  author: "yokinist",
  email: "info@yokinist.me",
  link: "https://yokinist.me",
  externalLink: "https://bento.me/yokinist", // make redirect link to /link page
  repository: "https://github.com/yokinist/yokinist.me",
  description:
    "通り過ぎていく日々の解釈。思考の断片、近況報告など。言葉にして置いておく場所。",
  lang: "ja-JP", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  appearance: "dark", // ['light', 'dark'],
  font: "sans-serif", // ['sans-serif', 'serif']
  lightBackground: "#ffffff", // use hex value, don't forget '#' e.g #fffefc
  darkBackground: "#040808", // use hex value, don't forget '#'
  profileSlug: "profile",
  sortByDate: true,
  showAbout: true,
  showPostAuthor: false, // Show the author avatar and name above each post
  showPostFooter: false, // Show the share link below each post
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateURL: "https://simple-og-image.vercel.app", // The link to generate OG image, don't end with a slash
  // detail: https://github.com/yokinist/og-image/blob/main/api/_lib/types.ts#L2-L12
  socialLink: "https://twitter.com/yokinist",
  twitterUsername: "yokinist", // Without "@". Used for Twitter cards and share links
  // Display name and emoji for each tag slug used in your Notion database
  tags: {
    all: { name: "All", emoji: "🌴" },
    tech: { name: "技術", emoji: "💻" },
    music: { name: "音楽", emoji: "🎵" },
    book: { name: "本", emoji: "📚" },
    food: { name: "食", emoji: "🍙" },
    diary: { name: "日記", emoji: "📝" },
    boyaki: { name: "ぼやき", emoji: "💭" },
    link: { name: "外部リンク", emoji: "🔗" },
    "product-dev": { name: "プロダクト開発", emoji: "🛠" },
    org: { name: "組織", emoji: "🌱" },
  },
  seo: {
    keywords: ["yokinist"],
    googleSiteVerification: "", // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // The database ID (set in the environment)
  gaMeasurementId: "", // Google Analytics, e.g. G-XXXXXXXXXX. Leave empty to disable it.
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
};
// export default BLOG
module.exports = BLOG;
