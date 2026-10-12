import { createFileHandler } from "@yokinist/notion-fetch";
import { limit } from "~/lib/notion/api";
import { notion } from "~/lib/notion/client";

// Files uploaded to Notion have signed URLs that expire after an hour, so
// pages link here instead. This redirects to a fresh URL; the CDN caches the
// redirect for 40 minutes, well within its lifetime.
export const GET = createFileHandler({ notion, limit });
