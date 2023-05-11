import { GetServerSideProps } from 'next';
import BLOG from '~/blog.config';

const LinkPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: BLOG.externalHPLink,
      permanent: true,
    },
  };
};

export default LinkPage;
