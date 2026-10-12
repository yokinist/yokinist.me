import type { ExtendedRecordMap } from "notion-types";
import {
  getBlockValue,
  isPublicNotionBlock,
  resolveDefaultImageUrl,
} from "notion-utils";

// An image among the first blocks is usually the largest contentful paint,
// but react-notion-x always lazy-loads images. Resolve its URL the same way
// react-notion-x does, so a preload is reused by the <img>.
export const getLeadImageUrl = (recordMap: ExtendedRecordMap) => {
  const page = getBlockValue(Object.values(recordMap.block)[0]);
  for (const id of page?.content?.slice(0, 3) ?? []) {
    const block = getBlockValue(recordMap.block[id]);
    if (block?.type !== "image") continue;
    const source = block.properties?.source?.[0]?.[0];
    if (!source) return undefined;
    return resolveDefaultImageUrl(source, block, {
      isPublic: isPublicNotionBlock(recordMap, block.id),
      signedUrls: recordMap.signed_urls,
    });
  }
};
