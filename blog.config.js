/**
 * @type {import('@/types').BlogConfig}
 */
const BLOG = {
  title: 'yokinist.me',
  author: 'yokinist',
  email: 'yokinist@gmail.com',
  link: 'https://yokinist.me',
  description: '色々なことを雑多に書いていく場所',
  lang: 'ja-JP', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP']
  appearance: 'dark', // ['light', 'dark', 'auto'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  lightBackground: '#ffffff', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#111827', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  since: 2021, // if leave this empty, current year will be used.
  postsPerPage: 7,
  sortByDate: true,
  showAbout: true, // WIP
  showArchive: true, // WIP
  autoCollapsedNavBar: false, // the automatically collapsed navigation bar
  socialLink: 'https://twitter.com/yokinist',
  seo: {
    keywords: ['yokinist'],
    googleSiteVerification: '' // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  analytics: {
    provider: 'ga', // Currently we support Google Analytics and Ackee, please fill with 'ga' or 'ackee', leave it empty to disable it.
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.craigary.net/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.craigary.net , don't end with a slash
      domainId: '' // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: 'G-PJ2C55Q3CH' // e.g: G-XXXXXXXXXX
    }
  },
  comment: {
    // support provider: gitalk, utterances, cusdis
    provider: '', // leave it empty if you don't need any comment plugin
    gitalkConfig: {
      repo: 'for-gitalk', // The repository of store comments
      owner: 'yokinist',
      clientID: 'f06077c5603d6099ec37',
      clientSecret: process.env.GITALK_CLIENT_SECRET,
      admin: ['yokinist'],
      id: 'yokinist.me', // Ensure uniqueness and length less than 50
      distractionFreeMode: false
    },
    utterancesConfig: {
      repo: ''
    },
    cusdisConfig: {
      appId: '4c9aa1e3-623a-4773-a9ef-f345f484efe5', // data-app-id'
      host: 'https://cusdis.com', // data-host, change this if you're using self-hosted version
      scriptSrc: 'https://cusdis.com/js/cusdis.es.js' // change this if you're using self-hosted version
    }
  },
  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}
// export default BLOG
module.exports = BLOG
