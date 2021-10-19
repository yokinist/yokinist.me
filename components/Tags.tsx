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
    <div className="tag-container">
      <ul className="flex overflow-x-auto mt-4 max-w-full">
        {Object.keys(tags).map((key) => {
          const selected = key === currentTag;
          return (
            <li
              key={key}
              className={classNames('mr-3 font-medium border whitespace-nowrap dark:text-gray-300', {
                'text-white bg-black border-black dark:bg-gray-600 dark:border-gray-600': selected,
                'bg-gray-100 border-gray-100 text-gray-400 dark:bg-night dark:border-gray-800': !selected,
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
