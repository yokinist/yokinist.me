import { Client, LogLevel } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: LogLevel.ERROR,
  // Builds fetch many pages at once and hit the rate limit (3 requests/s)
  retry: { maxRetries: 5 },
});
