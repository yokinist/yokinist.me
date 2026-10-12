import type { GetServerSideProps } from "next";
import { byType, getAllPosts } from "~/lib/notion";
import { generateRss } from "~/lib/rss";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  // Let the CDN cache the feed instead of hitting Notion on every request
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=86400",
  );
  const posts = await getAllPosts();
  const recentPublishPosts = posts.filter(byType("Post")).slice(0, 10);
  const xmlFeed = generateRss(recentPublishPosts);
  res.write(xmlFeed);
  res.end();
  return {
    props: {},
  };
};

const feed = () => null;

export default feed;
