import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '~/lib/gtag';

const Gtag: React.VFC = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string, options: { shallow?: boolean }) => {
      if (!options.shallow) gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return null;
};

export default Gtag;
