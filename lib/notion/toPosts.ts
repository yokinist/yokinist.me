import type { PageObjectResponse } from "@notionhq/client";
import type { Post, PostLink, PostType } from "../../types";

type Property = PageObjectResponse["properties"][string];

const plainText = (property?: Property): string | undefined => {
  switch (property?.type) {
    case "title":
      return property.title.map((t) => t.plain_text).join("") || undefined;
    case "rich_text":
      return property.rich_text.map((t) => t.plain_text).join("") || undefined;
    case "url":
      return property.url ?? undefined;
    case "select":
      return property.select?.name;
    case "status":
      return property.status?.name;
    default:
      return undefined;
  }
};

// Maps a database row by property name (title, slug, type, status, ...)
export const pageToPost = (page: PageObjectResponse): Post => {
  const props = page.properties;
  const title = Object.values(props).find((p) => p.type === "title");
  return {
    id: page.id,
    createdTime: page.created_time,
    title: plainText(title) ?? "",
    slug: plainText(props.slug) ?? "",
    type: plainText(props.type),
    status: plainText(props.status),
    date: props.date?.type === "date" ? props.date.date?.start : undefined,
    tags:
      props.tags?.type === "multi_select"
        ? props.tags.multi_select.map((tag) => tag.name)
        : undefined,
    summary: plainText(props.summary),
    outer_link: plainText(props.outer_link),
  };
};

export const byType = (type: PostType) => (post: Post) => post.type === type;

export const publishedAt = (post: Post) =>
  new Date(post.date || post.createdTime);

// Published posts and pages, newest first unless sortByDate is false
export const publishedPosts = (
  posts: Post[],
  { now = new Date(), sortByDate = true } = {},
): Post[] => {
  // Posts dated today are published; later ones are scheduled
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const published = posts.filter(
    (post) =>
      post.title &&
      post.slug &&
      post.status === "Published" &&
      (byType("Post")(post) || byType("Page")(post)) &&
      publishedAt(post) < tomorrow,
  );
  if (sortByDate) {
    published.sort(
      (a, b) => publishedAt(b).getTime() - publishedAt(a).getTime(),
    );
  }
  return published;
};

const toLink = (post?: Post): PostLink | null =>
  post ? { title: post.title, slug: post.slug } : null;

// The older (prev) and newer (next) post around `id` in a newest-first list.
// Outer links leave the site, so they are skipped.
export const getNeighbors = (posts: Post[], id: string) => {
  const linkable = posts.filter((post) => !post.outer_link);
  const index = linkable.findIndex((post) => post.id === id);
  return {
    prev: toLink(linkable[index + 1]),
    next: index > 0 ? toLink(linkable[index - 1]) : null,
  };
};
