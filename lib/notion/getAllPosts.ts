import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { NotionAPI } from "notion-client";
import { getBlockValue, idToUuid } from "notion-utils";
import BLOG from "~/blog.config";
import { Post } from "~/types";

import {
  BaseBlock,
  BlockMap,
  CollectionPropertySchemaMap,
  ExtendedRecordMap,
} from "notion-types";
import {
  filterPublishedPosts,
  getAllPageIds,
  getPageProperties,
} from "./index";

type GetAllPostsParams = {
  filterPostTypeBy?: "page" | "post" | undefined;
};

// During `next build` every page fetches the same database, which trips
// Notion's rate limit. Share one request per build worker; ISR stays fresh.
let databaseOnBuild: ReturnType<NotionAPI["getPage"]> | undefined;

const fetchDatabase = (id: string) => {
  const api = new NotionAPI({ authToken: BLOG.notionAccessToken });
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) return api.getPage(id);
  databaseOnBuild ??= api.getPage(id);
  return databaseOnBuild;
};

export const getAllPosts = async (
  props?: GetAllPostsParams,
): Promise<Post[]> => {
  let id = BLOG.notionPageId;
  const response = await fetchDatabase(id);

  id = idToUuid(id);
  const collection = getBlockValue(Object.values(response.collection)[0]);
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema ?? {};

  const rawMetadata = getBlockValue(block[id]);

  const result = await returnGetPosts({
    id,
    rawMetadata,
    collectionQuery,
    block,
    schema,
    filterPostTypeBy: props?.filterPostTypeBy,
  });
  return result ?? [];
};

export type ReturnGetAllPostsParams = {
  id: string;
  filterPostTypeBy: "page" | "post" | undefined;
  rawMetadata: BaseBlock | undefined;
  collectionQuery: ExtendedRecordMap["collection_query"];
  block: BlockMap;
  schema: CollectionPropertySchemaMap;
};

const returnGetPosts = async ({
  id,
  filterPostTypeBy,
  rawMetadata,
  collectionQuery,
  block,
  schema,
}: ReturnGetAllPostsParams) => {
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.error(`pageId "${id}" is not a database`);
    return null;
  }
  // Construct Data
  const pageIds = getAllPageIds(collectionQuery);
  const data: Post[] = [];

  for (const id of pageIds) {
    const properties = (await getPageProperties(id, block, schema)) || null;
    // Add fullwidth, createdtime to properties
    const value = getBlockValue(block[id]);
    properties.createdTime = new Date(value?.created_time ?? NaN).toString();
    properties.fullWidth =
      (value?.format as BaseBlock["format"])?.page_full_width ?? false;
    data.push(properties);
  }

  // remove all the items doesn't meet requirements
  const posts = filterPublishedPosts({
    posts: data,
    filterPostTypeBy,
  });

  // Sort by date
  if (BLOG.sortByDate) {
    posts.sort((a, b) => {
      const dateA = new Date(a?.date?.start_date || a.createdTime);
      const dateB = new Date(b?.date?.start_date || b.createdTime);
      return dateB.getTime() - dateA.getTime();
    });
  }
  return posts;
};
