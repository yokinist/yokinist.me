# yokinist.me

A static blog build on top of Notion and Nextjs, deployed on [Vercel](https://vercel.com?utm_source=yokinist&utm_campaign=oss).

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

## Highlights ✨

**🚀 &nbsp;Fast and responsive**

- Fast page render and responsive design
- Fast static generation with efficient compiler

**🤖 &nbsp;Deploy instantly**

- Deploy on Vercel in minutes
- Incremental regeneration and no need to redeploy after update the content in notion

**🚙 &nbsp;Fully functional**

- Comments, full width page, quick search and tag filter
- RSS, analytics, web vital... and much more

**🎨 &nbsp;Easy for customization**

- Rich config options, support English & Chinese interface
- Built with Tailwind CSS, easy for customization

**🕸 &nbsp;Pretty URLs and SEO friendly**

- The sitemap will be updated every your build

**💚 &nbsp;Type Safety**

- The source code is written in TypeScript

## Quick Start

- Star this repo 😉
- Duplicate [this Notion template](https://yokinist.notion.site/761c04c4ff6e467188fe67c8a36e20b9?v=0643f1ef640642fbb84032202708336f), and share it to the public
- [Fork](https://github.com/yokinist/yokinist.me/fork) this project
- Customize `blog.config.js`
- _(Optional)_ Replace `favicon.svg`, and `favicon.ico` in `/public` folder with your own
- Deploy on [Vercel](https://vercel.com), set following environment variables：
  - `NOTION_PAGE_ID` (Required): The ID of the Notion page you previously shared to the web, usually has 32 digits after your workspace address
- **That's it!** Easy-peasy?

<details><summary>Wait for a sec, what is Page ID？</summary>
  <img src="https://github.com/yokinist/yokinist.me/blob/main/pageid.png?raw=true">
</details>

## Getting started in developing

- Once you have set the environment variables in the Vercel dashboard, run the following
  - `vercel env pull` (with [Vercel CLI](https://vercel.com/cli))
  - or `vi .env.local` -> `NOTION_PAGE_ID=YOUR_NOTION_PAGE_ID`

## Play With Docker

Unofficial, thanks to [@Vaayne](https://github.com/craigary/nobelium/pull/157)'s work!

```
# set env
export NOTION_PAGE_ID=xxx # your NOTION_PAGE_ID
export IMAGE=nobelium:latest

# build with docker
docker build -t ${IMAGE} --build-arg NOTION_PAGE_ID .

# run with docker
docker run -d --name nobelium -p 3000:3000 -e NOTION_PAGE_ID=${NOTION_PAGE_ID} nobelium:latest
```

## Roadmap

Check out our roadmap [here](https://www.notion.so/craigary/Public-Roadmap-3cfc4d0f0ca642ef8f652673c37add22)

- [x] Better SEO
- [x] Dark mode
- [x] Open Graph support
- [x] Switch to react-notion-x
- [x] Sitemap
- [ ] ...

## Technical details

- **Generation**: Next.js and Incremental Static Regeneration
- **Page render**: [react-notion-x](https://github.com/NotionX/react-notion-x)
- **Style**: Tailwind CSS and `@tailwindcss/jit` compiler
- **Comments**: Gitalk, Cusdis and more

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
