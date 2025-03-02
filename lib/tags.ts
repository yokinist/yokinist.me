import { ValueOf } from "lib/types";

const TAG_SLUGS = {
  All: "all",
  Tech: "tech",
  Music: "music",
  Book: "book",
  Food: "food",
  Diary: "diary",
  Boyaki: "boyaki",
  Link: "link",
  ProductDev: "product-dev",
  Org: "org",
} as const;

export type TagSlug = ValueOf<typeof TAG_SLUGS>;

type TagData = {
  slug: string;
  name: string;
  emoji: string;
};

const TAG_DATA: Record<TagSlug, TagData> = {
  [TAG_SLUGS.Tech]: {
    name: "技術",
    emoji: "💻",
    slug: TAG_SLUGS.Tech,
  },
  [TAG_SLUGS.Music]: {
    name: "音楽",
    emoji: "🎵",
    slug: TAG_SLUGS.Music,
  },
  [TAG_SLUGS.Book]: {
    name: "本",
    emoji: "📚",
    slug: TAG_SLUGS.Book,
  },
  [TAG_SLUGS.Food]: {
    name: "食",
    emoji: "🍙",
    slug: TAG_SLUGS.Food,
  },
  [TAG_SLUGS.Diary]: {
    name: "日記",
    emoji: "📝",
    slug: TAG_SLUGS.Diary,
  },
  [TAG_SLUGS.Boyaki]: {
    name: "ぼやき",
    emoji: "💭",
    slug: TAG_SLUGS.Boyaki,
  },
  [TAG_SLUGS.Link]: {
    name: "外部リンク",
    emoji: "🔗",
    slug: TAG_SLUGS.Link,
  },
  [TAG_SLUGS.ProductDev]: {
    name: "プロダクト開発",
    emoji: "🛠",
    slug: TAG_SLUGS.ProductDev,
  },
  [TAG_SLUGS.Org]: {
    name: "組織",
    emoji: "🌱",
    slug: TAG_SLUGS.Org,
  },
  [TAG_SLUGS.All]: {
    name: "All",
    emoji: "🌴",
    slug: TAG_SLUGS.All,
  },
} as const;

export const isTagSlug = (slug: string): slug is TagSlug =>
  (Object.values(TAG_SLUGS) as string[]).includes(slug);

export const getTagDataBySlug = (slug: TagSlug): TagData => TAG_DATA[slug];
