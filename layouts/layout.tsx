import Image from "next/image";
import { useRouter } from "next/router";
import { ExtendedRecordMap } from "notion-types";

import BLOG from "~/blog.config";
import { Container } from "~/components";
import { NotionRenderer } from "~/components/Notion";
import { TagItem } from "~/components/Tag";
import formatDate from "~/lib/formatDate";
import { useLocale } from "~/lib/i18n/locale";
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
  const locale = useLocale();
  const router = useRouter();

  const renderContents = () => (
    <article className="mt-4 mb-8 md:mt-0">
      <h1 className="md:text-3xl text-2xl font-bold text-black dark:text-white">
        {post.title}
      </h1>
      {post?.type?.[0] !== "Page" && (
        <nav className="flex flex-col items-center mt-7 mb-4 text-gray-500 dark:text-gray-300">
          <div className="flex mt-2">
            <a href={BLOG.socialLink || "#"} className="flex">
              <Image
                alt={BLOG.author}
                width={24}
                height={24}
                src={`https://gravatar.com/avatar/${emailHash}`}
                className="rounded-full"
              />
              <p className="md:block ml-2">{BLOG.author}</p>
            </a>
            <span className="block">&nbsp;/&nbsp;</span>
            <div className="mr-2 md:ml-0">
              {formatDate(
                post?.date?.start_date || post.createdTime,
                BLOG.lang,
              )}
            </div>
          </div>
          {post.tags && (
            <div className="mt-2 mb-[1px] flex overflow-x-auto flex-nowrap max-w-full article-tags">
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
      <div className="mb-4" />
      <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
        <button
          onClick={() => router.push(BLOG.path || "/")}
          className="mt-2 hover:text-black dark:hover:text-gray-100 cursor-pointer"
          type="button"
        >
          ← {locale?.POST.BACK}
        </button>
      </div>
    </Container>
  );
};
