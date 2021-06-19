import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

type Props = {
  page: number
  showNext: boolean
}
const Pagination: React.VFC<Props> = ({ page, showNext }) => {
  const locale = useLocale()
  if (!locale) return null
  const currentPage = +page
  return (
    <div className="flex justify-between font-medium text-black dark:text-gray-100">
      <Link
        href={
          currentPage - 1 === 1
            ? `${BLOG.path || '/'}`
            : `/page/${currentPage - 1}`
        }
      >
        <a rel="prev">
          <button
            className={`${
              currentPage === 1 ? 'invisible' : 'block'
            } cursor-pointer`}
          >
            ← {locale.PAGINATION.PREV}
          </button>
        </a>
      </Link>
      <Link href={`/page/${currentPage + 1}`}>
        <a rel="next">
          <button
            className={`${+showNext ? 'block' : 'invisible'} cursor-pointer`}
          >
            {locale.PAGINATION.NEXT} →
          </button>
        </a>
      </Link>
    </div>
  )
}

export default Pagination
