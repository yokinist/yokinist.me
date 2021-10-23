import { Post } from '~/types';

const current = new Date();
const tomorrow = new Date(current);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

type Props = {
  posts: Post[] | null;
  includedPages: boolean;
};
export const filterPublishedPosts = ({ posts, includedPages }: Props) => {
  if (!posts || !posts.length) return [];
  const publishedPosts = posts
    .filter((post) =>
      includedPages ? post?.type?.[0] === 'Post' || post?.type?.[0] === 'Page' : post?.type?.[0] === 'Post',
    )
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime);
      return post.title && post.slug && post?.status?.[0] === 'Published' && postDate < tomorrow;
    });
  return publishedPosts;
};
