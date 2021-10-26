import { createHash } from 'crypto';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import DefaultErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { Tweet, TwitterContextProvider } from 'react-static-tweets';
import BLOG from '~/blog.config';
import { Layout } from '~/layouts';
import { getAllPosts, getPostBlocks } from '~/lib/notion';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts({ includedPages: true });
  if (!posts) return { paths: [], fallback: false };
  const publishPosts = posts.filter((post) => post?.status?.[0] === 'Published' && !post?.outer_link);
  return {
    paths: publishPosts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const posts = await getAllPosts({ includedPages: true });
  const post = posts.find((t) => t.slug === slug);
  if (!post?.id) return { notFound: true };
  if (post?.outer_link) {
    return {
      redirect: {
        destination: post.outer_link,
        permanent: true,
      },
    };
  }
  const blockMap = await getPostBlocks(post.id);
  const emailHash = createHash('md5').update(BLOG.email).digest('hex');
  return {
    props: { post, blockMap, emailHash },
    revalidate: 1,
  };
};

type Props = Omit<React.ComponentProps<typeof Layout>, 'fullWidth'>;

const BlogPost: NextPage<Props> = ({ post, blockMap, emailHash }) => {
  const router = useRouter();
  if (!post) return <DefaultErrorPage statusCode={404} />;
  const slug = router.query?.slug;
  return (
    <>
      <TwitterContextProvider
        value={{
          tweetAstMap: {},
          swrOptions: {
            fetcher: (id: number) => fetch(`/api/get-tweet-ast/${id}`).then((r) => r.json()),
          },
        }}
      >
        <Layout
          blockMap={blockMap}
          post={post}
          emailHash={emailHash}
          fullWidth={post?.fullWidth ?? false}
          tweet={Tweet}
          slug={typeof slug === 'string' ? slug : null}
        />
      </TwitterContextProvider>
    </>
  );
};

export default BlogPost;
