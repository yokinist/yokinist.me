import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { NotionAPI } from "notion-client";
import { cache } from "react";
import BLOG from "~/blog.config";
import type { Post } from "~/types";
import { toPosts } from "./toPosts";

const api = new NotionAPI({ authToken: BLOG.notionAccessToken });

// During `next build` many pages fetch the same Notion pages (the database,
// the profile), which trips Notion's rate limit. Share requests per build
// worker; ISR always fetches fresh data.
const pagesOnBuild = new Map<string, ReturnType<NotionAPI["getPage"]>>();

export const getPage = (id: string) => {
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) return api.getPage(id);
  const page = pagesOnBuild.get(id) ?? api.getPage(id);
  pagesOnBuild.set(id, page);
  return page;
};

// cache(): generateMetadata and the page share one fetch per request
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const id = BLOG.notionPageId;
  if (!id) throw new Error("NOTION_PAGE_ID is not set");
  return toPosts(await getPage(id), id, { sortByDate: BLOG.sortByDate });
});

export const getProfilePost = async (posts: Post[]) => {
  const post = posts.find((t) => t.slug === BLOG.profileSlug);
  if (!post) return { post: null, blockMap: null };
  return { post, blockMap: await getPage(post.id) };
};
