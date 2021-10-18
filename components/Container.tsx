import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BLOG from '@/blog.config'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import NextHeadSeo from 'next-head-seo'
import { useEffect, useMemo, useState } from 'react'
import { getOGImageURL } from '@/lib/getOGImageURL'
// import BlogPost from './BlogPost'

type NextHeadSeoProps = Parameters<typeof NextHeadSeo>[0]

type Props = {
  children: React.ReactNode
  layout?: 'blog'
  type?: 'article' | 'website'
  title?: string
  description?: string
  fullWidth?: boolean
  date?: string
  slug?: string
  createdTime?: string
}

const url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link

const Container: React.VFC<Props> = ({
  children,
  fullWidth,
  type = 'website',
  ...customMeta
}) => {
  const router = useRouter()
  const [customMetaTags, setCustomMetaTags] = useState<
    NextHeadSeoProps['customLinkTags']
  >([
    {
      charSet: 'UTF-8'
    },
    {
      property: 'og:locale',
      content: BLOG.lang
    },
    {
      name: 'google-site-verification',
      content: BLOG.seo.googleSiteVerification
    },
    {
      name: 'keywords',
      content: BLOG.seo.keywords.join(', ')
    }
  ])

  const meta = {
    title: BLOG.title,
    type,
    ...customMeta
  }

  const root = useMemo(() => {
    return router.pathname === (BLOG.path || '/')
  }, [router])

  const siteUrl = useMemo(() => {
    return meta.slug ? `${url}/${meta.slug}` : url
  }, [meta])

  useEffect(() => {
    if (type !== 'article') return
    setCustomMetaTags(prevCustomMetaTags =>
      (prevCustomMetaTags ?? []).concat(
        {
          property: 'article:published_time',
          content: meta?.date || meta?.createdTime || ''
        },
        {
          property: 'article:author',
          content: BLOG.author
        }
      )
    )
  }, [type])

  return (
    <div>
      <NextHeadSeo
        title={meta.title}
        description={meta.description}
        robots={'index, follow'}
        canonical={siteUrl}
        og={{
          title: meta.title,
          url: siteUrl,
          // locale: BLog.lang,
          type: meta.type,
          description: meta.description,
          image: getOGImageURL({
            title: meta.title,
            root,
            twitter: false
          })
        }}
        customMetaTags={(customMetaTags ?? []).concat({
          property: 'twitter:image',
          content: getOGImageURL({
            title: meta.title,
            root,
            twitter: true
          })
        })}
        twitter={{
          card: 'summary_large_image',
          site: '@yokinist'
        }}
      />
      <div
        className={classNames('wrapper', {
          'font-serif': BLOG.font === 'serif',
          'font-sans': BLOG.font !== 'serif'
        })}
      >
        <Header navBarTitle={meta.title} fullWidth={fullWidth} />
        <main
          className={classNames('m-auto flex-grow w-full transition-all', {
            'px-4 md:px-24': fullWidth,
            'max-w-2xl px-4': !fullWidth
          })}
        >
          {children}
        </main>
        <Footer fullWidth={fullWidth} />
      </div>
    </div>
  )
}

export default Container
