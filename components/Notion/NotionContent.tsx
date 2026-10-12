import type { NotionBlock } from "~/lib/notion/api";
import { getAllPosts } from "~/lib/notion/api";
import { Blocks, type Heading } from "./Blocks";

const HEADINGS = { heading_1: 1, heading_2: 2, heading_3: 3 } as const;

// Renders a Notion page's blocks as article content (server only)
export const NotionContent = async ({ blocks }: { blocks: NotionBlock[] }) => {
  const posts = await getAllPosts();
  const links = Object.fromEntries(
    posts.map((post) => [
      post.id.replaceAll("-", ""),
      `${post.type === "Page" ? "" : "/posts"}/${post.slug}`,
    ]),
  );
  const headings: Heading[] = blocks.flatMap((block) =>
    block.type === "heading_1" ||
    block.type === "heading_2" ||
    block.type === "heading_3"
      ? [
          {
            id: block.id,
            level: HEADINGS[block.type],
            text: (block.type === "heading_1"
              ? block.heading_1
              : block.type === "heading_2"
                ? block.heading_2
                : block.heading_3
            ).rich_text
              .map((t) => t.plain_text)
              .join(""),
          },
        ]
      : [],
  );
  // An image among the first blocks is likely the largest contentful paint
  const lead = blocks.slice(0, 3).find((block) => block.type === "image");
  return (
    <div className="notion prose prose-zinc max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-[1.9] prose-li:leading-[1.9] prose-a:text-blue-700 prose-a:underline-offset-4 dark:prose-a:text-blue-300 prose-figcaption:text-center">
      <Blocks
        blocks={blocks}
        ctx={{ links, headings, leadImageId: lead?.id }}
      />
    </div>
  );
};
