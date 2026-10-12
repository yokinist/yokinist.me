import {
  APIResponseError,
  type BlockObjectResponse,
  collectPaginatedAPI,
  isFullBlock,
  isFullPage,
  RequestTimeoutError,
} from "@notionhq/client";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { cache } from "react";
import BLOG from "~/blog.config";
import type { Post } from "~/types";
import { notion } from "./client";
import { pageToPost, publishedPosts } from "./toPosts";

export type NotionBlock = BlockObjectResponse & { children?: NotionBlock[] };

// During `next build` many pages fetch the same data (the database, the
// profile), which trips Notion's rate limit. Share requests per build
// worker; ISR always fetches fresh data.
const sharedOnBuild = new Map<string, Promise<unknown>>();
const onBuild = <T>(key: string, fetch: () => Promise<T>): Promise<T> => {
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) return fetch();
  const shared = (sharedOnBuild.get(key) as Promise<T>) ?? fetch();
  sharedOnBuild.set(key, shared);
  return shared;
};

// Notion allows about 3 requests per second per integration, and CI and
// Vercel may build at the same time. Pages fetch nested blocks in parallel,
// so cap concurrent requests per process and keep retrying rate limits and
// timeouts (the client gives up after a few retries).
const MAX_CONCURRENT = 2;
const MAX_RETRIES = 10;
let active = 0;
const waiting: (() => void)[] = [];
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const retryDelay = (error: unknown, attempt: number) => {
  if (error instanceof RequestTimeoutError) return 1000;
  if (APIResponseError.isAPIResponseError(error) && error.status === 429) {
    const seconds = Number(
      (error.additional_data as { retry_after?: string } | undefined)
        ?.retry_after,
    );
    return (Number.isFinite(seconds) ? seconds : 2 ** attempt) * 1000;
  }
  return undefined;
};

const request = async <T>(send: () => Promise<T>): Promise<T> => {
  for (let attempt = 0; ; attempt++) {
    if (active >= MAX_CONCURRENT) {
      await new Promise<void>((resolve) => waiting.push(resolve));
    }
    active++;
    let delay: number | undefined;
    try {
      return await send();
    } catch (error) {
      delay = attempt < MAX_RETRIES ? retryDelay(error, attempt) : undefined;
      if (delay === undefined) throw error;
    } finally {
      active--;
      waiting.shift()?.();
    }
    // Wait without holding a slot
    await sleep(delay);
  }
};

const fetchRows = async (databaseId: string) => {
  const database = await request(() =>
    notion.databases.retrieve({ database_id: databaseId }),
  );
  const dataSourceId =
    "data_sources" in database ? database.data_sources[0]?.id : undefined;
  if (!dataSourceId) throw new Error(`${databaseId} is not a database`);
  const rows = await request(() =>
    collectPaginatedAPI(notion.dataSources.query, {
      data_source_id: dataSourceId,
    }),
  );
  return rows.filter(isFullPage);
};

// cache(): generateMetadata and the page share one fetch per request
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const id = BLOG.notionPageId;
  if (!id) throw new Error("NOTION_PAGE_ID is not set");
  if (!process.env.NOTION_TOKEN) throw new Error("NOTION_TOKEN is not set");
  const rows = await onBuild(`rows:${id}`, () => fetchRows(id));
  return publishedPosts(rows.map(pageToPost), { sortByDate: BLOG.sortByDate });
});

const fetchChildren = async (blockId: string): Promise<NotionBlock[]> => {
  const blocks = (
    await request(() =>
      collectPaginatedAPI(notion.blocks.children.list, { block_id: blockId }),
    )
  ).filter(isFullBlock);
  return Promise.all(
    blocks.map(async (block) =>
      // Child pages and databases are separate pages, not content
      block.has_children &&
      block.type !== "child_page" &&
      block.type !== "child_database"
        ? { ...block, children: await fetchChildren(block.id) }
        : block,
    ),
  );
};

// The content of a page, with nested blocks under `children`
export const getBlocks = (pageId: string) =>
  onBuild(`blocks:${pageId}`, () => fetchChildren(pageId));

export const getProfilePost = async (posts: Post[]) => {
  const post = posts.find((t) => t.slug === BLOG.profileSlug);
  if (!post) return { post: null, blocks: null };
  return { post, blocks: await getBlocks(post.id) };
};
