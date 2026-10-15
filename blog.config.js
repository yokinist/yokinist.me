// @ts-check
/**
 * @type {import('~/types').BlogConfig}
 */
const BLOG = {
  title: "yokinist.me template",
  author: "yokinist",
  email: "info@yokinist.me",
  link: "https://yokinist.me",
  externalLink: "https://bento.me/yokinist", // make redirect link to /link page
  repository: "https://github.com/yokinist/yokinist.me",
  description:
    "This is a template for yokinist.me, created by yokinist. You can use it to create your own blog.",
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  appearance: "dark", // ['light', 'dark'],
  font: "sans-serif", // ['sans-serif', 'serif']
  lightBackground: "#ffffff", // use hex value, don't forget '#' e.g #fffefc
  darkBackground: "#040808", // use hex value, don't forget '#'
  profileSlug: "profile",
  sortByDate: true,
  showAbout: true,
  showPostAuthor: true, // Show the author avatar and name above each post
  showPostFooter: true, // Show the share link below each post
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateURL: "https://simple-og-image.vercel.app", // The service that draws OG images, without a trailing slash. See README
  ogImageLogo: "", // An https image shown on OG images, e.g. "https://github.com/<you>.png". Leave empty for none
  socialLink: "https://twitter.com/yokinist",
  twitterUsername: "yokinist", // Without "@". Used for Twitter cards and share links
  // Display name and emoji for each tag slug used in your Notion database
  tags: {
    all: { name: "All", emoji: "🌴" },
    news: { name: "News", emoji: "📰" },
    cooking: { name: "Cooking", emoji: "🍳" },
    music: { name: "Music", emoji: "🎵" },
    design: { name: "Design", emoji: "🎨" },
    link: { name: "Link", emoji: "🔗" },
    book: { name: "Book", emoji: "📚" },
    art: { name: "Art", emoji: "🖼" },
    food: { name: "Food", emoji: "🍙" },
    tech: { name: "Tech", emoji: "💻" },
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
