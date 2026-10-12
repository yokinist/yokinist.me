import type { RichTextItemResponse } from "@notionhq/client";
import katex from "katex";
import Link from "next/link";
import { Fragment } from "react";

// Notion page id (without dashes) -> path on this site
export type Links = Record<string, string>;

const COLORS: Record<string, string> = {
  gray: "text-zinc-500 dark:text-zinc-400",
  brown: "text-amber-800 dark:text-amber-600",
  orange: "text-orange-600 dark:text-orange-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  green: "text-green-600 dark:text-green-400",
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400",
  pink: "text-pink-600 dark:text-pink-400",
  red: "text-red-600 dark:text-red-400",
};

const withLineBreaks = (text: string) =>
  text.split("\n").map((line, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: lines of a static string
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));

// Internal links come as "/<page id>"; point them at the page on this site
const resolveHref = (href: string, links: Links) => {
  const id = href.match(/^\/([\da-f]{32})/)?.[1];
  if (!id) return href;
  return links[id] ?? `https://www.notion.so/${id}`;
};

const Item: React.FC<{ item: RichTextItemResponse; links: Links }> = ({
  item,
  links,
}) => {
  const { bold, italic, strikethrough, underline, code, color } =
    item.annotations;
  let node: React.ReactNode =
    item.type === "equation" ? (
      <span
        // biome-ignore lint/security/noDangerouslySetInnerHtml: KaTeX output of the author's own equation
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(item.equation.expression, {
            throwOnError: false,
          }),
        }}
      />
    ) : (
      withLineBreaks(item.plain_text)
    );
  if (code) node = <code>{node}</code>;
  if (bold) node = <strong>{node}</strong>;
  if (italic) node = <em>{node}</em>;
  if (strikethrough) node = <s>{node}</s>;
  if (underline) node = <u>{node}</u>;
  const colorClass = COLORS[color.replace(/_background$/, "")];
  if (colorClass) node = <span className={colorClass}>{node}</span>;
  if (item.href) {
    const href = resolveHref(item.href, links);
    node = href.startsWith("/") ? (
      <Link href={href}>{node}</Link>
    ) : (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {node}
      </a>
    );
  }
  return node;
};

export const RichText: React.FC<{
  text: RichTextItemResponse[];
  links: Links;
}> = ({ text, links }) =>
  text.map((item, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: rich text segments have no id
    <Item key={i} item={item} links={links} />
  ));
