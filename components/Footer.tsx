import classNames from "classnames";
import BLOG from "~/blog.config";

type Props = { fullWidth?: boolean };

export const Footer: React.FC<Props> = ({ fullWidth }) => {
  return (
    <div
      className={classNames(
        "mt-16 shrink-0 m-auto w-full text-zinc-500 transition-all",
        {
          "px-4 md:px-24": fullWidth,
          "max-w-2xl px-4": !fullWidth,
        },
      )}
    >
      <hr className="border-zinc-200 dark:border-zinc-800" />
      <div className="flex flex-wrap justify-between gap-4 my-6 text-xs">
        <p>© {BLOG.author}</p>
        <div className="flex gap-4">
          <a
            href="/feed"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            RSS
          </a>
          <a
            href={BLOG.repository}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
};
