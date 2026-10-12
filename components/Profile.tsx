import { Layout } from "~/layouts/layout";

type Props = Pick<React.ComponentProps<typeof Layout>, "post" | "blocks">;

export const Profile: React.FC<Props> = ({ post, blocks }) => {
  return (
    <div className="profile">
      <Layout blocks={blocks} post={post} onlyContents />
    </div>
  );
};
