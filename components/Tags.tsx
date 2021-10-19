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
      <span className="block min-w-max font-bold text-gray-200">🔖 ：</span>
      <ul className="flex overflow-x-auto mt-4 max-w-full">
        {Object.keys(tags).map((key) => {
          const selected = key === currentTag;
          return (
            <li
              key={key}
              className={classNames('mr-3 font-medium border whitespace-nowrap dark:text-white rounded-md', {
                'text-white bg-black border-gray-100 dark:bg-gray-600 dark:border-gray-700': !selected,
                'bg-gray-100 border-white text-gray-400 dark:bg-night dark:border-gray-300': selected,
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
