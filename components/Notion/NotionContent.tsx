import { NotionBlocks } from "@yokinist/notion-rsc";
import Link from "next/link";
import { locale } from "~/lib/i18n/lang";
import type { NotionBlock } from "~/lib/notion/api";
import { getAllPosts } from "~/lib/notion/api";

// Renders a Notion page's blocks as article content (server only)
export const NotionContent = async ({ blocks }: { blocks: NotionBlock[] }) => {
  const posts = await getAllPosts();
  const paths = new Map(
    posts.map((post) => [
      post.id.replaceAll("-", ""),
      `${post.type === "Page" ? "" : "/posts"}/${post.slug}`,
    ]),
  );
  return (
    <div className="notion prose prose-zinc max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-[1.9] prose-li:leading-[1.9] prose-a:text-blue-700 prose-a:underline-offset-4 dark:prose-a:text-blue-300 prose-figcaption:text-center">
      <NotionBlocks
        blocks={blocks}
        pageUrl={(id) => paths.get(id)}
        fileUrl={(id) => `/api/notion/file/${id}`}
        // Link previews and oEmbed rarely change: refetch daily
        fetchInit={{ next: { revalidate: 86400 } }}
        labels={{ play: locale.POST.PLAY }}
        components={{ Link }}
      />
    </div>
  );
};
