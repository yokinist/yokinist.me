import nonNullable from '~/lib/nonNullable';
import { Post, TagObj } from '~/types';

type Props = {
  posts: Post[];
};
export const getAllTags = ({ posts }: Props): TagObj => {
  const taggedPosts = (posts ?? []).filter((post) => post.tags);
  const tags = [...taggedPosts.map((p) => p?.tags).flat()].filter(nonNullable);
  const tagObj: TagObj = {};
  tags.forEach((tag) => {
    if (tag in tagObj) {
      tagObj[tag]++;
    } else {
      tagObj[tag] = 1;
    }
  });
  return tagObj;
};
