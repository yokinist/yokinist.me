import { Layout } from "~/layouts/layout";
import {
  getPostMetadata,
  getPostPageData,
  getPostParams,
} from "~/lib/postPage";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export const generateStaticParams = () => getPostParams("Post");

export const generateMetadata = async ({ params }: Props) =>
  getPostMetadata("Post", decodeURIComponent((await params).slug));

const PostPage = async ({ params }: Props) => {
  const slug = decodeURIComponent((await params).slug);
  const data = await getPostPageData("Post", slug);
  return <Layout {...data} />;
};

export default PostPage;
