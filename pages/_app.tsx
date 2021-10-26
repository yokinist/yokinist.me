import 'katex/dist/katex.min.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import 'prismjs/themes/prism.css';
import 'react-notion-x/src/styles.css';
import 'react-static-tweets/styles.css';
import BLOG from '~/blog.config';
import { Scripts } from '~/components';
import { LocaleProvider } from '~/lib/i18n/locale';
import '~/styles/globals.css';
import '~/styles/notion.css';

const Ackee = dynamic(() => import('~/components/Stats/Ackee'), { ssr: false });
const Gtag = dynamic(() => import('~/components/Stats/Gtag'), { ssr: false });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Scripts />
      <LocaleProvider>
        <>
          {BLOG.isProd && BLOG.analytics.provider === 'ackee' && (
            <Ackee
              ackeeServerUrl={BLOG.analytics.ackeeConfig.dataAckeeServer}
              ackeeDomainId={BLOG.analytics.ackeeConfig.domainId}
            />
          )}
          {BLOG.isProd && BLOG.analytics.provider === 'ga' && <Gtag />}
          <ThemeProvider
            attribute="class"
            defaultTheme={BLOG.appearance}
            themes={['dark', 'light']}
            enableSystem={false}
          >
            <Component {...pageProps} />
          </ThemeProvider>
        </>
      </LocaleProvider>
    </>
  );
};

export default MyApp;
