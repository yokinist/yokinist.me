import classNames from "classnames";
import { Twemoji } from "components/Twemoji";
import Link from "next/link";
import { getTagData } from "~/lib/tags";

type Props = {
  tag: string;
};

export const TagItem: React.FC<Props> = ({ tag }) => {
  const tagData = getTagData(tag);
  return (
    <Link href={`/tags/${encodeURIComponent(tag)}`}>
      <div className="flex items-center py-1 px-2.5 mr-1 text-xs leading-none rounded-full border border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:border-zinc-500 transition-colors">
        {tagData.emoji && <Twemoji emoji={tagData.emoji} size={16} />}
        <p
          className={classNames({
            "ml-1": !!tagData.emoji,
          })}
        >
          {tagData.name}
        </p>
      </div>
    </Link>
  );
};
