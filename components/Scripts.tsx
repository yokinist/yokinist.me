import Script from "next/script";
import BLOG from "~/blog.config";

export const Scripts: React.FC = () => (
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
  </>
);
