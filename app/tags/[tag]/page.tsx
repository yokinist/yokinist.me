import { notFound } from "next/navigation";
import { Container } from "~/components/Container";
import { Profile } from "~/components/Profile";
import { SearchLayout } from "~/layouts/search";
import { getTagData } from "~/lib";
import { buildMetadata } from "~/lib/metadata";
import { byType, getAllPosts, getAllTags, getProfilePost } from "~/lib/notion";

type Props = { params: Promise<{ tag: string }> };

export const revalidate = 60;

export const generateStaticParams = async () => {
  const posts = (await getAllPosts()).filter(byType("Post"));
  return Object.keys(getAllTags({ posts })).map((tag) => ({ tag }));
};

export const generateMetadata = async ({ params }: Props) => {
  const tag = decodeURIComponent((await params).tag);
  return buildMetadata({ title: getTagData(tag).name, path: `/tags/${tag}` });
};

const TagPage = async ({ params }: Props) => {
  const tag = decodeURIComponent((await params).tag);
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(byType("Post"));
  const tagged = posts.filter((post) => post.tags?.includes(tag));
  if (!tagged.length) notFound();
  const { post, blockMap } = await getProfilePost(allPosts);
  return (
    <Container title={getTagData(tag).name}>
      {post && blockMap && <Profile post={post} blockMap={blockMap} />}
      <SearchLayout
        posts={tagged}
        tags={getAllTags({ posts })}
        currentTag={tag}
      />
    </Container>
  );
};

export default TagPage;
