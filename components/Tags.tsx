import { getTagDataBySlug, TagSlug } from '@/lib/tags';
import { TagObj } from '@/types';
import classNames from 'classnames';
import Link from 'next/link';
import { Twemoji } from './Twemoji';

type Props = {
  tags: TagObj;
  currentTag?: string;
};

const Tags: React.VFC<Props> = ({ tags, currentTag }: Props) => {
  if (!tags) return null;
  return (
    <div className="flex items-center tag-container">
      <ul className="flex overflow-x-auto mt-4 max-w-full">
        <li
          className={classNames('mr-3 font-bold whitespace-nowrap rounded-lg', {
            'text-gray-400  border-gray-100 dark:border-gray-700': currentTag,
            'bg-gray-200 text-gray-700': !currentTag,
          })}
        >
          <Link href={'/'} scroll={false}>
            <a className="flex items-center py-2 px-4">
              <Twemoji emoji={'🌴'} size={20} />
              <span className="ml-3">All</span>
            </a>
          </Link>
        </li>
        {Object.keys(tags).map((key) => {
          const castKey = key as TagSlug;
          const selected = key === currentTag;
          const emoji = getTagDataBySlug(castKey)?.emoji;
          const tagName = getTagDataBySlug(castKey)?.name ?? castKey;
          return (
            <li
              key={key}
              className={classNames('mr-3 font-bold whitespace-nowrap rounded-lg', {
                'text-gray-400  border-gray-100 dark:border-gray-700': !selected,
                'bg-gray-200 text-gray-700': selected,
              })}
            >
              <Link href={selected ? '/' : `/tag/${encodeURIComponent(key)}`} scroll={false}>
                <a className="flex items-center py-2 px-4">
                  <Twemoji emoji={emoji} size={20} />
                  <span className="ml-3">{`${tagName} (${tags[castKey]})`}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tags;
