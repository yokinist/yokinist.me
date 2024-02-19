import nonNullable from "~/lib/nonNullable";
import { Post, TagObj } from "~/types";

type Props = {
  posts: Post[];
};
export const getAllTags = ({ posts }: Props): TagObj => {
  const taggedPosts = (posts ?? []).filter((post) => post.tags);
  const tags = [...taggedPosts.flatMap((p) => p?.tags)].filter(nonNullable);
  const tagObj: TagObj = {};
  for (const tag of tags) {
    if (tag in tagObj) {
      tagObj[tag]++;
    } else {
      tagObj[tag] = 1;
    }
  }
  return sortByValueDescending(tagObj);
};

const sortByValueDescending = (tags: TagObj): TagObj => {
  const sortedEntries = Object.entries(tags).sort(([, a], [, b]) => b - a);
  return Object.fromEntries(sortedEntries);
};
