import type { MetadataRoute } from "next";
import BLOG from "~/blog.config";

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${BLOG.link}/sitemap.xml`,
});

export default robots;
