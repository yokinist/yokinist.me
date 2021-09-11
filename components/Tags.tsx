import { TagObj } from '@/types'
import Link from 'next/link'
import classNames from 'classnames'

type Props = {
  tags: TagObj
  currentTag?: string
}

const Tags: React.VFC<Props> = ({ tags, currentTag }: Props) => {
  if (!tags) return null
  return (
    <div className="tag-container">
      <ul className="flex max-w-full mt-4 overflow-x-auto h-full">
        {Object.keys(tags).map(key => {
          const selected = key === currentTag
          return (
            <li
              key={key}
              className={classNames(
                'mr-3 font-medium border whitespace-nowrap dark:text-gray-300 h-8',
                {
                  'text-white bg-black border-black dark:bg-gray-600 dark:border-gray-600':
                    selected,
                  'bg-gray-100 border-gray-100 text-gray-400 dark:bg-night dark:border-gray-800':
                    !selected
                }
              )}
            >
              <Link
                href={selected ? '/' : `/tag/${encodeURIComponent(key)}`}
                scroll={false}
              >
                <a className="px-2 align-text-top py-2">
                  {`${key} (${tags[key]})`}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tags
