import BLOG from "~/blog.config";

// Tags missing from blog.config.js are shown by their slug
export const getTagData = (slug: string): { name: string; emoji?: string } =>
  BLOG.tags[slug] ?? { name: slug };
