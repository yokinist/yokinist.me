import { getTagDataBySlug, TagSlug } from '@/lib/tags';
import { TagObj } from '@/types';
import classNames from 'classnames';
import { Twemoji } from 'components/Twemoji';
import Link from 'next/link';
import { TagTabItem } from './TagTabItem';

type Props = {
  tags: TagObj;
  currentTag?: string;
};

const Tags: React.VFC<Props> = ({ tags, currentTag }: Props) => {
  if (!tags) return null;
  return (
    <div className="flex items-center tag-container">
      <ul className="flex overflow-x-auto mt-4 max-w-full">
        <TagTabItem tagKey="all" selected={!currentTag} root />
        {Object.keys(tags).map((key) => {
          return <TagTabItem key={key} tagKey={key} selected={key === currentTag} count={tags[key]} />;
        })}
      </ul>
    </div>
  );
};

export default Tags;
