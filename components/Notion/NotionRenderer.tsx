import Head from "next/head";
import { useTheme } from "next-themes";
import type { ExtendedRecordMap } from "notion-types";
import {
  getBlockValue,
  isPublicNotionBlock,
  resolveDefaultImageUrl,
} from "notion-utils";
import { NotionRenderer as Renderer } from "react-notion-x";
import { NotionComponents } from "~/components/Notion/NotionComponents";

const mapPageUrl = (id: string) =>
  `https://www.notion.so/${id.replace(/-/g, "")}`;

// An image among the first blocks is usually the largest contentful paint,
// but react-notion-x always lazy-loads images. Resolve its URL the same way
// react-notion-x does, so a preload is reused by the <img>.
const getLeadImageUrl = (recordMap: ExtendedRecordMap) => {
  const page = getBlockValue(Object.values(recordMap.block)[0]);
  for (const id of page?.content?.slice(0, 3) ?? []) {
    const block = getBlockValue(recordMap.block[id]);
    if (block?.type !== "image") continue;
    const source = block.properties?.source?.[0]?.[0];
    if (!source) return undefined;
    return resolveDefaultImageUrl(source, block, {
      isPublic: isPublicNotionBlock(recordMap, block.id),
      signedUrls: recordMap.signed_urls,
    });
  }
};

type RendererProps = React.ComponentProps<typeof Renderer>;

type Props = Omit<RendererProps, "components" | "mapPageUrl">;

export const NotionRenderer = (props: Props) => {
  const { theme } = useTheme();
  const leadImageUrl = getLeadImageUrl(props.recordMap);
  return (
    <>
      {leadImageUrl && (
        <Head>
          <link
            rel="preload"
            as="image"
            href={leadImageUrl}
            fetchPriority="high"
          />
        </Head>
      )}
      <Renderer
        components={NotionComponents}
        mapPageUrl={mapPageUrl}
        {...props}
        darkMode={theme !== "light"}
      />
    </>
  );
};
