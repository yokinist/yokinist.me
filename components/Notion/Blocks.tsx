import katex from "katex";
import Link from "next/link";
import type { NotionBlock } from "~/lib/notion/api";
import { Bookmark } from "./Bookmark";
import { Code } from "./Code";
import { Embed } from "./Embed";
import { type Links, RichText } from "./RichText";

export type Heading = { id: string; level: 1 | 2 | 3; text: string };

export type Context = {
  links: Links;
  headings: Heading[];
  // The image to load eagerly, as it is likely the largest paint
  leadImageId?: string;
};

type Media =
  | { type: "file"; file: { url: string } }
  | { type: "external"; external: { url: string } };

// Uploaded files go through /api/notion/file, which refreshes signed URLs
export const mediaUrl = (blockId: string, media: Media) =>
  media.type === "external"
    ? media.external.url
    : `/api/notion/file/${blockId}`;

type Group =
  | { kind: "block"; block: NotionBlock }
  | { kind: "list"; ordered: boolean; items: NotionBlock[] };

// Notion lists are separate items; group consecutive ones into <ul>/<ol>
const groupLists = (blocks: NotionBlock[]) =>
  blocks.reduce<Group[]>((groups, block) => {
    const ordered = block.type === "numbered_list_item";
    if (block.type !== "bulleted_list_item" && !ordered) {
      groups.push({ kind: "block", block });
      return groups;
    }
    const last = groups[groups.length - 1];
    if (last?.kind === "list" && last.ordered === ordered)
      last.items.push(block);
    else groups.push({ kind: "list", ordered, items: [block] });
    return groups;
  }, []);

const Children: React.FC<{ block: NotionBlock; ctx: Context }> = ({
  block,
  ctx,
}) => (block.children ? <Blocks blocks={block.children} ctx={ctx} /> : null);

