import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { getAllPosts, getAllTags } from '@/lib/notion'
import SearchLayout from '@/layouts/search'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentTag = params.tag
  if (typeof currentTag !== 'string') {
    return {
      notFound: true
    }
  }
  let posts = await getAllPosts()
  posts = posts.filter(
    post => post.status[0] === 'Published' && post.type[0] === 'Post'
  )
  const tags = await getAllTags()
  const filteredPosts = posts.filter(
    post => post && post.tags && post.tags.includes(currentTag)
  )
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags()
  return {
    paths: Object.keys(tags).map(tag => ({ params: { tag } })),
    fallback: true
  }
}

type Props = React.ComponentProps<typeof SearchLayout>

const TagPage: NextPage<Props> = ({ tags, posts, currentTag }) => {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />
}

export default TagPage
