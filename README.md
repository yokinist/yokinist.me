# yokinist.me

A static blog build on top of Notion and Nextjs, deployed
on [Vercel](https://vercel.com?utm_source=yokinist&utm_campaign=oss).

This repo is customized based on [craigary/nobelium](https://github.com/craigary/nobelium).

<p>
  <a aria-label="GitHub commit activity" href="https://github.com/yokinist/yokinist.me/commits/main" title="GitHub commit activity">
    <img src="https://img.shields.io/github/commit-activity/m/yokinist/yokinist.me?style=for-the-badge">
  </a>
  <a aria-label="Build status" href="#" title="Build status">
    <img src="https://img.shields.io/github/deployments/yokinist/yokinist.me/Preview?logo=Vercel&style=for-the-badge">
  </a>
  <a aria-label="Powered by Vercel" href="https://vercel.com?utm_source=Craigary&utm_campaign=oss" title="Powered by Vercel">
    <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" height="28">
  </a>
</p>

## Features

- Write in Notion, publish with Next.js: pages are statically generated and refreshed from Notion every 60 seconds (ISR), so there is no need to redeploy after editing
- Search, tag filter, profile section, dark mode, RSS (`/feed`), sitemap and Open Graph images
- Previous / next post links at the end of each post, also on the ← / → keys (Esc goes home)
- Interface in English, Chinese (Simplified / Traditional), Japanese and Spanish
- Configured from a single file, `blog.config.js`

## Quick Start

1. Duplicate [this Notion template](https://yokinist.notion.site/761c04c4ff6e467188fe67c8a36e20b9?v=0643f1ef640642fbb84032202708336f) and share it to the web
2. [Fork](https://github.com/yokinist/yokinist.me/fork) this repository
3. Edit `blog.config.js` (title, author, language, colors, which parts of a post to show, ...)
4. Deploy on [Vercel](https://vercel.com) with these environment variables:
   - `NOTION_PAGE_ID` (required): the ID of the Notion database page you shared, the 32 characters after your workspace address
   - `NOTION_ACCESS_TOKEN` (optional): only needed if the database is not public

<details><summary>Where is the page ID?</summary>
  <img src="https://github.com/yokinist/yokinist.me/blob/main/pageid.png?raw=true">
</details>

### Optional customization

- **Tags**: set a display name and emoji per tag in `tags` of `blog.config.js`. Tags not listed there are shown by their name as-is
- **Profile**: add a page with the slug `profile` (or set `profileSlug`). It is shown above the post list, and its first image gets an animated frame
- **`/link`**: redirects to `externalLink`
- **Analytics**: set `gaMeasurementId` to enable Google Analytics in production
- **Icons**: replace `favicon.svg` and `apple-touch-icon.png` in `public/`

## Development

Requires Node.js 20.9 or later (CI uses 24) and Yarn 1.

```bash
yarn install
yarn dev        # http://localhost:8080
```

`.env.local` points `NOTION_PAGE_ID` to the demo database; replace it with yours (or run `vercel env pull`).

| Command | What it does |
| --- | --- |
| `yarn lint` | Biome (lint and format check) |
| `yarn tsc` | Type check |
| `yarn test` | Unit tests (`node --test`) |
| `yarn build` | Production build, then sitemap generation |

CI runs all of these on every push to `template` and `main`.

## Tech stack

- [Next.js](https://nextjs.org) 16 (Pages Router, ISR) and React 19
- [react-notion-x](https://github.com/NotionX/react-notion-x) to fetch and render Notion pages
- [Tailwind CSS](https://tailwindcss.com) 4
- TypeScript and [Biome](https://biomejs.dev)

## Special Thanks

<table><tr align="left">
<td align="center"><a href="https://github.com/craigary" title="Craig Hart"><img src="https://avatars.githubusercontent.com/u/10571717" width="64px;" alt="Craig Hart"/></a><br/><a href="https://github.com/craigary" title="Craig Hart">Craig Hart</a></td>
  <td align="center"><a href="https://notion.so/cnotion" title="Notion CN Community"><img src="https://avatars.githubusercontent.com/u/4792552" width="64px;"alt="Notion CN Community"/></a><br/><a href="https://notion.so/cnotion" title="Notion CN Community">Notion CN Community</a></td>
  <td align="center"><a href="https://twitter.com/SilentDepthCN" title="SilentDepth"><img src="https://avatars.githubusercontent.com/u/7194254" width="64px;" alt="yokinist"/></a><br/><a href="https://twitter.com/SilentDepthCN" title="SilentDepth">SilentDepth</a></td>
  <td align="center"><a href="https://leerob.io/" title="Lee Robinson"><img src="https://avatars.githubusercontent.com/u/9113740" width="64px;" alt="Reynard"/></a><br/><a href="https://leerob.io" title="Lee Robinson">Lee Robinson</a></td>
  <td align="center"><a href="https://spencerwoo.com/" title="Spencer Woo"><img src="https://avatars.githubusercontent.com/u/32114380" width="64px;" alt="Niin"/></a><br/><a href="https://spencerwoo.com" title="Spencer Woo">Spencer Woo</a></td>
</tr></table>

[Contributors](https://github.com/craigary/nobelium#contributors)

## License

The MIT License.
