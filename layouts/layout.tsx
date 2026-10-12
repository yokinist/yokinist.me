import Image from "next/image";
import type { ExtendedRecordMap } from "notion-types";

import BLOG from "~/blog.config";
import { Container } from "~/components";
import { NotionRenderer } from "~/components/Notion";
import { PostNav } from "~/components/PostNav";
import { TagItem } from "~/components/Tag";
import formatDate from "~/lib/formatDate";
import { getTwitterShareUrl } from "~/lib/getTwitterShareUrl";
import { locale } from "~/lib/i18n/lang";
import { byType } from "~/lib/notion/toPosts";
import type { Post, PostLink } from "~/types";

type Props = {
  blockMap: ExtendedRecordMap;
  post: Post;
  emailHash?: string;
  onlyContents?: boolean;
  prev?: PostLink | null;
  next?: PostLink | null;
};

export const Layout: React.FC<Props> = ({
  blockMap,
  post,
  emailHash,
  onlyContents = false,
  prev = null,
  next = null,
}) => {
  const renderContents = () => (
    <article className="mt-4 mb-8 md:mt-0">
      <h1 className="md:text-3xl text-2xl font-bold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
        {post.title}
      </h1>
      {post?.type?.[0] !== "Page" && (
        <nav className="flex items-center gap-x-3 mt-4 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex mt-2">
            {BLOG.showPostAuthor && (
              <>
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
              </>
            )}
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
      title={post.title}
      description={post.summary}
      date={new Date(post.date?.start_date || post.createdTime).toISOString()}
      type="article"
      fullWidth={post.fullWidth}
    >
      <div className="reading-progress" aria-hidden />
      {renderContents()}
      {BLOG.showPostFooter && (
        <div className="mb-4">
          <div>---</div>
          <div className="flex">
            <a
              href={getTwitterShareUrl({
                text: post.title,
                url: `${BLOG.link}${byType("Page")(post) ? "" : "/posts"}/${
                  post.slug
                }`,
                ...(BLOG.twitterUsername && { via: BLOG.twitterUsername }),
              })}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="share with twitter"
              className="ml-auto text-blue-700 dark:text-blue-400 underline border-blue-700 dark:border-blue-400 cursor-pointer"
            >
              {locale.POST.SHARE}
            </a>
          </div>
        </div>
      )}
      {byType("Post")(post) && <PostNav prev={prev} next={next} />}
    </Container>
  );
};
