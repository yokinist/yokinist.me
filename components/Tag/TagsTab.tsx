import { TagObj } from '~/types';
import { TagTabItem } from './TagTabItem';

type Props = {
  tags: TagObj;
  currentTag?: string;
};

export const Tags: React.VFC<Props> = ({ tags, currentTag }: Props) => {
  if (!tags) return null;
  return (
    <div className="flex items-center tag-container">
      <ul className="flex overflow-x-auto py-2 max-w-full">
        <TagTabItem tagKey="all" selected={!currentTag} root />
        {Object.keys(tags).map((key) => {
          return <TagTabItem key={key} tagKey={key} selected={key === currentTag} count={tags[key]} />;
        })}
      </ul>
    </div>
  );
};
