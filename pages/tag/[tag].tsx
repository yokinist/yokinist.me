import { createHash } from "crypto";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import BLOG from "~/blog.config";
import { Container, Profile } from "~/components";
import { SearchLayout } from "~/layouts";
import { TagSlug, getTagDataBySlug, isTagSlug } from "~/lib";
import { filterPublishedPosts, getAllPosts, getAllTags } from "~/lib/notion";
import { getProfilePost } from "~/lib/notion/getProfilePost";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentTag = typeof params?.tag === "string" ? params.tag : "";
  if (!isTagSlug(currentTag)) {
    return {
      notFound: true,
    };
  }
  const allPosts = await getAllPosts({ includedPages: true });
  const profilePostData = await getProfilePost(allPosts);
  const emailHash = createHash("md5").update(BLOG.email).digest("hex");
  const posts = filterPublishedPosts({
    posts: allPosts,
    includedPages: false,
  });
  const tags = getAllTags({ posts });
  const filteredPosts = posts.filter((post) =>
    post?.tags?.includes(currentTag),
  );
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
  const router = useRouter();
  const tag = router.query?.tag;
  return (
    <Container
      title={getTagDataBySlug(currentTag as TagSlug)?.name ?? currentTag}
      isTagPage
      slug={typeof tag === "string" ? tag : undefined}
    >
      {post && blockMap && (
        <Profile blockMap={blockMap} post={post} emailHash={emailHash} />
      )}
      <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />
    </Container>
  );
};

export default TagPage;
