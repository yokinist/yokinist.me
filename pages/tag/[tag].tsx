import BLOG from '@/blog.config';
import { Profile, Container } from '@/components';
import SearchLayout from '@/layouts/search';
import { filterPublishedPosts, getAllPosts, getAllTags } from '@/lib/notion';
import { getProfilePost } from '@/lib/notion/getProfilePost';
import { createHash } from 'crypto';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentTag = params?.tag;
  if (typeof currentTag !== 'string') {
    return {
      notFound: true,
    };
  }
  const allPosts = await getAllPosts({ includedPages: true });
  const profilePostData = await getProfilePost(allPosts);
  const emailHash = createHash('md5').update(BLOG.email).digest('hex');
  const posts = filterPublishedPosts({
    posts: allPosts,
    includedPages: false,
  });
  const tags = getAllTags({ posts });
  const filteredPosts = posts.filter((post) => post && post.tags && post.tags.includes(currentTag));
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag,
      post: profilePostData.post,
      blockMap: profilePostData.blockMap,
      emailHash,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts({ includedPages: false });
  const tags = getAllTags({ posts });
  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: true,
  };
};

type Props = React.ComponentProps<typeof SearchLayout> & Omit<React.ComponentProps<typeof Profile>, 'fullWidth'>;

const TagPage: NextPage<Props> = ({ tags, posts, currentTag, post, blockMap, emailHash }) => {
  return (
    <Container title={currentTag}>
      {post && blockMap && <Profile blockMap={blockMap} post={post} emailHash={emailHash} />}
      <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />
    </Container>
  );
};

export default TagPage;
