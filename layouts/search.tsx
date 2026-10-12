import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { BlogPost, Twemoji } from "~/components";
import { Tags } from "~/components/Tag";
import { getTagData } from "~/lib";
import { useLocale } from "~/lib/i18n/locale";
import type { Post, TagObj } from "~/types";

type Props = {
  posts: Post[];
  tags: TagObj;
  currentTag?: string;
};

export const SearchLayout: React.FC<Props> = ({ tags, posts, currentTag }) => {
  const [searchValue, setSearchValue] = useState("");
  const locale = useLocale();
  const router = useRouter();

  const filteredBlogPosts = useMemo(() => {
    if (posts) {
      return posts.filter((post) => {
        const searchContent = [post.title, post.summary, ...(post.tags ?? [])]
          .join(" ")
          .toLowerCase();
        return searchContent.includes(searchValue.toLowerCase());
      });
    }
    return [];
  }, [posts, searchValue]);

  // Consecutive posts of the same year share a heading
  const postsByYear = useMemo(() => {
    const groups: { year: number; posts: Post[] }[] = [];
    for (const post of filteredBlogPosts) {
      const year = new Date(
        post.date?.start_date || post.createdTime,
      ).getFullYear();
      const last = groups[groups.length - 1];
      if (last?.year === year) last.posts.push(post);
      else groups.push({ year, posts: [post] });
    }
    return groups;
  }, [filteredBlogPosts]);

  // Pick from what is listed now (tag or search results), skipping outer links
  const readablePosts = filteredBlogPosts.filter((post) => !post.outer_link);
  const openRandomPost = () => {
    const post =
      readablePosts[Math.floor(Math.random() * readablePosts.length)];
    router.push(`/posts/${post.slug}`);
  };

  if (!locale) return null;

  return (
    <>
      <div className="flex gap-2 my-2">
        <div className="relative grow">
          <input
            type="text"
            placeholder={
              currentTag
                ? `${locale.POST.SEARCHIN} #${getTagData(currentTag).name}`
                : locale.POST.SEARCH
            }
            className="block py-2 px-4 w-full text-black dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-300"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute top-3 right-3 w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <button
          type="button"
          onClick={openRandomPost}
          disabled={!readablePosts.length}
          title={locale.POST.RANDOM}
          aria-label={locale.POST.RANDOM}
          className="shrink-0 px-3 rounded-lg border-2 border-gray-300 bg-gray-50 dark:bg-gray-700 hover:opacity-80 disabled:opacity-40 cursor-pointer disabled:cursor-default"
        >
          <Twemoji emoji="🎲" size={20} />
        </button>
      </div>
      <div className="sticky top-16 z-10 bg-day dark:bg-night">
        <Tags tags={tags} currentTag={currentTag} />
      </div>
      <div className="my-5">
        {!filteredBlogPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">
            {locale.POST.NOTFOUND}
          </p>
        )}
        {postsByYear.map(({ year, posts }) => (
          <section key={posts[0].id} className="mb-8">
            <h2 className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
              {year}
            </h2>
            <ul>
              {posts.map((post) => (
                <BlogPost key={post.id} post={post} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
};
