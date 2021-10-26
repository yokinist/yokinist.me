import classNames from 'classnames';
import { Twemoji } from 'components/Twemoji';
import Link from 'next/link';
import { getTagDataBySlug, TagSlug } from '~/lib/tags';

type Props = {
  tag: string;
};

export const TagItem: React.VFC<Props> = ({ tag }) => {
  const castKey = tag as TagSlug;
  const tagData = getTagDataBySlug(castKey);
  return (
    <Link href={`/tag/${encodeURIComponent(tag)}`}>
      <a>
        <div className="flex items-center py-1 px-2 mr-1 text-sm leading-none rounded-full border dark:border-gray-600">
          {tagData?.emoji && <Twemoji emoji={tagData.emoji} size={16} />}
          <p
            className={classNames({
              'ml-1': !!tagData?.emoji,
            })}
          >
            {tagData?.name ?? tag}
          </p>
        </div>
      </a>
    </Link>
  );
};
