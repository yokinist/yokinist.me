import clsx from "clsx";
import { useRouter } from "next/router";
import NextHeadSeo from "next-head-seo";
import BLOG from "~/blog.config";
import { Footer, Header } from "~/components";
import { getOGImageURL } from "~/lib/getOGImageURL";

type Props = {
  children: React.ReactNode;
  type?: "article" | "website";
  title?: string;
  description?: string;
  fullWidth?: boolean;
  date?: string;
};

export const Container: React.FC<Props> = ({
  children,
  fullWidth,
  ...meta
}) => {
  const router = useRouter();
  const root = router.pathname === "/";
  const siteTitle = meta.title ?? BLOG.title;
  // asPath of the statically generated home page is "/index"
  const url = root ? BLOG.link : `${BLOG.link}${router.asPath.split("?")[0]}`;
  const articleMetaTags =
    meta.type === "article"
      ? [
          { property: "article:published_time", content: meta.date ?? "" },
          { property: "article:author", content: BLOG.author },
        ]
      : [];

  return (
    <div>
      <NextHeadSeo
        title={meta.title}
        description={meta.description}
        robots={"index, follow"}
        canonical={url}
        og={{
          title: meta.title,
          url,
          type: meta.type ?? "website",
          description: meta.description,
          image: getOGImageURL({
            title: siteTitle,
            root,
            twitter: false,
          }),
        }}
        customMetaTags={[
          ...articleMetaTags,
          {
            charSet: "UTF-8",
          },
          {
            property: "og:locale",
            content: BLOG.lang,
          },
          ...(BLOG.seo.googleSiteVerification
            ? [
                {
                  name: "google-site-verification",
                  content: BLOG.seo.googleSiteVerification,
                },
              ]
            : []),
          {
            name: "keywords",
            content: BLOG.seo.keywords.join(", "),
          },
          {
            property: "twitter:image",
            content: getOGImageURL({
              title: siteTitle,
              root,
              twitter: true,
            }),
          },
        ]}
        twitter={{
          card: "summary_large_image",
          site: BLOG.twitterUsername ? `@${BLOG.twitterUsername}` : undefined,
        }}
      />
      <div
        className={clsx("wrapper", {
          "font-serif": BLOG.font === "serif",
          "font-sans": BLOG.font !== "serif",
        })}
      >
        <Header navBarTitle={siteTitle} fullWidth={fullWidth} />
        <main
          className={clsx("m-auto grow w-full transition-all", {
            "px-4 md:px-24": fullWidth,
            "max-w-2xl px-4": !fullWidth,
          })}
        >
          {children}
        </main>
        <Footer fullWidth={fullWidth} />
      </div>
    </div>
  );
};
