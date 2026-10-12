import { Container } from "~/components/Container";
import { Profile } from "~/components/Profile";
import { SearchLayout } from "~/layouts/search";
import { buildMetadata } from "~/lib/metadata";
import { byType, getAllPosts, getAllTags, getProfilePost } from "~/lib/notion";

// Refetch from Notion at most every 60 seconds (ISR)
export const revalidate = 60;

export const metadata = buildMetadata({ path: "" });

const HomePage = async () => {
  const allPosts = await getAllPosts();
  const { post, blocks } = await getProfilePost(allPosts);
  const posts = allPosts.filter(byType("Post"));
  return (
    <Container>
      {post && blocks && <Profile post={post} blocks={blocks} />}
      <SearchLayout posts={posts} tags={getAllTags({ posts })} />
    </Container>
  );
};

export default HomePage;
