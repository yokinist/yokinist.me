import classNames from "classnames";
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
    <li
      className={classNames(
        "mr-3 font-bold whitespace-nowrap rounded-lg min-w-max block",
        {
          "text-gray-400 border-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 hover:bg-gray-100":
            !selected,
          "bg-gray-200 text-gray-700 dark:text-night": selected,
        },
      )}
    >
      <Link
        href={linkUrl}
        scroll={false}
        className="flex items-center py-2 px-4"
        passHref
      >
        {tagData.emoji && <Twemoji emoji={tagData.emoji} size={20} />}
        <span
          className={classNames({
            "ml-2": !!tagData.emoji,
          })}
        >
          {"count" in rest ? `${tagData.name} (${rest.count})` : tagData.name}
        </span>
      </Link>
    </li>
  );
};
