import NextHeadSeo from 'next-head-seo';

type Props = {
  //
};

export const NextHead: React.VFC<Props> = () => {
  return (
    <NextHeadSeo
      title="Hello!"
      description="Some description"
      canonical="https://example.com/hello"
      og={{
        title: 'Open graph title',
        image: 'https://example.com/og.png',
      }}
    />
  );
};
