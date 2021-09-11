import { GetStaticProps, NextPage } from 'next'
import { createHash } from 'crypto'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { filterPublishedPosts, getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { Post } from '@/types'
import Profile from '@/components/Profile'

const getProfilePost = async (allPosts: Post[]) => {
  const post = allPosts.find(t => t.slug === BLOG.profileSlug)
  if (!post?.id) return { post: null, blockMap: null }
  const blockMap = await getPostBlocks(post.id)
  return {
    post,
    blockMap
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts({ includedPages: true })
  const profilePostData = await getProfilePost(allPosts)
  const emailHash = createHash('md5').update(BLOG.email).digest('hex')
  const posts = filterPublishedPosts({
    posts: allPosts,
    includedPages: false
  })
  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
      post: profilePostData.post,
      blockMap: profilePostData.blockMap,
      emailHash
    },
    revalidate: 1
  }
}

type Props = React.ComponentProps<typeof Pagination> &
  Omit<React.ComponentProps<typeof Profile>, 'fullWidth'> & {
    postsToShow: Post[]
  }

const blog: NextPage<Props> = ({
  postsToShow,
  page,
  showNext,
  post,
  blockMap,
  emailHash
}) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {post && blockMap && (
        <Profile blockMap={blockMap} post={post} emailHash={emailHash} />
      )}
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog
