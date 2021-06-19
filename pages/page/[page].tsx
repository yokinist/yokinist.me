import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import parseSafeNumber from '@/lib/parseSafeNumber'
import BLOG from '@/blog.config'
import { Post } from '@/types'

export const getStaticProps: GetStaticProps = async context => {
  const { page } = context.params // Get Current Page No.
  const pageNum = parseSafeNumber(page)
  if (!pageNum) return { notFound: true }
  let posts = await getAllPosts()
  posts = posts.filter(
    post => post.status[0] === 'Published' && post.type[0] === 'Post'
  )
  const postsToShow = posts.slice(
    BLOG.postsPerPage * (pageNum - 1),
    BLOG.postsPerPage * pageNum
  )
  const totalPosts = posts.length
  const showNext = pageNum * BLOG.postsPerPage < totalPosts
  return {
    props: {
      page, // Current Page
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let posts = await getAllPosts()
  posts = posts.filter(
    post => post.status[0] === 'Published' && post.type[0] === 'Post'
  )
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / BLOG.postsPerPage)
  return {
    // remove first page, we 're not gonna handle that.
    paths: Array.from({ length: totalPages - 1 }, (_, i) => ({
      params: { page: '' + (i + 2) }
    })),
    fallback: true
  }
}

type Props = React.ComponentProps<typeof Pagination> & {
  postsToShow: Post[]
}

const Page: NextPage<Props> = ({ postsToShow, page, showNext }) => {
  return (
    <Container>
      {postsToShow &&
        postsToShow.map(post => <BlogPost key={post.id} post={post} />)}
      <Pagination page={page} showNext={showNext} />
    </Container>
  )
}

export default Page
