import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import BLOG from "~/blog.config";
import formatDate from "~/lib/formatDate";
import type { Post } from "~/types";

type Props = {
  post: Post;
};

// One row of the post list: title on the left, month and day on the right
export const BlogPost: React.FC<Props> = ({ post }) => {
  const date = post.date || post.createdTime;
  const className = "group flex items-baseline justify-between gap-4 py-3";
  const content = (
    <>
      <span className="text-[15px] text-zinc-800 group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white transition-colors">
        {post.title}
        {post.outer_link && (
          <ArrowTopRightOnSquareIcon
            aria-hidden
            className="inline ml-1 w-4 h-4 align-[-2px] text-blue-700 dark:text-blue-400"
          />
        )}
      </span>
      <time
        dateTime={post.date}
        className="shrink-0 text-xs tabular-nums text-zinc-500 dark:text-zinc-400"
      >
        {formatDate(date, BLOG.lang, { month: "short", day: "numeric" })}
      </time>
    </>
  );

  return (
    <li className="border-b border-zinc-100 dark:border-zinc-800/70">
      {post.outer_link ? (
        <a
          href={post.outer_link}
          target="_blank"
          rel="noreferrer noopener"
          className={className}
        >
          {content}
        </a>
      ) : (
        <Link href={`/posts/${post.slug}`} className={className}>
          {content}
        </Link>
      )}
    </li>
  );
};
