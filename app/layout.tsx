import "katex/dist/katex.min.css";
import "prismjs/themes/prism.css";
import "react-notion-x/src/styles.css";
import "~/styles/globals.css";
import "~/styles/notion.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import BLOG from "~/blog.config";
import { Scripts } from "~/components/Scripts";
import { themeScript } from "~/lib/themeScript";

const sans = localFont({
  src: [
    { path: "../styles/fonts/IBMPlexSansVar-Roman.woff2", style: "normal" },
    { path: "../styles/fonts/IBMPlexSansVar-Italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  variable: "--font-latin-sans",
});

// Only used when BLOG.font is "serif", so it is not preloaded
const serif = localFont({
  src: [
    { path: "../styles/fonts/SourceSerif.var.woff2", style: "normal" },
    { path: "../styles/fonts/SourceSerif-Italic.var.woff2", style: "italic" },
  ],
  weight: "100 900",
  variable: "--font-latin-serif",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(BLOG.link),
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang={BLOG.lang}
    className={`${sans.variable} ${serif.variable} ${BLOG.appearance === "dark" ? "dark" : ""}`}
    // themeScript may swap the dark class before hydration
    suppressHydrationWarning
  >
    <head>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: a constant script, no user input */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </head>
    <body className="bg-day dark:bg-night">
      <Scripts />
      {children}
    </body>
  </html>
);

export default RootLayout;
