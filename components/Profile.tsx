import { Layout } from "~/layouts/layout";

type Props = Pick<React.ComponentProps<typeof Layout>, "post" | "blockMap">;

export const Profile: React.FC<Props> = ({ post, blockMap }) => {
  return (
    <div className="profile">
      <Layout blockMap={blockMap} post={post} onlyContents />
    </div>
  );
};
