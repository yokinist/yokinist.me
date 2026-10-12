import {
  createDedupe,
  createRequestLimiter,
  fetchBlockTree,
  queryDatabase,
} from "@yokinist/notion-fetch";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { cache } from "react";
import BLOG from "~/blog.config";
import type { Post } from "~/types";
import { notion } from "./client";
import { pageToPost, publishedPosts } from "./toPosts";

export type { NotionBlock } from "@yokinist/notion-fetch";

// Notion allows about 3 requests per second per integration, and CI and
// Vercel may build at the same time: cap requests in flight per process
export const limit = createRequestLimiter();

// During `next build` many pages fetch the same data (the database, the
// profile), so share it per build worker; ISR always fetches fresh data
const dedupe = createDedupe();
const onBuild = <T>(key: string, fetch: () => Promise<T>): Promise<T> =>
  process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
    ? dedupe(key, fetch)
    : fetch();

// cache(): generateMetadata and the page share one fetch per request
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const id = BLOG.notionPageId;
  if (!id) throw new Error("NOTION_PAGE_ID is not set");
  if (!process.env.NOTION_TOKEN) throw new Error("NOTION_TOKEN is not set");
  const rows = await onBuild(`rows:${id}`, () =>
    queryDatabase(notion, id, { limit }),
  );
  return publishedPosts(rows.map(pageToPost), { sortByDate: BLOG.sortByDate });
});

// The content of a page, with nested blocks under `children`
export const getBlocks = (pageId: string) =>
  onBuild(`blocks:${pageId}`, () => fetchBlockTree(notion, pageId, { limit }));

export const getProfilePost = async (posts: Post[]) => {
  const post = posts.find((t) => t.slug === BLOG.profileSlug);
  if (!post) return { post: null, blocks: null };
  return { post, blocks: await getBlocks(post.id) };
};
