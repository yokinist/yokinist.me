import { GetStaticProps } from "next";
import { Layout } from "~/layouts";
import { getPostPaths, getPostProps } from "~/lib/postPage";

export const getStaticPaths = getPostPaths("Page");

const getPageProps = getPostProps("Page");

// Unknown slugs may be posts linked by their old root URL
export const getStaticProps: GetStaticProps = async (context) => {
  const result = await getPageProps(context);
  if (!("notFound" in result)) return result;
  return {
    redirect: {
      destination: `/posts/${context.params?.slug}`,
      permanent: true,
    },
  };
};

export default Layout;
