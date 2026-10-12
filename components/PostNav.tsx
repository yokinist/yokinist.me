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

  const item = (link: PostLink | null, label: string, align: string) => (
    <Link
      href={link ? `/posts/${link.slug}` : "/"}
      className={`group block ${align}`}
    >
      <span className="block text-xs text-gray-500 dark:text-gray-400">
        {link ? label : locale?.POST.HOME}
      </span>
      <span className="block mt-1 font-medium text-black dark:text-gray-100 group-hover:underline">
        {link?.title ?? BLOG.title}
      </span>
    </Link>
  );

  return (
    <nav className="mt-12 mb-4 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-2 gap-6">
        {item(prev, `‹ ${locale?.POST.PREV}`, "text-left")}
        {item(next, `${locale?.POST.NEXT} ›`, "text-right")}
      </div>
      <p className="hidden md:block mt-6 text-xs text-gray-400 dark:text-gray-500">
        <kbd>←</kbd> <kbd>→</kbd> {locale?.POST.PREV} / {locale?.POST.NEXT}
        &nbsp;&nbsp;<kbd>esc</kbd> {locale?.POST.HOME}
      </p>
    </nav>
  );
};
