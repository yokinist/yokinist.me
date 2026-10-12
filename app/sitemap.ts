import type { MetadataRoute } from "next";
import BLOG from "~/blog.config";
import { byType, getAllPosts, getAllTags } from "~/lib/notion";

export const revalidate = 3600;

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(
    (post) => byType("Post")(post) && !post.outer_link,
  );
  const pages = allPosts.filter(
    (post) => byType("Page")(post) && !post.outer_link,
  );
  return [
    { url: BLOG.link },
    ...pages.map((page) => ({ url: `${BLOG.link}/${page.slug}` })),
    ...posts.map((post) => ({
      url: `${BLOG.link}/posts/${post.slug}`,
      lastModified: post.date?.start_date || undefined,
    })),
    ...Object.keys(getAllTags({ posts })).map((tag) => ({
      url: `${BLOG.link}/tags/${encodeURIComponent(tag)}`,
    })),
  ];
};

export default sitemap;
