import { ValueOf } from "lib/types";

// NOTE: you can customize tags to match the tags in your Notion database
const TAG_SLUGS = {
  All: "all",
  Cooking: "cooking",
  Art: "art",
  Music: "music",
  Design: "design",
  Book: "book",
  Food: "food",
  Link: "link",
  News: "news",
  Tech: "tech",
} as const;

export type TagSlug = ValueOf<typeof TAG_SLUGS>;

type TagData = {
  slug: string;
  name: string;
  emoji: string;
};

const TAG_DATA: Record<TagSlug, TagData> = {
  [TAG_SLUGS.News]: {
    name: "News",
    emoji: "📰",
    slug: TAG_SLUGS.News,
  },
  [TAG_SLUGS.Cooking]: {
    name: "Cooking",
    emoji: "🍳",
    slug: TAG_SLUGS.Cooking,
  },
  [TAG_SLUGS.Music]: {
    name: "Music",
    emoji: "🎵",
    slug: TAG_SLUGS.Music,
  },
  [TAG_SLUGS.Design]: {
    name: "Design",
    emoji: "🎨",
    slug: TAG_SLUGS.Design,
  },
  [TAG_SLUGS.Link]: {
    name: "Link",
    emoji: "🔗",
    slug: TAG_SLUGS.Link,
  },
  [TAG_SLUGS.Book]: {
    name: "Book",
    emoji: "📚",
    slug: TAG_SLUGS.Book,
  },
  [TAG_SLUGS.Art]: {
    name: "Art",
    emoji: "🖼",
    slug: TAG_SLUGS.Art,
  },
  [TAG_SLUGS.Food]: {
    name: "Food",
    emoji: "🍙",
    slug: TAG_SLUGS.Food,
  },
  [TAG_SLUGS.Tech]: {
    name: "Tech",
    emoji: "💻",
    slug: TAG_SLUGS.Tech,
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
