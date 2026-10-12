import clsx from "clsx";
import BLOG from "~/blog.config";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

type Props = {
  children: React.ReactNode;
  // Shown in the sticky header once the page is scrolled
  title?: string;
  fullWidth?: boolean;
};

export const Container: React.FC<Props> = ({ children, title, fullWidth }) => (
  <div
    className={clsx("wrapper", {
      "font-serif": BLOG.font === "serif",
      "font-sans": BLOG.font !== "serif",
    })}
  >
    <Header navBarTitle={title ?? BLOG.title} fullWidth={fullWidth} />
    <main
      className={clsx("m-auto grow w-full transition-all", {
        "px-4 md:px-24": fullWidth,
        "max-w-2xl px-4": !fullWidth,
      })}
    >
      {children}
    </main>
    <Footer fullWidth={fullWidth} />
  </div>
);
