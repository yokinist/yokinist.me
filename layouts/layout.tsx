import classNames from 'classnames';
import 'gitalk/dist/gitalk.css';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types/build/esm/maps';
import { NotionRenderer, Equation, Code, CollectionRow, Collection } from 'react-notion-x';
import type { Tweet } from 'react-static-tweets';
import BLOG from '~/blog.config';
import { Container } from '~/components';
import { Comments } from '~/components/Comment';
import { TagItem } from '~/components/Tag';
import formatDate from '~/lib/formatDate';
import { useLocale } from '~/lib/i18n/locale';
import { Post } from '~/types';

const enableCommentArea = BLOG.comment.provider !== '';

const mapPageUrl = (id: string) => {
  return 'https://www.notion.so/' + id.replace(/-/g, '');
};

type Props = {
  blockMap: ExtendedRecordMap;
  post: Post;
  emailHash: string;
  fullWidth?: boolean;
  onlyContents?: boolean;
  tweet?: typeof Tweet;
  slug?: string | null;
};

export const Layout: React.VFC<Props> = ({
  blockMap,
  post,
  emailHash,
  tweet,
  slug,
  fullWidth = false,
  onlyContents = false,
}) => {
  const locale = useLocale();
  const router = useRouter();
  const { theme } = useTheme();

  const renderContents = () => (
    <article>
      <h1 className="text-3xl font-bold text-black dark:text-white">{post.title}</h1>
      {post?.type?.[0] !== 'Page' && (
        <nav className="flex items-start mt-7 mb-4 text-gray-500 dark:text-gray-300">
          <div className="flex mb-4">
            <a href={BLOG.socialLink || '#'} className="flex">
              <Image
                alt={BLOG.author}
                width={24}
                height={24}
                src={`https://gravatar.com/avatar/${emailHash}`}
                className="rounded-full"
              />
              <p className="md:block ml-2">{BLOG.author}</p>
            </a>
            <span className="block">&nbsp;/&nbsp;</span>
          </div>
          <div className="mr-2 mb-4 md:ml-0">{formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}</div>
          {post.tags && (
            <div className="flex overflow-x-auto flex-nowrap max-w-full article-tags">
              {post.tags.map((tag) => (
                <TagItem key={tag} tag={tag} />
              ))}
            </div>
          )}
        </nav>
      )}
      {blockMap && (
        <div className="-mt-4 mb-4 notion-ignore-padding-x">
          <NotionRenderer
            recordMap={blockMap}
            components={{
              equation: Equation,
              code: Code,
              collection: Collection,
              collectionRow: CollectionRow,
              tweet: tweet,
            }}
            mapPageUrl={mapPageUrl}
            darkMode={theme !== 'light'}
          />
        </div>
      )}
    </article>
  );
  return onlyContents ? (
    renderContents()
  ) : (
    <Container
      layout="blog"
      title={post.title}
      description={post.summary}
      date={new Date(post.createdTime).toISOString()}
      type="article"
      fullWidth={fullWidth}
      slug={slug}
    >
      {renderContents()}
      <div
        className={classNames('flex justify-between font-medium text-gray-500 dark:text-gray-400', {
          'mb-4': enableCommentArea,
        })}
      >
        <button
          onClick={() => router.push(BLOG.path || '/')}
          className="mt-2 hover:text-black dark:hover:text-gray-100 cursor-pointer"
        >
          ← {locale?.POST.BACK}
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-2 hover:text-black dark:hover:text-gray-100 cursor-pointer"
        >
          ↑ {locale?.POST.TOP}
        </button>
      </div>
      <Comments post={post} />
    </Container>
  );
};
