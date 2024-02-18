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
  return tagObj;
};

export const getAllProjectTags = ({ posts }: Props): TagObj => {
  const taggedPosts = (posts ?? []).filter(
    (post) => post.tags && post?.type?.[0] === "Project",
  );
  const tags = [...taggedPosts.flatMap((p) => p?.tags)].filter(nonNullable);
  const tagObj: TagObj = {};
  for (const tag of tags) {
    if (tag in tagObj) {
      tagObj[tag]++;
    } else {
      tagObj[tag] = 1;
    }
  }
  return tagObj;
};
