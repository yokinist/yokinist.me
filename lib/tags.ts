import BLOG from "~/blog.config";

export type TagSlug = string;

export const isTagSlug = (slug: string): slug is TagSlug => slug in BLOG.tags;

export const getTagDataBySlug = (slug: TagSlug) => BLOG.tags[slug];
