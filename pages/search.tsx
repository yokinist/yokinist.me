import { GetStaticProps, NextPage } from 'next'
import { getAllPosts, getAllTags } from '@/lib/notion'
import SearchLayout from '@/layouts/search'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts()
  if (!posts) return { notFound: true }
  const publishPosts = posts.filter(
    post => post?.status?.[0] === 'Published' && post?.type?.[0] === 'Post'
  )
  const tags = await getAllTags()
  return {
    props: {
      tags,
      posts: publishPosts
    },
    revalidate: 1
  }
}

type Props = Omit<React.ComponentProps<typeof SearchLayout>, 'currentTag'>

const SearchPage: NextPage<Props> = ({ tags, posts }) => {
  return <SearchLayout tags={tags} posts={posts} />
}

export default SearchPage
