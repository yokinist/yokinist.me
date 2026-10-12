import "katex/dist/katex.min.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import "prismjs/themes/prism.css";
import "react-notion-x/src/styles.css";
import BLOG from "~/blog.config";

import { Scripts } from "~/components";
import { LocaleProvider } from "~/lib/i18n/locale";
import "~/styles/globals.css";
import "~/styles/notion.css";

const Gtag = dynamic(() => import("~/components/Stats/Gtag"), { ssr: false });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Scripts />
      <LocaleProvider>
        {BLOG.isProd && BLOG.gaMeasurementId && <Gtag />}
        <ThemeProvider
          attribute="class"
          defaultTheme={BLOG.appearance}
          themes={["dark", "light"]}
          enableSystem={false}
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </LocaleProvider>
    </>
  );
};

export default MyApp;
