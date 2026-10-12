import { createHash } from "crypto";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import BLOG from "~/blog.config";
import { Container, Profile } from "~/components";
import { SearchLayout } from "~/layouts";
import { getTagData } from "~/lib";
import { byType, getAllPosts, getAllTags, getProfilePost } from "~/lib/notion";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentTag = typeof params?.tag === "string" ? params.tag : "";
  const allPosts = await getAllPosts();
  const profilePostData = await getProfilePost(allPosts);
  const emailHash = createHash("md5").update(BLOG.email).digest("hex");
  const posts = allPosts.filter(byType("Post"));
  const tags = getAllTags({ posts });
  const filteredPosts = posts.filter((post) =>
    post?.tags?.includes(currentTag),
  );
  if (!filteredPosts.length) return { notFound: true, revalidate: 1 };
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
  const posts = (await getAllPosts()).filter(byType("Post"));
  const tags = getAllTags({ posts });
  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: true,
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
  emailHash,
}) => {
  return (
    <Container title={currentTag && getTagData(currentTag).name}>
      {post && blockMap && (
        <Profile blockMap={blockMap} post={post} emailHash={emailHash} />
      )}
      <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />
    </Container>
  );
};

export default TagPage;
