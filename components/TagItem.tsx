import Link from 'next/link';

type Props = {
  tag: string;
};

const TagItem: React.VFC<Props> = ({ tag }) => (
  <Link href={`/tag/${encodeURIComponent(tag)}`}>
    <a>
      <p className="py-1 px-2 mr-1 text-sm leading-none rounded-full border dark:border-gray-600">{tag}</p>
    </a>
  </Link>
);

export default TagItem;
