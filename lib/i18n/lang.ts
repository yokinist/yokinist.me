import BLOG from "~/blog.config";

const lang = {
  en: {
    NAV: {
      INDEX: "Blog",
      ABOUT: "About",
    },
    POST: {
      RANDOM: "Random post",
      PREV: "Previous",
      NEXT: "Next",
      HOME: "Home",
      SHARE: "Share with Twitter",
      NOTFOUND: "No posts found.",
      SEARCH: "Search Articles",
      SEARCHIN: "Search in",
    },
  },
  "zh-CN": {
    NAV: {
      INDEX: "博客",
      ABOUT: "关于",
    },
    POST: {
      RANDOM: "随机文章",
      PREV: "上一篇",
      NEXT: "下一篇",
      HOME: "首页",
      SHARE: "Share with Twitter",
      NOTFOUND: "No posts found.",
      SEARCH: "Search Articles",
      SEARCHIN: "Search in",
    },
  },
  "zh-HK": {
    NAV: {
      INDEX: "網誌",
      ABOUT: "關於",
    },
    POST: {
      RANDOM: "隨機文章",
      PREV: "上一篇",
      NEXT: "下一篇",
      HOME: "首頁",
      SHARE: "Share with Twitter",
      NOTFOUND: "No posts found.",
      SEARCH: "Search Articles",
      SEARCHIN: "Search in",
    },
  },
  "zh-TW": {
    NAV: {
      INDEX: "部落格",
      ABOUT: "關於",
    },
    POST: {
      RANDOM: "隨機文章",
      PREV: "上一篇",
      NEXT: "下一篇",
      HOME: "首頁",
      SHARE: "Share with Twitter",
      NOTFOUND: "No posts found.",
      SEARCH: "Search Articles",
      SEARCHIN: "Search in",
    },
  },
  ja: {
    NAV: {
      INDEX: "Blog",
      ABOUT: "About",
    },
    POST: {
      RANDOM: "ランダムに読む",
      PREV: "前の記事",
      NEXT: "次の記事",
      HOME: "ホーム",
      SHARE: "Twitter でシェアする",
      NOTFOUND: "該当する記事はありません...🙇",
      SEARCH: "記事を検索する",
      SEARCHIN: "",
    },
  },
  es: {
    NAV: {
      INDEX: "Blog",
      ABOUT: "Acerca de mí",
    },
    POST: {
      RANDOM: "Artículo al azar",
      PREV: "Anterior",
      NEXT: "Siguiente",
      HOME: "Inicio",
      SHARE: "Share with Twitter",
      NOTFOUND: "No posts found.",
      SEARCH: "Search Articles",
      SEARCHIN: "Search in",
    },
  },
} as const;

export const fetchLocaleLang = () => {
  const s = BLOG.lang.toLowerCase();
  if (s === "zh-cn" || s === "zh-sg") {
    return lang["zh-CN"];
  }
  if (s === "zh-hk") {
    return lang["zh-HK"];
  }
  if (s === "zh-tw") {
    return lang["zh-TW"];
  }
  if (s === "ja" || s === "ja-jp") {
    return lang.ja;
  }
  if (s === "es" || s === "es-ES") {
    return lang.es;
  }
  return lang.en;
};
