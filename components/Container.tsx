import classNames from 'classnames';
import NextHeadSeo from 'next-head-seo';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import BLOG from '~/blog.config';
import { Footer, Header } from '~/components';
import { getOGImageURL } from '~/lib/getOGImageURL';

// import BlogPost from './BlogPost'

type NextHeadSeoProps = Parameters<typeof NextHeadSeo>[0];

type Props = {
  children: React.ReactNode;
  layout?: 'blog';
  type?: 'article' | 'website';
  title?: string;
  description?: string;
  fullWidth?: boolean;
  date?: string;
  slug?: string | null;
  createdTime?: string;
  from?: 'post' | 'tag';
};

const url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link;

export const Container: React.VFC<Props> = ({ children, fullWidth, ...meta }) => {
  const router = useRouter();
  const [customMetaTags, setCustomMetaTags] = useState<NextHeadSeoProps['customLinkTags']>([]);
  const [alreadySet, setAlreadySet] = useState<boolean>(false);

  const root = useMemo(() => {
    return router.pathname === (BLOG.path || '/');
  }, [router]);

  const siteUrl = useMemo(() => {
    if (meta?.from === 'tag') {
      return meta.slug ? `${url}/tag/${meta.slug}` : url;
    }
    return meta.slug ? `${url}/${meta.slug}` : url;
  }, [meta]);

  const siteTitle = useMemo(() => {
    return meta.title ?? BLOG.title;
  }, [meta]);

  useEffect(() => {
    if (alreadySet || meta.type !== 'article' || !meta) return;
    setCustomMetaTags((prevCustomMetaTags) =>
      (prevCustomMetaTags ?? []).concat(
        {
          property: 'article:published_time',
          content: meta?.date || meta?.createdTime || '',
        },
        {
          property: 'article:author',
          content: BLOG.author,
        },
      ),
    );
    setAlreadySet(true);
  }, [alreadySet, meta]);

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
          type: meta.type ?? 'website',
          description: meta.description,
          image: getOGImageURL({
            title: siteTitle,
            root,
            twitter: false,
          }),
        }}
        customMetaTags={(customMetaTags ?? []).concat(
          {
            charSet: 'UTF-8',
          },
          {
            property: 'og:locale',
            content: BLOG.lang,
          },
          {
            name: 'google-site-verification',
            content: BLOG.seo.googleSiteVerification,
          },
          {
            name: 'keywords',
            content: BLOG.seo.keywords.join(', '),
          },
          {
            property: 'twitter:image',
            content: getOGImageURL({
              title: siteTitle,
              root,
              twitter: true,
            }),
          },
        )}
        twitter={{
          card: 'summary_large_image',
          site: '@yokinist',
        }}
      />
      <div
        className={classNames('wrapper', {
          'font-serif': BLOG.font === 'serif',
          'font-sans': BLOG.font !== 'serif',
        })}
      >
        <Header navBarTitle={siteTitle} fullWidth={fullWidth} />
        <main
          className={classNames('m-auto flex-grow w-full transition-all', {
            'px-4 md:px-24': fullWidth,
            'max-w-2xl px-4': !fullWidth,
          })}
        >
          {children}
        </main>
        <Footer fullWidth={fullWidth} />
      </div>
    </div>
  );
};
