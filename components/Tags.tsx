import { TagObj } from '@/types';
import classNames from 'classnames';
import Link from 'next/link';

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
            <a className="block py-2 px-4">🌴 All</a>
          </Link>
        </li>
        {Object.keys(tags).map((key) => {
          const selected = key === currentTag;
          return (
            <li
              key={key}
              className={classNames('mr-3 font-bold whitespace-nowrap rounded-lg', {
                'text-gray-400  border-gray-100 dark:border-gray-700': !selected,
                'bg-gray-200 text-gray-700': selected,
              })}
            >
              <Link href={selected ? '/' : `/tag/${encodeURIComponent(key)}`} scroll={false}>
                <a className="block py-2 px-4">{`${key} (${tags[key]})`}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tags;