const Block: React.FC<{ block: NotionBlock; ctx: Context }> = ({
  block,
  ctx,
}) => {
  const { links } = ctx;
  switch (block.type) {
    case "paragraph":
      return block.paragraph.rich_text.length ? (
        <p>
          <RichText text={block.paragraph.rich_text} links={links} />
        </p>
      ) : (
        <div className="h-4" aria-hidden />
      );
    // The post title is the <h1>, so Notion headings start at <h2>
    case "heading_1":
      return (
        <h2 id={block.id}>
          <RichText text={block.heading_1.rich_text} links={links} />
        </h2>
      );
    case "heading_2":
      return (
        <h3 id={block.id}>
          <RichText text={block.heading_2.rich_text} links={links} />
        </h3>
      );
    case "heading_3":
      return (
        <h4 id={block.id}>
          <RichText text={block.heading_3.rich_text} links={links} />
        </h4>
      );
    case "to_do":
      return (
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
            aria-readonly
            className="mt-2"
          />
          <div>
            <RichText text={block.to_do.rich_text} links={links} />
            <Children block={block} ctx={ctx} />
          </div>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <RichText text={block.toggle.rich_text} links={links} />
          </summary>
          <Children block={block} ctx={ctx} />
        </details>
      );
    case "quote":
      return (
        <blockquote>
          <RichText text={block.quote.rich_text} links={links} />
          <Children block={block} ctx={ctx} />
        </blockquote>
      );
    case "callout":
      return (
        <div className="not-prose my-6 flex gap-3 rounded-lg border border-zinc-200 p-4 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
          {block.callout.icon?.type === "emoji" && (
            <span aria-hidden>{block.callout.icon.emoji}</span>
          )}
          <div className="min-w-0 leading-relaxed">
            <RichText text={block.callout.rich_text} links={links} />
            <Children block={block} ctx={ctx} />
          </div>
        </div>
      );
    case "divider":
      return <hr />;
    case "code":
      return (
        <Code
          code={block.code.rich_text.map((t) => t.plain_text).join("")}
          language={block.code.language}
        />
      );
    case "equation":
      return (
        <div
          className="my-6 overflow-x-auto"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: KaTeX output of the author's own equation
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(block.equation.expression, {
              displayMode: true,
              throwOnError: false,
            }),
          }}
        />
      );
    case "image": {
      const caption = block.image.caption.map((t) => t.plain_text).join("");
      const lead = block.id === ctx.leadImageId;
      return (
        <figure>
          {/* biome-ignore lint/performance/noImgElement: next/image would spend the image optimization quota */}
          <img
            src={mediaUrl(block.id, block.image)}
            // Notion has no alt text; a caption is read from <figcaption>
            alt=""
            loading={lead ? "eager" : "lazy"}
            fetchPriority={lead ? "high" : undefined}
            decoding="async"
            className="rounded-lg"
          />
          {caption && (
            <figcaption>
              <RichText text={block.image.caption} links={links} />
            </figcaption>
          )}
        </figure>
      );
    }
    case "video":
      return block.video.type === "external" ? (
        <Embed url={block.video.external.url} />
      ) : (
        // biome-ignore lint/a11y/useMediaCaption: captions are not available from Notion
        <video
          controls
          preload="metadata"
          src={mediaUrl(block.id, block.video)}
          className="my-6 w-full rounded-lg"
        />
      );
    case "audio":
      return (
        // biome-ignore lint/a11y/useMediaCaption: captions are not available from Notion
        <audio
          controls
          preload="metadata"
          src={mediaUrl(block.id, block.audio)}
          className="my-6 w-full"
        />
      );
    case "file":
    case "pdf": {
      const media = block.type === "file" ? block.file : block.pdf;
      const name: string =
        media.caption.map((t) => t.plain_text).join("") ||
        (block.type === "file" ? block.file.name : "") ||
        block.type.toUpperCase();
      return (
        <p>
          <a href={mediaUrl(block.id, media)} target="_blank" rel="noreferrer">
            {name}
          </a>
        </p>
      );
    }
    case "embed":
      return <Embed url={block.embed.url} />;
    case "bookmark":
      return <Bookmark url={block.bookmark.url} />;
    case "link_preview":
      return <Bookmark url={block.link_preview.url} />;
    case "table": {
      const [head, ...rows] = (block.children ?? []).filter(
        (row) => row.type === "table_row",
      );
      const hasHead = block.table.has_column_header && head;
      const body = hasHead ? rows : [head, ...rows].filter(Boolean);
      const cells = (row: NotionBlock, header: boolean) =>
        row.type === "table_row"
          ? row.table_row.cells.map((cell, i) => {
              const rowHeader =
                !header && i === 0 && block.table.has_row_header;
              const Tag = header || rowHeader ? "th" : "td";
              return (
                <Tag
                  // biome-ignore lint/suspicious/noArrayIndexKey: table cells have no id
                  key={i}
                  scope={rowHeader ? "row" : header ? "col" : undefined}
                  className={rowHeader ? "whitespace-nowrap" : undefined}
                >
                  <RichText text={cell} links={links} />
                </Tag>
              );
            })
          : null;
      return (
        <div className="overflow-x-auto">
          <table>
            {hasHead && (
              <thead>
                <tr>{cells(head, true)}</tr>
              </thead>
            )}
            <tbody>
              {body.map((row) => (
                <tr key={row.id}>{cells(row, false)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "column_list":
      return (
        <div className="grid gap-6 md:auto-cols-fr md:grid-flow-col">
          {block.children?.map((column) => (
            <div key={column.id} className="min-w-0">
              <Children block={column} ctx={ctx} />
            </div>
          ))}
        </div>
      );
    case "table_of_contents":
      return (
        <nav className="not-prose my-6 text-sm">
          <ul className="space-y-1">
            {ctx.headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-zinc-500 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );
    case "synced_block":
      return <Children block={block} ctx={ctx} />;
    case "link_to_page": {
      const id =
        block.link_to_page.type === "page_id"
          ? block.link_to_page.page_id.replaceAll("-", "")
          : undefined;
      const href = id && links[id];
      return href ? (
        <p>
          <Link href={href}>{href}</Link>
        </p>
      ) : null;
    }
    case "child_page": {
      const href = links[block.id.replaceAll("-", "")];
      return href ? (
        <p>
          <Link href={href}>{block.child_page.title}</Link>
        </p>
      ) : null;
    }
    // Transcriptions, breadcrumbs, child databases and the like are not shown
    default:
      return null;
  }
};

export const Blocks: React.FC<{ blocks: NotionBlock[]; ctx: Context }> = ({
  blocks,
  ctx,
}) =>
  groupLists(blocks).map((group) => {
    if (group.kind === "block") {
      return <Block key={group.block.id} block={group.block} ctx={ctx} />;
    }
    const List = group.ordered ? "ol" : "ul";
    return (
      <List key={group.items[0].id}>
        {group.items.map((item) => (
          <li key={item.id}>
            <RichText
              text={
                item.type === "bulleted_list_item"
                  ? item.bulleted_list_item.rich_text
                  : item.type === "numbered_list_item"
                    ? item.numbered_list_item.rich_text
                    : []
              }
              links={ctx.links}
            />
            <Children block={item} ctx={ctx} />
          </li>
        ))}
      </List>
    );
  });
