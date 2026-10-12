import type { PageObjectResponse } from "@notionhq/client";
import {
  getPropertyDate,
  getPropertyNames,
  getPropertyText,
} from "@yokinist/notion-fetch";
import type { Post, PostLink, PostType } from "../../types";

// Maps a database row by property name (title, slug, type, status, ...)
export const pageToPost = (page: PageObjectResponse): Post => {
  const props = page.properties;
  const title = Object.values(props).find((p) => p.type === "title");
  return {
    id: page.id,
    createdTime: page.created_time,
    title: getPropertyText(title) ?? "",
    slug: getPropertyText(props.slug) ?? "",
    type: getPropertyText(props.type),
    status: getPropertyText(props.status),
    date: getPropertyDate(props.date),
    tags: getPropertyNames(props.tags),
    summary: getPropertyText(props.summary),
    outer_link: getPropertyText(props.outer_link),
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
