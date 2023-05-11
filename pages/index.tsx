import { createHash } from 'crypto';
import { GetStaticProps, NextPage } from 'next';
import BLOG from '~/blog.config';
import { Container, Profile } from '~/components';
import { SearchLayout } from '~/layouts';
import { filterPublishedPosts, getAllPosts, getAllTags } from '~/lib/notion';
import { getProfilePost } from '~/lib/notion/getProfilePost';
import { Post } from '~/types';

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts({ includedPages: true });
  const profilePostData = await getProfilePost(allPosts);
  const emailHash = createHash('md5').update(BLOG.email).digest('hex');
  const posts = filterPublishedPosts({
    posts: allPosts,
    includedPages: false,
  });
  const tags = getAllTags({ posts });
  return {
    props: {
      posts,
      tags,
      post: profilePostData.post,
      blockMap: profilePostData.blockMap,
      emailHash,
    },
    revalidate: 1,
  };
};

type Props = Omit<React.ComponentProps<typeof Profile>, 'fullWidth'> &
  Omit<React.ComponentProps<typeof SearchLayout>, 'currentTag'> & {
    postsToShow: Post[];
  };

const Blog: NextPage<Props> = ({ posts, post, blockMap, emailHash, tags }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {post && blockMap && <Profile blockMap={blockMap} post={post} emailHash={emailHash} />}
      <SearchLayout tags={tags} posts={posts} />
    </Container>
  );
};

export default Blog;
