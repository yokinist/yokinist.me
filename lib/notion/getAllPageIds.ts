import { idToUuid } from "notion-utils";
import { ReturnGetAllPostsParams } from "./getAllPosts";

export const getAllPageIds = (
  collectionQuery: ReturnGetAllPostsParams["collectionQuery"],
  viewId?: string,
): string[] => {
  const views = Object.values(collectionQuery)?.[0];
  let pageIds = [];
  if (viewId) {
    const vId = idToUuid(viewId);
    pageIds = views[vId]?.blockIds;
  } else {
    const pageSet = new Set<string>();
    for (const view of Object.values(views)) {
      for (const id of view?.collection_group_results?.blockIds ?? []) {
        pageSet.add(id);
      }
    }
    pageIds = Array.from(pageSet);
  }
  return pageIds;
};
