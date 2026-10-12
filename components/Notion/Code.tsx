import { codeToHtml } from "shiki";

// Notion language names that Shiki spells differently
const LANGUAGES: Record<string, string> = {
  "plain text": "text",
  shell: "bash",
  "c++": "cpp",
  "c#": "csharp",
  "java/c/c++/c#": "java",
};

const highlight = (code: string, lang: string) =>
  codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });

// Highlighted at build time, so no highlighter ships to the browser
export const Code = async ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  const lang = LANGUAGES[language] ?? language;
  const html = await highlight(code, lang).catch(() => highlight(code, "text"));
  return (
    <div
      className="not-prose my-6 text-sm [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output escapes the code
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
