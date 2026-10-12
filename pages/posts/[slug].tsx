import { createHash } from "crypto";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import BLOG from "~/blog.config";
import { Layout } from "~/layouts";
import { byType, getAllPosts, getPage } from "~/lib/notion";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getAllPosts()).filter(byType("Post"));
  const publishPosts = posts.filter((post) => !post.outer_link);
  return {
    paths: publishPosts.map((row) => `/posts/${row.slug}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const posts = (await getAllPosts()).filter(byType("Post"));
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
  const blockMap = await getPage(post.id);
  const emailHash = createHash("md5").update(BLOG.email).digest("hex");
  return {
    props: { post, blockMap, emailHash },
    revalidate: 1,
  };
};

type Props = Omit<React.ComponentProps<typeof Layout>, "fullWidth">;

const Post: NextPage<Props> = ({ post, blockMap, emailHash }) => {
  const router = useRouter();
  if (!post) return <DefaultErrorPage statusCode={404} />;
  const slug = router.query?.slug;
  return (
    <Layout
      blockMap={blockMap}
      post={post}
      emailHash={emailHash}
      fullWidth={post?.fullWidth ?? false}
      slug={typeof slug === "string" ? slug : null}
    />
  );
};

export default Post;
