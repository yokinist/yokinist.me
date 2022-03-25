import { TagObj } from '~/types';
import { TagTabItem } from './TagTabItem';

type Props = {
  tags: TagObj;
  currentTag?: string;
  postType?: 'project' | 'post';
};

export const Tags: React.VFC<Props> = ({ tags, currentTag, postType = 'post' }: Props) => {
  if (!tags) return null;
  return (
    <div className="flex items-center tag-container">
      <ul className="flex overflow-x-auto py-2 max-w-full">
        <TagTabItem tagKey="all" selected={!currentTag} root postType={postType} />
        {Object.keys(tags).map((key) => {
          return (
            <TagTabItem key={key} tagKey={key} selected={key === currentTag} count={tags[key]} postType={postType} />
          );
        })}
      </ul>
    </div>
  );
};
