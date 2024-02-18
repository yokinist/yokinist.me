export type PostType = "Post" | "Page";

export type PostStatus = "Idea" | "Published" | "Revise";

export type Post = {
  id: string;
  createdTime: string;
  fullWidth: boolean;
  title?: string;
  slug?: string;
  outer_link?: string;
  summary?: string;
  tags?: string[];
  date: {
    start_date?: string;
  };
  status?: [PostStatus];
  type?: [PostType];
  repo_url: string;
  thumbnail_url: string;
};

export type TagObj = { [key: string]: number };

export type BlogConfig = {
  title: string;
  author: string;
  email: string;
  link: string;
  externalHPLink: string;
  description: string;
  lang: "en-US" | "zh-CN" | "zh-HK" | "zh-TW" | "ja-JP" | "es-ES";
  appearance: "dark" | "light";
  font: "sans-serif" | "serif";
  lightBackground: `#${string}`;
  darkBackground: `#${string}`;
  path: string;
  profileSlug: string;
  since: number;
  sortByDate: boolean;
  showAbout: boolean;
  showArchive: boolean;
  autoCollapsedNavBar: boolean;
  ogImageGenerateURL: string;
  socialLink: string;
  seo: {
    keywords: string[];
    googleSiteVerification: string;
  };
  notionPageId: string;
  notionAccessToken: string;
  analytics: {
    provider: "ga" | "ackee";
    ackeeConfig: {
      tracker: string;
      dataAckeeServer: string;
      domainId: string;
    };
    gaConfig: {
      measurementId: `G-${string}`;
    };
  };
  isProd: "development" | "preview" | "production";
};
