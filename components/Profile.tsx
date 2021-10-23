import { Layout } from '~/layouts/layout';

type Props = Omit<React.ComponentProps<typeof Layout>, 'fullWidth'>;

export const Profile: React.VFC<Props> = ({ post, blockMap, emailHash }) => {
  return (
    <div>
      <Layout blockMap={blockMap} post={post} emailHash={emailHash} fullWidth={false} onlyContents />
    </div>
  );
};
