import Image from 'next/image'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { NotionRenderer, Equation, Code, CollectionRow } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types/build/esm/maps'
import 'gitalk/dist/gitalk.css'
import Container from '@/components/Container'
import TagItem from '@/components/TagItem'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import { useLocale } from '@/lib/locale'
import Comment from '@/components/Comment'
import { Post } from '@/types'
import type { Tweet } from 'react-static-tweets'

const enableCommentArea = BLOG.comment.provider !== ''

const mapPageUrl = (id: string) => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

type Props = {
  blockMap: ExtendedRecordMap
  post: Post
  emailHash: string
  fullWidth?: boolean
  onlyContents?: boolean
  tweet?: typeof Tweet
}

const Layout: React.VFC<Props> = ({
  blockMap,
  post,
  emailHash,
  tweet,
  fullWidth = false,
  onlyContents = false
}) => {
  const locale = useLocale()
  const router = useRouter()

  const renderContents = () => (
    <article>
      <h1 className="font-bold text-3xl text-black dark:text-white">
        {post.title}
      </h1>
      {post?.type?.[0] !== 'Page' && (
        <nav className="flex mt-7 items-start text-gray-500 dark:text-gray-400">
          <div className="flex mb-4">
            <a href={BLOG.socialLink || '#'} className="flex">
              <Image
                alt={BLOG.author}
                width={24}
                height={24}
                src={`https://gravatar.com/avatar/${emailHash}`}
                className="rounded-full"
              />
              <p className="ml-2 md:block">{BLOG.author}</p>
            </a>
            <span className="block">&nbsp;/&nbsp;</span>
          </div>
          <div className="mr-2 mb-4 md:ml-0">
            {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
          </div>
          {post.tags && (
            <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
              {post.tags.map(tag => (
                <TagItem key={tag} tag={tag} />
              ))}
            </div>
          )}
        </nav>
      )}
      {blockMap && (
        <div className="-mt-4">
          <NotionRenderer
            recordMap={blockMap}
            components={{
              equation: Equation,
              code: Code,
              collectionRow: CollectionRow,
              tweet: tweet
            }}
            mapPageUrl={mapPageUrl}
          />
        </div>
      )}
    </article>
  )
  return onlyContents ? (
    renderContents()
  ) : (
    <Container
      layout="blog"
      title={post.title}
      description={post.summary}
      // date={new Date(post.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      {renderContents()}
      <div
        className={classNames(
          'flex justify-between font-medium text-gray-500 dark:text-gray-400',
          {
            'mb-4': enableCommentArea
          }
        )}
      >
        <button
          onClick={() => router.push(BLOG.path || '/')}
          className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
        >
          ← {locale?.POST.BACK}
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
        >
          ↑ {locale?.POST.TOP}
        </button>
      </div>
      <Comment post={post} />
    </Container>
  )
}

export default Layout
