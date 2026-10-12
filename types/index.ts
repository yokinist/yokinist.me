export type PostType = "Post" | "Page";

// A row of the Notion database, mapped by property name
export type Post = {
  id: string;
  createdTime: string;
  title: string;
  slug: string;
  type?: string;
  status?: string;
  date?: string;
  tags?: string[];
  summary?: string;
  outer_link?: string;
};

export type PostLink = Pick<Post, "title" | "slug">;

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
  gaMeasurementId: "" | `G-${string}`;
  isProd: boolean;
};
