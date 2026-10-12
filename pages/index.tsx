import { GetStaticProps, NextPage } from "next";
import BLOG from "~/blog.config";
import { Container, Profile } from "~/components";
import { SearchLayout } from "~/layouts";
import { byType, getAllPosts, getAllTags, getProfilePost } from "~/lib/notion";
import { REVALIDATE } from "~/lib/postPage";
import { Post } from "~/types";

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts();
  const profilePostData = await getProfilePost(allPosts);
  const posts = allPosts.filter(byType("Post"));
  const tags = getAllTags({ posts });
  return {
    props: {
      posts,
      tags,
      post: profilePostData.post,
      blockMap: profilePostData.blockMap,
    },
    revalidate: REVALIDATE,
  };
};

type Props = Omit<React.ComponentProps<typeof Profile>, "fullWidth"> &
  Omit<React.ComponentProps<typeof SearchLayout>, "currentTag"> & {
    postsToShow: Post[];
  };

const Blog: NextPage<Props> = ({ posts, post, blockMap, tags }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {post && blockMap && <Profile blockMap={blockMap} post={post} />}
      <SearchLayout tags={tags} posts={posts} />
    </Container>
  );
};

export default Blog;
