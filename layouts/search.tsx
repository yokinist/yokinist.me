import { useState, useMemo } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { BlogPost } from '~/components';
import { Tags } from '~/components/Tag';
import { useLocale } from '~/lib/i18n/locale';
import { getTagDataBySlug, TagSlug } from '~/lib/tags';
import { Post, TagObj } from '~/types';

type Props = {
  posts: Post[];
  tags: TagObj;
  currentTag?: string;
};

export const SearchLayout: React.VFC<Props> = ({ tags, posts, currentTag }) => {
  const [searchValue, setSearchValue] = useState('');
  const locale = useLocale();

  const filteredBlogPosts = useMemo(() => {
    if (posts) {
      return posts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(' ') : '';
        const searchContent = post?.title ?? '' + post?.summary ?? '' + tagContent;
        return searchContent.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
    return [];
  }, [posts, searchValue]);

  const currentTagName: string | undefined = useMemo(() => {
    if (!currentTag) return undefined;
    return getTagDataBySlug(currentTag as TagSlug)?.name ?? currentTagName;
  }, [currentTag]);

  if (!locale) return null;

  return (
    <>
      <div className="relative my-2">
        <input
          type="text"
          placeholder={currentTag ? `${locale.POST.SEARCHIN} #${currentTagName}` : locale.POST.SEARCH}
          className="block py-2 px-4 w-full text-black dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-300"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchIcon className="absolute top-3 right-3 w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="sticky top-16 z-10 bg-day dark:bg-night">
        <Tags tags={tags} currentTag={currentTag} />
      </div>
      <div className="my-5 article-container">
        {!filteredBlogPosts.length && <p className="text-gray-500 dark:text-gray-300">{locale.POST.NOTFOUND}</p>}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};
