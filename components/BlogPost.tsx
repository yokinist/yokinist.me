import { ExternalLinkIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import Link from "next/link";
import BLOG from "~/blog.config";
import formatDate from "~/lib/formatDate";
import { Post } from "~/types";

type Props = {
  post: Post;
};

type RenderBlogPostArg = {
  isOuterLink: boolean;
};

export const BlogPost: React.VFC<Props> = ({ post }) => {
  const isProject = post?.type?.[0] === "Project";
  const renderBlogPost = ({ isOuterLink }: RenderBlogPostArg) => {
    return (
      <article
        key={post.id}
        className="mt-2 mb-6 md:mb-8 hover:opacity-90 transition-transform ease-out hover:scale-105"
      >
        <header className="flex flex-col md:flex-row justify-between md:items-baseline">
          <div className="flex">
            <h2 className="mb-2 text-lg md:text-xl font-bold text-black dark:text-white cursor-pointer">
              {post.title}
            </h2>
            {isOuterLink && (
              <ExternalLinkIcon className="mt-[0.5px] mr-2 sm:mr-0 ml-1 w-5 min-w-[20px] h-5 text-blue-700 dark:text-blue-400" />
            )}
          </div>
          <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
          </time>
        </header>
        {post?.thumbnail_url && (
          <img
            src={post.thumbnail_url}
            alt={post.title}
            decoding="async"
            className="my-3 bg-gray-100 dark:bg-gray-900 rounded-md drop-shadow-md"
          />
        )}
        <main>
          <p
            className={classNames(
              "leading-8 text-gray-700 dark:text-gray-300",
              {
                "hidden md:block": post?.type?.[0] !== "Project",
              },
            )}
          >
            {post.summary}
          </p>
        </main>
        {isProject && post?.repo_url && (
          <a
            href={post.repo_url}
            target="_blank"
            className="text-blue-700 dark:text-blue-400 border-blue-700 dark:border-blue-400"
            rel="noreferrer"
          >
            {post.repo_url}
          </a>
        )}
      </article>
    );
  };

  return post?.outer_link ? (
    <a
      href={post.outer_link}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="outer-link"
    >
      {renderBlogPost({ isOuterLink: true })}
    </a>
  ) : (
    <Link href={`${BLOG.path}/${post.slug}`}>
      {renderBlogPost({ isOuterLink: false })}
    </Link>
  );
};
