import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { buildMetadata } from "~/lib/metadata";
import { byType, getAllPosts, getNeighbors, getPage } from "~/lib/notion";
import type { PostType } from "~/types";

// Shared by /posts/[slug] (posts) and /[slug] (pages)

const findPost = async (type: PostType, slug: string) => {
  const posts = (await getAllPosts()).filter(byType(type));
  return { posts, post: posts.find((post) => post.slug === slug) };
};

const basePath = (type: PostType) => (type === "Post" ? "/posts" : "");

export const getPostParams = async (type: PostType) =>
  (await getAllPosts())
    .filter(byType(type))
    .filter((post) => !post.outer_link)
    .map((post) => ({ slug: post.slug }));

export const getPostMetadata = async (
  type: PostType,
  slug: string,
): Promise<Metadata> => {
  const { post } = await findPost(type, slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.summary,
    path: `${basePath(type)}/${post.slug}`,
    publishedTime:
      type === "Post"
        ? new Date(post.date?.start_date || post.createdTime).toISOString()
        : undefined,
  });
};

// Resolves the post to render, or ends the request with a 404 / redirect
export const getPostPageData = async (
  type: PostType,
  slug: string,
  onMissing: () => never = notFound,
) => {
  const { posts, post } = await findPost(type, slug);
  if (!post) onMissing();
  if (post.outer_link) permanentRedirect(post.outer_link);
  const { prev, next } =
    type === "Post" ? getNeighbors(posts, post.id) : { prev: null, next: null };
  return { post, blockMap: await getPage(post.id), prev, next };
};
