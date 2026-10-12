const entities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

const decode = (text: string) =>
  text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (match, code: string) => {
    if (code[0] !== "#") return entities[code.toLowerCase()] ?? match;
    const n =
      code[1].toLowerCase() === "x"
        ? Number.parseInt(code.slice(2), 16)
        : Number.parseInt(code.slice(1), 10);
    return Number.isNaN(n) ? match : String.fromCodePoint(n);
  });

const meta = (html: string, names: string[]) => {
  for (const name of names) {
    const tag = html.match(
      new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]*>`, "i"),
    )?.[0];
    const content = tag?.match(/content=["']([^"']*)["']/i)?.[1];
    if (content) return decode(content.trim());
  }
};

// Title and description for a bookmark card. The official Notion API only
// gives the URL, so read the page's own metadata (cached for a day).
export const getLinkPreview = async (
  url: string,
): Promise<{ title?: string; description?: string; image?: string }> => {
  try {
    const response = await fetch(url, {
      // Builds fetch many previews at once, so allow slow responses
      signal: AbortSignal.timeout(10_000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; link preview)" },
      next: { revalidate: 86400 },
    });
    if (!response.ok) return {};
    const html = (await response.text()).slice(0, 200_000);
    return {
      title:
        meta(html, ["og:title", "twitter:title"]) ??
        html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim(),
      description: meta(html, [
        "og:description",
        "twitter:description",
        "description",
      ]),
      image: meta(html, ["og:image", "twitter:image"]),
    };
  } catch {
    return {};
  }
};
