import { ReturnGetAllPostsParams } from "./getAllPosts";

export const getAllPageIds = (
  collectionQuery: ReturnGetAllPostsParams["collectionQuery"],
): string[] => {
  const views = Object.values(collectionQuery)?.[0];
  const pageSet = new Set<string>();
  for (const view of Object.values(views)) {
    for (const id of view?.collection_group_results?.blockIds ?? []) {
      pageSet.add(id);
    }
  }
  return Array.from(pageSet);
};
