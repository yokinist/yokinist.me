export type Embed =
  | { kind: "tweet"; id: string }
  | { kind: "iframe"; src: string; title: string; height?: number }
  // A short link that has to be followed before it can be embedded
  | { kind: "resolve" }
  | { kind: "link" };

const youtubeId = (url: URL) => {
  if (url.hostname === "youtu.be") return url.pathname.slice(1);
  if (!url.hostname.endsWith("youtube.com")) return undefined;
  return (
    url.searchParams.get("v") ??
    url.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]+)/)?.[1]
  );
};

// How to show an embed or video URL from Notion
export const toEmbed = (href: string): Embed => {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return { kind: "link" };
  }
  const host = url.hostname.replace(/^www\./, "");

  const tweet = url.pathname.match(/^\/\w+\/status\/(\d+)/);
  if ((host === "twitter.com" || host === "x.com") && tweet) {
    return { kind: "tweet", id: tweet[1] };
  }
  const youtube = youtubeId(url);
  if (youtube) {
    return {
      kind: "iframe",
      src: `https://www.youtube-nocookie.com/embed/${youtube}`,
      title: "YouTube",
    };
  }
  const spotify = url.pathname.match(
    /^(?:\/intl-[\w-]+)?\/(track|album|playlist|episode|show|artist)\/(\w+)/,
  );
  if (host === "open.spotify.com" && spotify) {
    const [, type, id] = spotify;
    return {
      kind: "iframe",
      src: `https://open.spotify.com/embed/${type}/${id}`,
      title: "Spotify",
      height: type === "track" || type === "episode" ? 152 : 352,
    };
  }
  if (host === "on.soundcloud.com") return { kind: "resolve" };
  if (host === "soundcloud.com" || host === "m.soundcloud.com") {
    const track = `https://soundcloud.com${url.pathname}`;
    return {
      kind: "iframe",
      src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(track)}&hide_related=true&visual=false`,
      title: "SoundCloud",
      height: 166,
    };
  }
  const instagram = url.pathname.match(/^\/(p|reel)\/([\w-]+)/);
  if (host === "instagram.com" && instagram) {
    return {
      kind: "iframe",
      src: `https://www.instagram.com/${instagram[1]}/${instagram[2]}/embed`,
      title: "Instagram",
      height: 560,
    };
  }
  return { kind: "link" };
};
