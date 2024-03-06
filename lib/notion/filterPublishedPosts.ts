import { Post } from "~/types";

const current = new Date();
const tomorrow = new Date(current);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

type Props = {
  posts: Post[] | null;
  filterPostTypeBy: "page" | "post" | undefined;
};
export const filterPublishedPosts = ({ posts, filterPostTypeBy }: Props) => {
  if (!posts || !posts.length) return [];
  const publishedPosts = posts
    .filter((post) => {
      const postType = post?.type?.[0];
      if (filterPostTypeBy === "page") return postType === "Page";
      if (filterPostTypeBy === "post") return postType === "Post";
      return postType === "Page" || postType === "Post";
    })
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime);
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === "Published" &&
        postDate < tomorrow
      );
    });
  return publishedPosts;
};
