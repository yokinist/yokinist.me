import Script from "next/script";
import BLOG from "~/blog.config";
import CJK from "~/lib/cjk";

export const Scripts: React.VFC = () => (
  <>
    {BLOG.isProd && BLOG.gaMeasurementId && (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.gaMeasurementId}`}
        />
        <Script strategy="lazyOnload" id="ga">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${BLOG.gaMeasurementId}', {
              page_path: window.location.pathname,
            });`}
        </Script>
      </>
    )}
    <noscript>
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?family=Noto+${
          BLOG.font === "serif" ? "Serif" : "Sans"
        }+${CJK()}:wght@400;700&display=swap`}
      />
    </noscript>
  </>
);
