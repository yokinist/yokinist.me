import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BLOG from "~/blog.config";
import { useLocale } from "~/lib/i18n/locale";
import type { PostLink } from "~/types";

type Props = {
  prev: PostLink | null;
  next: PostLink | null;
};

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  !!target.closest("input, textarea, select, [contenteditable]");

// Links to the older (prev) and newer (next) post, or home at either end.
// ← / → and Esc do the same from the keyboard.
export const PostNav: React.FC<Props> = ({ prev, next }) => {
  const locale = useLocale();
  const router = useRouter();
  const prevHref = prev ? `/posts/${prev.slug}` : "/";
  const nextHref = next ? `/posts/${next.slug}` : "/";

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isTyping(event.target)) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
      const href = {
        ArrowLeft: prevHref,
        ArrowRight: nextHref,
        Escape: "/",
      }[event.key];
      if (href) router.push(href);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, prevHref, nextHref]);

  const item = (link: PostLink | null, direction: "prev" | "next") => {
    const isNext = direction === "next";
    const Icon = isNext ? ChevronRightIcon : ChevronLeftIcon;
    return (
      <Link
        href={link ? `/posts/${link.slug}` : "/"}
        className={classNames("group flex items-center gap-3 py-6", {
          "justify-end pl-4 text-right": isNext,
          "pr-4": !isNext,
        })}
      >
        {!isNext && (
          <Icon className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition group-hover:-translate-x-0.5" />
        )}
        <span className="min-w-0">
          <span className="block text-xs text-zinc-500 dark:text-zinc-400">
            {!link
              ? locale?.POST.HOME
              : isNext
                ? locale?.POST.NEXT
                : locale?.POST.PREV}
          </span>
          <span className="block mt-1 text-sm leading-relaxed line-clamp-2 text-zinc-800 group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white transition-colors">
            {link?.title ?? BLOG.title}
          </span>
        </span>
        {isNext && (
          <Icon className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition group-hover:translate-x-0.5" />
        )}
      </Link>
    );
  };

  return (
    <nav className="mt-16">
      <div className="grid grid-cols-2 border-y border-zinc-200 divide-x divide-zinc-200 dark:border-zinc-800 dark:divide-zinc-800">
        {item(prev, "prev")}
        {item(next, "next")}
      </div>
      <p className="hidden md:flex justify-end items-center gap-4 mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1">
          <Kbd>←</Kbd>
          <Kbd>→</Kbd>
          <span className="ml-1">
            {locale?.POST.PREV} / {locale?.POST.NEXT}
          </span>
        </span>
        <span className="flex items-center gap-1">
          <Kbd>esc</Kbd>
          <span className="ml-1">{locale?.POST.HOME}</span>
        </span>
      </p>
    </nav>
  );
};

const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <kbd className="inline-flex justify-center items-center min-w-5 h-5 px-1 rounded border border-zinc-300 dark:border-zinc-700 font-sans text-[10px] leading-none">
    {children}
  </kbd>
);
