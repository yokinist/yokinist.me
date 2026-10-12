import clsx from "clsx";
import { Twemoji } from "components/Twemoji";
import Link from "next/link";
import { getTagData } from "~/lib/tags";

type Props =
  | {
      tagKey: string;
      selected: boolean;
      count: number;
    }
  | {
      tagKey: string;
      selected: boolean;
      root: boolean;
    };

export const TagTabItem: React.FC<Props> = ({ tagKey, selected, ...rest }) => {
  const linkUrl =
    selected || !("count" in rest)
      ? "/"
      : `/tags/${encodeURIComponent(tagKey)}`;
  const tagData = getTagData(tagKey);
  return (
    <li className="block min-w-max whitespace-nowrap">
      <Link
        href={linkUrl}
        scroll={false}
        aria-current={selected ? "page" : undefined}
        className={clsx(
          "flex items-center gap-1.5 py-1 px-3 rounded-full text-sm transition-colors",
          {
            "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900":
              selected,
            "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800":
              !selected,
          },
        )}
      >
        {tagData.emoji && <Twemoji emoji={tagData.emoji} size={16} />}
        <span>{tagData.name}</span>
        {"count" in rest && (
          <span className="text-xs tabular-nums">{rest.count}</span>
        )}
      </Link>
    </li>
  );
};
