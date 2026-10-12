"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BlogPost } from "~/components/BlogPost";
import { Tags } from "~/components/Tag/TagsTab";
import { Twemoji } from "~/components/Twemoji";
import { locale } from "~/lib/i18n/lang";
import { getTagData } from "~/lib/tags";
import type { Post, TagObj } from "~/types";

type Props = {
  posts: Post[];
  tags: TagObj;
  currentTag?: string;
};

export const SearchLayout: React.FC<Props> = ({ tags, posts, currentTag }) => {
  const [searchValue, setSearchValue] = useState("");
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
      const year = new Date(post.date || post.createdTime).getFullYear();
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

  return (
    <>
      <div className="flex gap-2 my-2">
        <div className="relative grow">
          <input
            type="search"
            aria-label={locale.POST.SEARCH}
            placeholder={
              currentTag
                ? `${locale.POST.SEARCHIN} #${getTagData(currentTag).name}`
                : locale.POST.SEARCH
            }
            className="block py-2 pl-4 pr-10 w-full text-sm text-zinc-900 dark:text-zinc-100 bg-transparent rounded-lg border border-zinc-300 dark:border-zinc-700 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:border-zinc-500 transition-colors"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute top-2.5 right-3 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
        </div>
        <button
          type="button"
          onClick={openRandomPost}
          disabled={!readablePosts.length}
          title={locale.POST.RANDOM}
          aria-label={locale.POST.RANDOM}
          className="shrink-0 px-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-default"
        >
          <Twemoji emoji="🎲" size={18} />
        </button>
      </div>
      <div className="sticky top-16 z-10 bg-day dark:bg-night">
        <Tags tags={tags} currentTag={currentTag} />
      </div>
      <div className="my-5">
        {!filteredBlogPosts.length && (
          <p className="text-zinc-500 dark:text-zinc-300">
            {locale.POST.NOTFOUND}
          </p>
        )}
        {postsByYear.map(({ year, posts }) => (
          <section key={posts[0].id} className="mb-8">
            {/* Sticks below the header (64px) and the tag bar (52px) */}
            <h2 className="sticky top-29 py-2 bg-day dark:bg-night text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
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
