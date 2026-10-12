import { isFullBlock } from "@notionhq/client";
import { notion } from "~/lib/notion/client";

const MEDIA = ["image", "video", "audio", "file", "pdf"] as const;

// Files uploaded to Notion have signed URLs that expire after an hour, so
// pages link here instead. This redirects to a fresh URL; the CDN caches the
// redirect for 40 minutes, well within its lifetime.
export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  if (!/^[\da-f-]{32,36}$/i.test(id)) {
    return new Response("Not found", { status: 404 });
  }
  const block = await notion.blocks
    .retrieve({ block_id: id })
    .catch(() => null);
  const type = block && isFullBlock(block) ? block.type : undefined;
  if (!block || !isFullBlock(block) || !MEDIA.includes(type as never)) {
    return new Response("Not found", { status: 404 });
  }
  const media = (block as unknown as Record<string, unknown>)[type as string] as
    | { type: "file"; file: { url: string } }
    | { type: "external"; external: { url: string } };
  const url = media.type === "file" ? media.file.url : media.external.url;
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      "Cache-Control": "public, max-age=0, s-maxage=2400",
    },
  });
};
