import { GetServerSideProps } from 'next';
import BLOG from '~/blog.config';

const LinkPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      // destination: BLOG.externalHPLink,
      destination: BLOG.link,
      permanent: true,
    },
  };
};

export default LinkPage;
