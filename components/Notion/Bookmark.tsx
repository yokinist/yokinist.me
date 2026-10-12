import { getLinkPreview } from "~/lib/linkPreview";

export const Bookmark = async ({ url }: { url: string }) => {
  const { title, description } = await getLinkPreview(url);
  let host = url;
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {}
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="not-prose my-6 block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
    >
      <span className="block text-sm font-medium text-zinc-900 line-clamp-1 dark:text-zinc-100">
        {title || url}
      </span>
      {description && (
        <span className="mt-1 block text-xs leading-relaxed text-zinc-500 line-clamp-2 dark:text-zinc-400">
          {description}
        </span>
      )}
      <span className="mt-2 block text-xs text-zinc-500 dark:text-zinc-400">
        {host}
      </span>
    </a>
  );
};
