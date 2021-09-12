import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BLOG from '@/blog.config'
import colors from 'tailwindcss/colors'
import Head from 'next/head'
import classNames from 'classnames'
import router from 'next/router'
// import BlogPost from './BlogPost'

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
  layout,
  fullWidth,
  type = 'website',
  ...customMeta
}) => {
  const meta = {
    title: BLOG.title,
    type,
    ...customMeta
  }
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        {/* <meta content={BLOG.darkBackground} name="theme-color" /> */}
        <meta name="robots" content="follow, index" />
        <meta charSet="UTF-8" />
        {BLOG.seo.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={BLOG.seo.googleSiteVerification}
          />
        )}
        {BLOG.seo.keywords && (
          <meta name="keywords" content={BLOG.seo.keywords.join(', ')} />
        )}
        <meta name="description" content={meta.description} />
        <meta property="og:locale" content={BLOG.lang} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:url"
          content={meta.slug ? `${url}/${meta.slug}` : url}
        />
        {router.pathname === (BLOG.path || '/') ? (
          <meta
            property="og:image"
            content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
              meta.title
            )}.png?md=1&fontSize=96px&background=${encodeURIComponent(
              BLOG.darkBackground
            )}&foreground=${encodeURIComponent(
              BLOG.lightBackground
            )}&accentColor=${encodeURIComponent(colors.cyan[600])}`}
          />
        ) : (
          <meta
            property="og:image"
            content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
              meta.title
            )}.png?md=1&fontSize=96px&siteTitle=${encodeURIComponent(
              BLOG.title
            )}&background=${encodeURIComponent(
              BLOG.darkBackground
            )}&foreground=${encodeURIComponent(
              BLOG.lightBackground
            )}&accentColor=${encodeURIComponent(colors.cyan[600])}`}
          />
        )}
        <meta property="og:type" content={meta.type} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:title" content={meta.title} />
        {router.pathname === (BLOG.path || '/') ? (
          <meta
            property="og:image"
            content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
              meta.title
            )}.png?md=1&fontSize=96px&background=${encodeURIComponent(
              BLOG.darkBackground
            )}&foreground=${encodeURIComponent(
              BLOG.lightBackground
            )}&accentColor=${encodeURIComponent(
              colors.cyan[600]
            )}&isTwitter=true`}
          />
        ) : (
          <meta
            property="og:image"
            content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
              meta.title
            )}.png?md=1&fontSize=96px&siteTitle=${encodeURIComponent(
              BLOG.title
            )}&background=${encodeURIComponent(
              BLOG.darkBackground
            )}&foreground=${encodeURIComponent(
              BLOG.lightBackground
            )}&accentColor=${encodeURIComponent(
              colors.cyan[600]
            )}&isTwitter=true`}
          />
        )}
        {meta.type === 'article' && (
          <>
            <meta
              property="article:published_time"
              content={meta.date || meta.createdTime}
            />
            <meta property="article:author" content={BLOG.author} />
          </>
        )}
      </Head>
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
