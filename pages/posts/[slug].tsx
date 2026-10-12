import { Layout } from "~/layouts";
import { getPostPaths, getPostProps } from "~/lib/postPage";

export const getStaticPaths = getPostPaths("Post");
export const getStaticProps = getPostProps("Post");

export default Layout;
