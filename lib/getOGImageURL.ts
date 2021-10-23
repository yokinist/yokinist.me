import BLOG from '~/blog.config';

type OGImageQuery = {
  md: string;
  fontSize: string;
  background: string;
  foreground: string;
  siteTitle: string | undefined;
  isTwitter: string | undefined;
};

type OGImageKeys = (keyof OGImageQuery)[];

type GetOGImageUrlArgs = {
  title: string;
  root: boolean;
  twitter: boolean;
};

const convertObjToQueryString = (query: OGImageQuery): string => {
  return (Object.keys(query) as OGImageKeys)
    .filter((key) => !!query[key])
    .map((key) => key + '=' + query[key])
    .join('&');
};

export const getOGImageURL = ({ title, twitter, root }: GetOGImageUrlArgs): string => {
  const defaultParams: OGImageQuery = {
    md: '1',
    fontSize: '96px',
    background: encodeURIComponent(BLOG.darkBackground),
    foreground: encodeURIComponent(BLOG.lightBackground),
    siteTitle: encodeURIComponent(BLOG.title),
    isTwitter: undefined,
  };
  const baseParams = `${BLOG.ogImageGenerateURL}/${encodeURIComponent(title)}.png?`;
  if (twitter) {
    if (!root) {
      return (
        baseParams +
        convertObjToQueryString({
          ...defaultParams,
          isTwitter: 'true',
        })
      );
    }
    return (
      baseParams +
      convertObjToQueryString({
        ...defaultParams,
        siteTitle: undefined,
        isTwitter: 'true',
      })
    );
  }
  if (root) {
    return (
      baseParams +
      convertObjToQueryString({
        ...defaultParams,
        siteTitle: undefined,
      })
    );
  }
  return baseParams + convertObjToQueryString(defaultParams);
};
