import { Post } from '@/@types'
import Link from 'next/link'

type Props = {
  tag: Post['tags'][number]
}

const TagItem: React.VFC<Props> = ({ tag }) => (
  <Link href={`/tag/${encodeURIComponent(tag)}`}>
    <a>
      <p className="mr-1 rounded-full px-2 py-1 border leading-none text-sm dark:border-gray-600">
        {tag}
      </p>
    </a>
  </Link>
)

export default TagItem
