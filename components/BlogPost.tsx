import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import { Post } from '@/types'
import { ExternalLinkIcon } from '@heroicons/react/outline'

type Props = {
  post: Post
}

type RenderBlogPostArg = {
  isOuterLink: boolean
}

const BlogPost: React.VFC<Props> = ({ post }) => {
  const renderBlogPost = ({ isOuterLink }: RenderBlogPostArg) => {
    return (
      <article key={post.id} className="mb-6 md:mb-8 mt-2 hover:opacity-80">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline">
          <div className="flex">
            <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
              {post.title}
            </h2>
            {isOuterLink && (
              <ExternalLinkIcon className="h-5 w-5 min-w-[20px] mr-2 ml-1 text-indigo-400 dark:text-indigo-200" />
            )}
          </div>
          <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
          </time>
        </header>
        <main>
          <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
            {post.summary}
          </p>
        </main>
      </article>
    )
  }

  return post?.outer_link ? (
    <a
      href={post.outer_link}
      target="_blank"
      rel="noreferrer"
      aria-label="outer-link"
    >
      {renderBlogPost({ isOuterLink: true })}
    </a>
  ) : (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <a>{renderBlogPost({ isOuterLink: false })}</a>
    </Link>
  )
}

export default BlogPost
