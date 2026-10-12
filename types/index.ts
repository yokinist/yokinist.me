export type PostType = "Post" | "Page";

export type PostStatus = "Idea" | "Published" | "Revise";

export type Post = {
  id: string;
  createdTime: string;
  fullWidth: boolean;
  title: string;
  slug: string;
  outer_link?: string;
  summary?: string;
  tags?: string[];
  date: {
    start_date?: string;
  };
  status?: [PostStatus];
  type?: [PostType];
  thumbnail_url: string;
};

export type TagObj = { [key: string]: number };

export type BlogConfig = {
  title: string;
  author: string;
  email: string;
  link: string;
  externalLink: string;
  repository: string;
  description: string;
  lang: "en-US" | "zh-CN" | "zh-HK" | "zh-TW" | "ja-JP" | "es-ES";
  appearance: "dark" | "light";
  font: "sans-serif" | "serif";
  lightBackground: `#${string}`;
  darkBackground: `#${string}`;
  profileSlug: string;
  sortByDate: boolean;
  showAbout: boolean;
  showPostAuthor: boolean;
  showPostFooter: boolean;
  autoCollapsedNavBar: boolean;
  ogImageGenerateURL: string;
  socialLink: string;
  twitterUsername: string;
  tags: Record<string, { name: string; emoji?: string }>;
  seo: {
    keywords: string[];
    googleSiteVerification: string;
  };
  notionPageId: string | undefined;
  notionAccessToken: string | undefined;
  gaMeasurementId: "" | `G-${string}`;
  isProd: boolean;
};
