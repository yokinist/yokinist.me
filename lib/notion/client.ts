import { Client, LogLevel } from "@notionhq/client";
import { createTimeoutFetch } from "@yokinist/notion-fetch";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: LogLevel.ERROR,
  // Builds fetch many pages at once and hit the rate limit (3 requests/s)
  retry: { maxRetries: 5 },
  // Aborts a request whose response stalls, so the retry is a new request
  // (Next.js would otherwise hand the retry the same stalled response)
  fetch: createTimeoutFetch(),
});
