import dynamic from "next/dynamic";
import { NotionComponents as NotionComponentType } from "react-notion-x";

// Lazy-load some heavy components & override the renderers of some block types
export const NotionComponents: Partial<NotionComponentType> = {
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
