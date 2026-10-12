import { createHash } from "node:crypto";
import type { GetStaticPaths, GetStaticProps } from "next";
import BLOG from "~/blog.config";
import { byType, getAllPosts, getNeighbors, getPage } from "~/lib/notion";
import type { PostType } from "~/types";

// How often (in seconds) ISR refetches a page from Notion
export const REVALIDATE = 60;

// Data fetching shared by /posts/[slug] (posts) and /[slug] (pages)
export const getPostPaths =
  (type: PostType): GetStaticPaths =>
  async () => {
    const posts = (await getAllPosts()).filter(byType(type));
    return {
      paths: posts
        .filter((post) => !post.outer_link)
        .map((post) => ({ params: { slug: post.slug } })),
      fallback: "blocking",
    };
  };

export const getPostProps =
  (type: PostType): GetStaticProps =>
  async ({ params }) => {
    const posts = (await getAllPosts()).filter(byType(type));
    const post = posts.find((post) => post.slug === params?.slug);
    if (!post) return { notFound: true, revalidate: REVALIDATE };
    if (post.outer_link) {
      return { redirect: { destination: post.outer_link, permanent: true } };
    }
    const { prev, next } =
      type === "Post"
        ? getNeighbors(posts, post.id)
        : { prev: null, next: null };
    return {
      props: {
        post,
        blockMap: await getPage(post.id),
        emailHash: createHash("md5").update(BLOG.email).digest("hex"),
        prev,
        next,
      },
      revalidate: REVALIDATE,
    };
  };
