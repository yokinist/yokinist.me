"use client";

import { PlayIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { locale } from "~/lib/i18n/lang";

type Props = {
  src: string;
  provider: string;
  height?: number;
  title?: string;
  image?: string;
};

// Players (Spotify, YouTube, ...) set third-party cookies and weigh hundreds
// of KB, so show a card and load the player only when asked to
export const EmbedFacade: React.FC<Props> = ({
  src,
  provider,
  height,
  title,
  image,
}) => {
  const [active, setActive] = useState(false);
  if (active) {
    return (
      <iframe
        src={provider === "YouTube" ? `${src}?autoplay=1` : src}
        title={title ?? provider}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className={
          height
            ? "not-prose my-6 w-full rounded-xl border-0"
            : "not-prose my-6 aspect-video w-full rounded-xl border-0"
        }
        style={height ? { height } : undefined}
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`${locale.POST.PLAY}: ${title ?? provider}`}
      className="not-prose group my-6 flex w-full items-center gap-4 rounded-xl border border-zinc-200 p-3 text-left transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
    >
      {image && (
        // biome-ignore lint/performance/noImgElement: a small thumbnail from the provider
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-16 w-16 shrink-0 rounded-lg bg-zinc-100 object-cover dark:bg-zinc-900"
        />
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-zinc-500 dark:text-zinc-400">
          {provider}
        </span>
        <span className="mt-1 text-sm font-medium text-zinc-900 line-clamp-2 dark:text-zinc-100">
          {title ?? provider}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-1 rounded-full border border-zinc-300 py-1 pr-3 pl-2 text-xs text-zinc-600 transition-colors group-hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-100">
        <PlayIcon aria-hidden className="h-4 w-4" />
        {locale.POST.PLAY}
      </span>
    </button>
  );
};
