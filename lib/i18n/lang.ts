import BLOG from '~/blog.config';

const lang = {
  en: {
    NAV: {
      INDEX: 'Blog',
      RSS: 'RSS',
      SEARCH: 'Search',
      ABOUT: 'About',
    },
    PAGINATION: {
      PREV: 'Prev',
      NEXT: 'Next',
    },
    POST: {
      BACK: 'Back',
      TOP: 'Top',
      NOTFOUND: 'No posts found.',
      SEARCH: 'Search Articles',
      SEARCHIN: 'Search in',
    },
  },
  'zh-CN': {
    NAV: {
      INDEX: '博客',
      RSS: '订阅',
      SEARCH: '搜索',
      ABOUT: '关于',
    },
    PAGINATION: {
      PREV: '上一页',
      NEXT: '下一页',
    },
    POST: {
      BACK: '返回',
      TOP: '回到顶部',
      NOTFOUND: 'No posts found.',
      SEARCH: 'Search Articles',
      SEARCHIN: 'Search in',
    },
  },
  'zh-HK': {
    NAV: {
      INDEX: '網誌',
      RSS: '訂閱',
      SEARCH: '搜尋',
      ABOUT: '關於',
    },
    PAGINATION: {
      PREV: '上一頁',
      NEXT: '下一頁',
    },
    POST: {
      BACK: '返回',
      TOP: '回到頂端',
      NOTFOUND: 'No posts found.',
      SEARCH: 'Search Articles',
      SEARCHIN: 'Search in',
    },
  },
  'zh-TW': {
    NAV: {
      INDEX: '部落格',
      RSS: '訂閱',
      SEARCH: '搜尋',
      ABOUT: '關於',
    },
    PAGINATION: {
      PREV: '上一頁',
      NEXT: '下一頁',
    },
    POST: {
      BACK: '返回',
      TOP: '回到頂端',
      NOTFOUND: 'No posts found.',
      SEARCH: 'Search Articles',
      SEARCHIN: 'Search in',
    },
  },
  ja: {
    NAV: {
      INDEX: 'Blog',
      RSS: 'RSS',
      SEARCH: 'Search',
      ABOUT: 'About',
    },
    PAGINATION: {
      PREV: 'Prev',
      NEXT: 'Next',
    },
    POST: {
      BACK: 'Back',
      TOP: 'Top',
      NOTFOUND: '該当する記事はありません...🙇‍♂️',
      SEARCH: '記事を検索する',
      SEARCHIN: '',
    },
  },
  es: {
    NAV: {
      INDEX: 'Blog',
      RSS: 'RSS',
      SEARCH: 'Buscar',
      ABOUT: 'Acerca de mí',
    },
    PAGINATION: {
      PREV: 'Anterior',
      NEXT: 'Siguiente',
    },
    POST: {
      BACK: 'Atrás',
      TOP: 'Arriba',
      NOTFOUND: 'No posts found.',
      SEARCH: 'Search Articles',
      SEARCHIN: 'Search in',
    },
  },
} as const;

export const fetchLocaleLang = () => {
  switch (BLOG.lang.toLowerCase()) {
    case 'zh-cn':
    case 'zh-sg':
      return lang['zh-CN'];
    case 'zh-hk':
      return lang['zh-HK'];
    case 'zh-tw':
      return lang['zh-TW'];
    case 'ja':
    case 'ja-jp':
      return lang.ja;
    case 'es':
    case 'es-ES':
      return lang.es;
    case 'en':
    case 'en-us':
    default:
      return lang.en;
  }
};
