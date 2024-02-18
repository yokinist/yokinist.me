import { ValueOf } from "lib/types";

const TAG_SLUGS = {
  All: "all",
  Tech: "tech",
  Update: "update",
  Music: "music",
  Book: "book",
  Playlist: "playlist",
  CultureBook: "culture-book",
  Art: "art",
  Food: "food",
  Event: "event",
  Diary: "diary",
  ThinkingFragments: "thinking-fragments",
  Sento: "sento",
  Link: "link",
  ProductDev: "product-dev",
  Sauna: "sauna",
  Items: "items",
  Notion: "notion",
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
  [TAG_SLUGS.Update]: {
    name: "アップデート",
    emoji: "📝",
    slug: TAG_SLUGS.Update,
  },
  [TAG_SLUGS.Music]: {
    name: "音楽",
    emoji: "🎵",
    slug: TAG_SLUGS.Music,
  },
  [TAG_SLUGS.Playlist]: {
    name: "プレイリスト",
    emoji: "🎧",
    slug: TAG_SLUGS.Playlist,
  },
  [TAG_SLUGS.ThinkingFragments]: {
    name: "思考の断片",
    emoji: "💭",
    slug: TAG_SLUGS.ThinkingFragments,
  },
  [TAG_SLUGS.Sento]: {
    name: "銭湯",
    emoji: "♨️",
    slug: TAG_SLUGS.Sento,
  },
  [TAG_SLUGS.Sauna]: {
    name: "サウナ",
    emoji: "🧖‍♂️",
    slug: TAG_SLUGS.Sauna,
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
  [TAG_SLUGS.Items]: {
    name: "アイテム",
    emoji: "✨",
    slug: TAG_SLUGS.Items,
  },
  [TAG_SLUGS.Notion]: {
    name: "Notion",
    emoji: "📓",
    slug: TAG_SLUGS.Notion,
  },
  [TAG_SLUGS.CultureBook]: {
    name: "カルチャーブック",
    emoji: "📖",
    slug: TAG_SLUGS.CultureBook,
  },
  [TAG_SLUGS.Book]: {
    name: "本",
    emoji: "📚",
    slug: TAG_SLUGS.Book,
  },
  [TAG_SLUGS.Art]: {
    name: "美術・芸術",
    emoji: "🖼️",
    slug: TAG_SLUGS.Art,
  },
  [TAG_SLUGS.Food]: {
    name: "食",
    emoji: "🍙",
    slug: TAG_SLUGS.Food,
  },
  [TAG_SLUGS.Event]: {
    name: "イベント",
    emoji: "🎪",
    slug: TAG_SLUGS.Event,
  },
  [TAG_SLUGS.Diary]: {
    name: "近況報告",
    emoji: "📢",
    slug: TAG_SLUGS.Diary,
  },
  [TAG_SLUGS.All]: {
    name: "All",
    emoji: "🌴",
    slug: TAG_SLUGS.All,
  },
} as const;

export const getTagDataBySlug = (slug: TagSlug): TagData => TAG_DATA[slug];
