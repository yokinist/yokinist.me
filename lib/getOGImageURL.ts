import BLOG from "~/blog.config";
import formatDate from "~/lib/formatDate";

type GetOGImageUrlArgs = {
  title: string;
  // The home page leaves out the site title, which is its title already
  root: boolean;
  // ISO date of a post, shown at the bottom of the card
  date?: string;
};

// Parameters: https://github.com/yokinist/og-image#parameters
export const getOGImageURL = ({ title, root, date }: GetOGImageUrlArgs) => {
  const params = new URLSearchParams({
    background: BLOG.darkBackground,
    foreground: BLOG.lightBackground,
  });
  if (!root) params.set("siteTitle", BLOG.title);
  if (BLOG.ogImageLogo) params.set("logo", BLOG.ogImageLogo);
  if (date) params.set("date", formatDate(date, BLOG.lang));
  return `${BLOG.ogImageGenerateURL}/${encodeURIComponent(title)}.png?${params}`;
};
