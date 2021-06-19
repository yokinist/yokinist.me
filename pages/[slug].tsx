import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { createHash } from 'crypto'

export const getStaticPaths: GetStaticPaths = async () => {
  let posts = await getAllPosts()
  posts = posts.filter(post => post.status[0] === 'Published')
  return {
    paths: posts.map(row => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params
  let posts = await getAllPosts()
  posts = posts.filter(post => post.status[0] === 'Published')
  const post = posts.find(t => t.slug === slug)
  const blockMap = await getPostBlocks(post.id)
  const emailHash = createHash('md5').update(BLOG.email).digest('hex')

  return {
    props: { post, blockMap, emailHash },
    revalidate: 1
  }
}

type Props = Omit<React.ComponentProps<typeof Layout>, 'fullWidth'>

const BlogPost: NextPage<Props> = ({ post, blockMap, emailHash }) => {
  if (!post) return null
  return (
    <>
      <Layout
        blockMap={blockMap}
        post={post}
        emailHash={emailHash}
        fullWidth={post?.fullWidth ?? false}
      />
    </>
  )
}

export default BlogPost
