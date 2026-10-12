import assert from "node:assert/strict";
import { test } from "node:test";
import type { PageObjectResponse } from "@notionhq/client";
import type { Post } from "../../types";
import { getNeighbors, pageToPost, publishedPosts } from "./toPosts.ts";

const text = (content: string) => [{ plain_text: content }];

const page = (props: Record<string, unknown>) =>
  ({
    id: "page-id",
    created_time: "2024-01-01T00:00:00.000Z",
    properties: {
      Name: { type: "title", title: text("Hello") },
      slug: { type: "rich_text", rich_text: text("hello") },
      type: { type: "select", select: { name: "Post" } },
      status: { type: "select", select: { name: "Published" } },
      tags: {
        type: "multi_select",
        multi_select: [{ name: "tech" }, { name: "music" }],
      },
      date: { type: "date", date: { start: "2024-03-01" } },
      summary: { type: "rich_text", rich_text: text("A summary") },
      outer_link: { type: "url", url: null },
      ...props,
    },
  }) as unknown as PageObjectResponse;

test("maps database properties by name", () => {
  assert.deepEqual(pageToPost(page({})), {
    id: "page-id",
    createdTime: "2024-01-01T00:00:00.000Z",
    title: "Hello",
    slug: "hello",
    type: "Post",
    status: "Published",
    date: "2024-03-01",
    tags: ["tech", "music"],
    summary: "A summary",
    outer_link: undefined,
  });
  assert.equal(
    pageToPost(page({ status: { type: "status", status: { name: "Idea" } } }))
      .status,
    "Idea",
  );
});

const post = (overrides: Partial<Post>): Post => ({
  id: overrides.slug ?? "id",
  createdTime: "2024-01-01T00:00:00.000Z",
  title: "Title",
  slug: "slug",
  type: "Post",
  status: "Published",
  date: "2024-03-01",
  ...overrides,
});

const now = new Date("2024-06-01T12:00:00");

test("keeps published posts and pages, newest first", () => {
  const posts = publishedPosts(
    [
      post({ slug: "older", date: "2024-03-01" }),
      post({ slug: "newer", date: "2024-05-01" }),
      post({ slug: "today", date: "2024-06-01" }),
      post({ slug: "about", type: "Page" }),
      post({ slug: "draft", status: "Idea" }),
      post({ slug: "scheduled", date: "2024-06-02" }),
      post({ slug: "" }),
      post({ slug: "other", type: "Other" }),
    ],
    { now },
  );
  assert.deepEqual(
    posts.map((p) => p.slug),
    ["today", "newer", "older", "about"],
  );
});

test("finds the older and newer post, skipping outer links", () => {
  const posts = [
    post({ slug: "newest" }),
    post({ slug: "outer", outer_link: "https://example.com" }),
    post({ slug: "middle" }),
    post({ slug: "oldest" }),
  ];
  const link = (slug: string) => ({ title: "Title", slug });
  assert.deepEqual(getNeighbors(posts, "middle"), {
    prev: link("oldest"),
    next: link("newest"),
  });
  assert.deepEqual(getNeighbors(posts, "newest"), {
    prev: link("middle"),
    next: null,
  });
  assert.deepEqual(getNeighbors(posts, "oldest"), {
    prev: null,
    next: link("middle"),
  });
});
