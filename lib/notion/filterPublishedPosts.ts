import { Post } from '@/types'
import BLOG from '@/blog.config'

const currentDate = new Date().toLocaleDateString(BLOG.lang)

type Props = {
  posts: Post[] | null
  includedPages: boolean
}
export const filterPublishedPosts = ({ posts, includedPages }: Props) => {
  if (!posts || !posts.length) return []
  const publishedPosts = posts
    .filter(post =>
      includedPages
        ? post?.type?.[0] === 'Post'
        : post?.type?.[0] === 'Post' || post?.type?.[0] === 'Page'
    )
    .filter(post => {
      const postDate = new Date(
        post?.date?.start_date || post.createdTime
      ).toLocaleDateString(BLOG.lang)
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        (post?.type?.[0] === 'Post' || post?.type?.[0] === 'Page') &&
        postDate <= currentDate
      )
    })
  return publishedPosts
}
