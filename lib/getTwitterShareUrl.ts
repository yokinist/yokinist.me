const BASE_URL = 'https://twitter.com/intent/tweet' as const;

type Params = {
  text: string;
  url: string;
  via?: string;
  hashtags?: string;
};

export const getTwitterShareUrl = (params: Params): string => {
  return BASE_URL + '?' + new URLSearchParams(params);
};
