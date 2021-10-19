import BlogPost from '@/components/BlogPost';
import Tags from '@/components/Tags';
import { useLocale } from '@/lib/locale';
import { Post, TagObj } from '@/types';
import { useState, useMemo } from 'react';

type Props = {
  posts: Post[];
  tags: TagObj;
  currentTag?: string;
};

const SearchLayout: React.VFC<Props> = ({ tags, posts, currentTag }) => {
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

  if (!locale) return null;

  return (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder={currentTag ? `${locale.POST.SEARCHIN} #${currentTag}` : locale.POST.SEARCH}
          className="block py-2 px-4 w-full text-black dark:text-white bg-white dark:bg-night rounded-md border border-black dark:border-white"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <svg
          className="absolute top-3 right-3 w-5 h-5 text-black dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <Tags tags={tags} currentTag={currentTag} />
      <div className="my-8 article-container">
        {!filteredBlogPosts.length && <p className="text-gray-500 dark:text-gray-300">{locale.POST.NOTFOUND}</p>}
        {filteredBlogPosts.slice(0, 20).map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default SearchLayout;
