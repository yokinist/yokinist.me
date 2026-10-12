import { byType, getAllPosts } from "~/lib/notion";
import { generateRss } from "~/lib/rss";

// Regenerated at most every 10 minutes
export const revalidate = 600;

export const GET = async () => {
  const posts = (await getAllPosts()).filter(byType("Post")).slice(0, 10);
  return new Response(generateRss(posts), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
