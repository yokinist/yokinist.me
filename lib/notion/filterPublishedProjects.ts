import { Post, Project } from '~/types';

const current = new Date();
const tomorrow = new Date(current);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

type Props = {
  posts: Post[] | null;
};

export const filterPublishedProjects = ({ posts }: Props): Project[] => {
  if (!posts || !posts.length) return [];
  const publishedPosts = posts
    .filter((post) => post?.type?.[0] === 'Project')
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime);
      return post.title && post.slug && post?.status?.[0] === 'Published' && postDate < tomorrow;
    }) as Project[];
  return publishedPosts;
};
