import { Tweet } from "react-tweet";
import { toEmbed } from "~/lib/embeds";
import { getLinkPreview } from "~/lib/linkPreview";
import { Bookmark } from "./Bookmark";
import { EmbedFacade } from "./EmbedFacade";

// Players' own oEmbed endpoints give cleaner titles than page metadata
// (YouTube even serves scrapers a consent page)
const OEMBED: Record<string, string> = {
  YouTube: "https://www.youtube.com/oembed?format=json&url=",
  SoundCloud: "https://soundcloud.com/oembed?format=json&url=",
  Spotify: "https://open.spotify.com/oembed?url=",
};

const getPlayerPreview = async (
  provider: string,
  url: string,
): Promise<{ title?: string; image?: string }> => {
  const endpoint = OEMBED[provider];
  if (endpoint) {
    // Private tracks have no oEmbed, and their page metadata is generic, so
    // fall back to the provider name rather than the page's title
    try {
      const response = await fetch(endpoint + encodeURIComponent(url), {
        signal: AbortSignal.timeout(10_000),
        next: { revalidate: 86400 },
      });
      if (response.ok) {
        const data = (await response.json()) as {
          title?: string;
          thumbnail_url?: string;
        };
        return { title: data.title, image: data.thumbnail_url };
      }
    } catch {}
    return {};
  }
  return getLinkPreview(url);
};

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
  let pageUrl = url;
  let embed = toEmbed(pageUrl);
  if (embed.kind === "resolve") {
    pageUrl = await followRedirects(url);
    embed = toEmbed(pageUrl);
  }
  switch (embed.kind) {
    case "tweet":
      return (
        <div className="not-prose my-6 flex justify-center">
          <Tweet id={embed.id} />
        </div>
      );
    case "iframe": {
      const { title, image } = await getPlayerPreview(embed.title, pageUrl);
      return (
        <EmbedFacade
          src={embed.src}
          provider={embed.title}
          height={embed.height}
          title={title}
          image={image}
        />
      );
    }
    default:
      return <Bookmark url={url} />;
  }
};
