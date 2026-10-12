"use client";

import { NotionRenderer as Renderer } from "react-notion-x";
import { NotionComponents } from "~/components/Notion/NotionComponents";
import { useIsDark } from "~/lib/theme";

const mapPageUrl = (id: string) =>
  `https://www.notion.so/${id.replace(/-/g, "")}`;

type RendererProps = React.ComponentProps<typeof Renderer>;

type Props = Omit<RendererProps, "components" | "mapPageUrl">;

export const NotionRenderer = (props: Props) => {
  const isDark = useIsDark();
  return (
    <Renderer
      components={NotionComponents}
      mapPageUrl={mapPageUrl}
      {...props}
      darkMode={isDark}
    />
  );
};
