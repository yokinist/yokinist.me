import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { NotionRenderer as Renderer } from "react-notion-x";

// Lazy-load some heavy components & override the renderers of some block types
const components = {
  /* Lazy-load */

  // Code block
  Code: dynamic(() => {
    return import("react-notion-x/build/third-party/code").then(
      async (module) => {
        // #TODO: apply language styles with prismjs
        return module.Code;
      },
    );
  }),
  // Database block
  Collection: dynamic(() => {
    return import("react-notion-x/build/third-party/collection").then(
      (module) => module.Collection,
    );
  }),
  // Equation block & inline variant
  Equation: dynamic(() => {
    return import("react-notion-x/build/third-party/equation").then(
      (module) => module.Equation,
    );
  }),
  // PDF (Embed block)
  Pdf: dynamic(
    () => {
      return import("react-notion-x/build/third-party/pdf").then(
        (module) => module.Pdf,
      );
    },
    { ssr: false },
  ),
  // Tweet block
  Tweet: dynamic(() => {
    return import("react-tweet-embed").then((module) => {
      const { default: TweetEmbed } = module;
      return function Tweet({ id }: { id: string }) {
        return <TweetEmbed tweetId={id} options={{ theme: "dark" }} />;
      };
    });
  }),
};

const mapPageUrl = (id: string) =>
  `https://www.notion.so/${id.replace(/-/g, "")}`;

type RendererProps = React.ComponentProps<typeof Renderer>;

type Props = Omit<RendererProps, "components" | "mapPageUrl">;

export const NotionRenderer = (props: Props) => {
  const { theme } = useTheme();
  return (
    <Renderer
      components={components}
      mapPageUrl={mapPageUrl}
      {...props}
      darkMode={theme !== "light"}
    />
  );
};
