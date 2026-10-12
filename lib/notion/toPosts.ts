import type {
  BaseBlock,
  CollectionPropertySchemaMap,
  ExtendedRecordMap,
} from "notion-types";
import {
  getBlockValue,
  getDateValue,
  getTextContent,
  idToUuid,
} from "notion-utils";
import type { Post, PostType } from "../../types";

type Decorations = Parameters<typeof getDateValue>[0];

export const byType = (type: PostType) => (post: Post) =>
  post.type?.[0] === type;

const publishedAt = (post: Post) =>
  new Date(post.date?.start_date || post.createdTime);

// Turns the Notion database page into its published posts and pages
export const toPosts = (
  recordMap: ExtendedRecordMap,
  databaseId: string,
  { now = new Date(), sortByDate = true } = {},
): Post[] => {
  const database = getBlockValue(recordMap.block[idToUuid(databaseId)]);
  if (
    database?.type !== "collection_view_page" &&
    database?.type !== "collection_view"
  ) {
    throw new Error(`pageId "${databaseId}" is not a database`);
  }
  const schema =
    getBlockValue(Object.values(recordMap.collection)[0])?.schema ?? {};
  const views = Object.values(recordMap.collection_query)[0] ?? {};
  const pageIds = new Set(
    Object.values(views).flatMap(
      (view) => view?.collection_group_results?.blockIds ?? [],
    ),
  );

  // Posts dated today are published; later ones are scheduled
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const posts = Array.from(pageIds)
    .map((id) => toPost(id, recordMap, schema))
    .filter(
      (post) =>
        post.title &&
        post.slug &&
        post.status?.[0] === "Published" &&
        (byType("Post")(post) || byType("Page")(post)) &&
        publishedAt(post) < tomorrow,
    );
  if (sortByDate) {
    posts.sort((a, b) => publishedAt(b).getTime() - publishedAt(a).getTime());
  }
  return posts;
};

const toPost = (
  id: string,
  recordMap: ExtendedRecordMap,
  schema: CollectionPropertySchemaMap,
): Post => {
  const block = getBlockValue(recordMap.block[id]);
  const post: Record<string, unknown> = {
    id,
    createdTime: new Date(block?.created_time ?? Number.NaN).toString(),
    fullWidth: (block?.format as BaseBlock["format"])?.page_full_width ?? false,
  };
  for (const [key, value] of Object.entries(block?.properties ?? {})) {
    const { name, type } = schema[key] ?? {};
    if (!name) continue;
    const decorations = value as Decorations;
    switch (type) {
      case "date": {
        const date = getDateValue(decorations);
        if (date) {
          const { type: _, ...rest } = date;
          post[name] = rest;
        }
        break;
      }
      case "select":
      case "multi_select": {
        const text = getTextContent(decorations);
        if (text) post[name] = text.split(",");
        break;
      }
      case "person":
        break;
      default:
        post[name] = getTextContent(decorations);
    }
  }
  return post as Post;
};
