import { permanentRedirect } from "next/navigation";
import { Layout } from "~/layouts/layout";
import {
  getPostMetadata,
  getPostPageData,
  getPostParams,
} from "~/lib/postPage";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export const generateStaticParams = () => getPostParams("Page");

export const generateMetadata = async ({ params }: Props) =>
  getPostMetadata("Page", decodeURIComponent((await params).slug));

const Page = async ({ params }: Props) => {
  const slug = decodeURIComponent((await params).slug);
  // Unknown slugs may be posts linked by their old root URL
  const data = await getPostPageData("Page", slug, () =>
    permanentRedirect(`/posts/${slug}`),
  );
  return <Layout {...data} />;
};

export default Page;
