import { GetStaticProps, NextPage } from 'next'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'
import { Post } from '@/types'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts()
  if (!posts) return { notFound: true }
  const publishPosts = posts.filter(
    post => post?.status?.[0] === 'Published' && post?.type?.[0] === 'Post'
  )
  const postsToShow = publishPosts.slice(0, BLOG.postsPerPage)
  const totalPosts = publishPosts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

type Props = React.ComponentProps<typeof Pagination> & {
  postsToShow: Post[]
}

const blog: NextPage<Props> = ({ postsToShow, page, showNext }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog
