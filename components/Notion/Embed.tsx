import { Tweet } from "react-tweet";
import { toEmbed } from "~/lib/embeds";
import { Bookmark } from "./Bookmark";

const followRedirects = async (url: string) => {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 },
    });
    return response.url;
  } catch {
    return url;
  }
};

export const Embed = async ({ url }: { url: string }) => {
  let embed = toEmbed(url);
  if (embed.kind === "resolve") embed = toEmbed(await followRedirects(url));
  switch (embed.kind) {
    case "tweet":
      return (
        <div className="not-prose my-6 flex justify-center">
          <Tweet id={embed.id} />
        </div>
      );
    case "iframe":
      return (
        <iframe
          src={embed.src}
          title={embed.title}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className={
            embed.height
              ? "not-prose my-6 w-full rounded-xl border-0"
              : "not-prose my-6 aspect-video w-full rounded-xl border-0"
          }
          style={embed.height ? { height: embed.height } : undefined}
        />
      );
    default:
      return <Bookmark url={url} />;
  }
};
