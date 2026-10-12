import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import BLOG from "~/blog.config";
import { Container, Profile } from "~/components";
import { SearchLayout } from "~/layouts";
import { getTagData } from "~/lib";
import { byType, getAllPosts, getAllTags, getProfilePost } from "~/lib/notion";
import { REVALIDATE } from "~/lib/postPage";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentTag = typeof params?.tag === "string" ? params.tag : "";
  const allPosts = await getAllPosts();
  const profilePostData = await getProfilePost(allPosts);
  const posts = allPosts.filter(byType("Post"));
  const tags = getAllTags({ posts });
  const filteredPosts = posts.filter((post) =>
    post?.tags?.includes(currentTag),
  );
  if (!filteredPosts.length) return { notFound: true, revalidate: REVALIDATE };
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag,
      post: profilePostData.post,
      blockMap: profilePostData.blockMap,
    },
    revalidate: REVALIDATE,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getAllPosts()).filter(byType("Post"));
  const tags = getAllTags({ posts });
  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: "blocking",
  };
};

type Props = React.ComponentProps<typeof SearchLayout> &
  Omit<React.ComponentProps<typeof Profile>, "fullWidth">;

const TagPage: NextPage<Props> = ({
  tags,
  posts,
  currentTag,
  post,
  blockMap,
}) => {
  return (
    <Container title={currentTag && getTagData(currentTag).name}>
      {post && blockMap && <Profile blockMap={blockMap} post={post} />}
      <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />
    </Container>
  );
};

export default TagPage;
