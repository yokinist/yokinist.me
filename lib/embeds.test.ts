import assert from "node:assert/strict";
import { test } from "node:test";
import { toEmbed } from "./embeds.ts";

test("embeds known providers and falls back to a link", () => {
  assert.deepEqual(toEmbed("https://x.com/yokinist/status/123?s=20"), {
    kind: "tweet",
    id: "123",
  });
  assert.equal(
    (toEmbed("https://youtu.be/abc_DEF-1") as { src: string }).src,
    "https://www.youtube-nocookie.com/embed/abc_DEF-1",
  );
  assert.equal(
    (toEmbed("https://www.youtube.com/watch?v=xyz&t=1") as { src: string }).src,
    "https://www.youtube-nocookie.com/embed/xyz",
  );
  assert.deepEqual(
    toEmbed("https://open.spotify.com/intl-ja/track/4uLU6?si=x"),
    {
      kind: "iframe",
      src: "https://open.spotify.com/embed/track/4uLU6",
      title: "Spotify",
      height: 152,
    },
  );
  assert.equal(
    (toEmbed("https://open.spotify.com/album/9x") as { height: number }).height,
    352,
  );
  assert.match(
    (toEmbed("https://soundcloud.com/artist/track?si=1") as { src: string })
      .src,
    /^https:\/\/w\.soundcloud\.com\/player\/\?url=https%3A%2F%2Fsoundcloud\.com%2Fartist%2Ftrack&/,
  );
  assert.deepEqual(toEmbed("https://on.soundcloud.com/AbC"), {
    kind: "resolve",
  });
  assert.deepEqual(toEmbed("https://kankyrecords.bandcamp.com/album/x"), {
    kind: "link",
  });
  assert.deepEqual(toEmbed("not a url"), { kind: "link" });
});
