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
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateURL: "https://simple-og-image.vercel.app", // The link to generate OG image, don't end with a slash
  // detail: https://github.com/yokinist/og-image/blob/main/api/_lib/types.ts#L2-L12
  socialLink: "https://twitter.com/yokinist",
  seo: {
    keywords: ["yokinist"],
    googleSiteVerification: "", // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  gaMeasurementId: "", // Google Analytics, e.g. G-XXXXXXXXXX. Leave empty to disable it.
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
};
// export default BLOG
module.exports = BLOG;
