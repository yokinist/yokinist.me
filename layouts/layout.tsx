import Image from "next/image";
import { ExtendedRecordMap } from "notion-types";

import BLOG from "~/blog.config";
import { Container } from "~/components";
import { NotionRenderer } from "~/components/Notion";
import { TagItem } from "~/components/Tag";
import formatDate from "~/lib/formatDate";
import { Post } from "~/types";

type Props = {
  blockMap: ExtendedRecordMap;
  post: Post;
  emailHash: string;
  fullWidth?: boolean;
  onlyContents?: boolean;
  slug?: string | null;
};

export const Layout: React.VFC<Props> = ({
  blockMap,
  post,
  emailHash,
  slug,
  fullWidth = false,
  onlyContents = false,
}) => {
  const renderContents = () => (
    <article className="mt-4 mb-8 md:mt-0">
      <h1 className="md:text-3xl text-2xl font-bold text-black dark:text-white">
        {post.title}
      </h1>
      {post?.type?.[0] !== "Page" && (
        <nav className="flex items-center mt-5 mb-4 text-gray-500 dark:text-gray-300">
          <div className="flex mt-2">
            <div className="mr-2 md:ml-0">
              {formatDate(
                post?.date?.start_date || post.createdTime,
                BLOG.lang,
              )}
            </div>
          </div>
          {post.tags && (
            <div className="mt-2 mb-1 flex overflow-x-auto flex-nowrap max-w-full article-tags">
              {post.tags.map((tag) => (
                <TagItem key={tag} tag={tag} />
              ))}
            </div>
          )}
        </nav>
      )}
      {blockMap && (
        <div className="-mt-4 mb-4 notion-ignore-padding-x">
          <NotionRenderer recordMap={blockMap} />
        </div>
      )}
    </article>
  );
  return onlyContents ? (
    renderContents()
  ) : (
    <Container
      layout="blog"
      title={post.title}
      description={post.summary}
      date={new Date(post.createdTime).toISOString()}
      type="article"
      fullWidth={fullWidth}
      slug={slug}
    >
      {renderContents()}
    </Container>
  );
};
