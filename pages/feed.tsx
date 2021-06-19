import { GetServerSideProps } from 'next'
import { getAllPosts } from '@/lib/notion'
import { generateRss } from '@/lib/rss'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml')
  const posts = await getAllPosts()
  if (!posts) return { notFound: true }
  const recentPublishPosts = posts
    .filter(
      post => post?.status?.[0] === 'Published' && post?.type?.[0] === 'Post'
    )
    .slice(0, 10)
  const xmlFeed = generateRss(recentPublishPosts)
  res.write(xmlFeed)
  res.end()
  return {
    props: {}
  }
}

const feed = () => null

export default feed
