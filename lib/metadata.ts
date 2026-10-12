import type { Metadata } from "next";
import BLOG from "~/blog.config";
import { getOGImageURL } from "~/lib/getOGImageURL";

type Params = {
  title?: string;
  description?: string;
  // Path after the site URL: "" for the home page, "/posts/slug", ...
  path: string;
  publishedTime?: string;
};

export const buildMetadata = ({
  title,
  description,
  path,
  publishedTime,
}: Params): Metadata => {
  const pageTitle = title ?? BLOG.title;
  const root = path === "";
  return {
    title: pageTitle,
    description: description || BLOG.description,
    keywords: BLOG.seo.keywords,
    // Pages replace the layout's alternates, so the feed is repeated here
    alternates: {
      canonical: `${BLOG.link}${path}`,
      types: { "application/rss+xml": "/feed" },
    },
    openGraph: {
      title: pageTitle,
      description: description || BLOG.description,
      url: `${BLOG.link}${path}`,
      locale: BLOG.lang,
      images: getOGImageURL({ title: pageTitle, root, twitter: false }),
      ...(publishedTime
        ? { type: "article", publishedTime, authors: [BLOG.author] }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      site: BLOG.twitterUsername ? `@${BLOG.twitterUsername}` : undefined,
      images: getOGImageURL({ title: pageTitle, root, twitter: true }),
    },
    ...(BLOG.seo.googleSiteVerification && {
      verification: { google: BLOG.seo.googleSiteVerification },
    }),
  };
};
