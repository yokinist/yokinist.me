import { Post } from '@/types'

const currentDate = new Date()

export const filterPublishedPosts = (posts: Post[] | null) => {
  if (!posts || !posts.length) return null
  const publishedPosts = posts.filter(post => {
    const postDate = new Date(post?.date?.start_date || post.createdTime)
    return (
      post.title &&
      post.slug &&
      post?.status?.[0] === 'Published' &&
      (post?.type?.[0] === 'Post' || post?.type?.[0] === 'Page') &&
      postDate.getTime() < currentDate.getTime()
    )
  })
  return publishedPosts.length ? publishedPosts : null
}
