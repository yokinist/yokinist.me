import { useRouter } from 'next/router';
import React from 'react';
import useAckee from 'use-ackee';

type Props = {
  ackeeServerUrl: string;
  ackeeDomainId: string;
};

const Ackee: React.VFC<Props> = ({ ackeeServerUrl, ackeeDomainId }) => {
  const router = useRouter();
  useAckee(
    router.asPath,
    { server: ackeeServerUrl, domainId: ackeeDomainId },
    { detailed: false, ignoreLocalhost: true },
  );
  return null;
};

export default Ackee;
