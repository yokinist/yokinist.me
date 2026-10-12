import clsx from "clsx";
import BLOG from "~/blog.config";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

type Props = {
  children: React.ReactNode;
  // Shown in the sticky header once the page is scrolled
  title?: string;
};

export const Container: React.FC<Props> = ({ children, title }) => (
  <div
    className={clsx("wrapper", {
      "font-serif": BLOG.font === "serif",
      "font-sans": BLOG.font !== "serif",
    })}
  >
    <Header navBarTitle={title ?? BLOG.title} />
    <main className="m-auto grow w-full max-w-2xl px-4">{children}</main>
    <Footer />
  </div>
);
