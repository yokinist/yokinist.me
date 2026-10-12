import assert from "node:assert/strict";
import { test } from "node:test";
import type { ExtendedRecordMap } from "notion-types";
import { toPosts } from "./toPosts.ts";

const DB_ID = "11111111111111111111111111111111";
const DB_UUID = "11111111-1111-1111-1111-111111111111";

// notion-client v8 wraps record values twice
const box = (value: object) => ({
  role: "reader",
  value: { role: "reader", value },
});

const page = (id: string, props: Record<string, unknown>) => [
  id,
  box({
    id,
    type: "page",
    created_time: Date.UTC(2024, 0, 1),
    properties: props,
  }),
];

const props = (overrides: Record<string, unknown> = {}) => ({
  title: [["Hello"]],
  slug: [["hello"]],
  status: [["Published"]],
  type: [["Post"]],
  tags: [["tech,music"]],
  date: [["‣", [["d", { type: "date", start_date: "2024-03-01" }]]]],
  ...overrides,
});

const recordMap = (pages: unknown[][], databaseType = "collection_view_page") =>
  ({
    block: Object.fromEntries([
      [DB_UUID, box({ id: DB_UUID, type: databaseType })],
      ...pages,
    ]),
    collection: {
      c: box({
        id: "c",
        schema: {
          title: { name: "title", type: "title" },
          slug: { name: "slug", type: "text" },
          status: { name: "status", type: "select" },
          type: { name: "type", type: "select" },
          tags: { name: "tags", type: "multi_select" },
          date: { name: "date", type: "date" },
        },
      }),
    },
    collection_query: {
      c: {
        view: {
          collection_group_results: { blockIds: pages.map(([id]) => id) },
        },
      },
    },
  }) as unknown as ExtendedRecordMap;

const now = new Date("2024-06-01T12:00:00");

test("maps properties of published posts, newest first", () => {
  const posts = toPosts(
    recordMap([
      page("a", props()),
      page(
        "b",
        props({
          slug: [["newer"]],
          date: [["‣", [["d", { start_date: "2024-05-01" }]]]],
        }),
      ),
    ]),
    DB_ID,
    { now },
  );
  assert.deepEqual(
    posts.map((post) => post.slug),
    ["newer", "hello"],
  );
  assert.equal(posts[1].title, "Hello");
  assert.deepEqual(posts[1].tags, ["tech", "music"]);
  assert.deepEqual(posts[1].date, { start_date: "2024-03-01" });
  assert.deepEqual(posts[1].type, ["Post"]);
});

test("drops drafts, scheduled posts, posts without a slug and unknown types", () => {
  const posts = toPosts(
    recordMap([
      page("draft", props({ status: [["Idea"]] })),
      page(
        "scheduled",
        props({ date: [["‣", [["d", { start_date: "2024-06-02" }]]]] }),
      ),
      page(
        "today",
        props({
          slug: [["today"]],
          date: [["‣", [["d", { start_date: "2024-06-01" }]]]],
        }),
      ),
      page("no-slug", props({ slug: [[""]] })),
      page("other", props({ type: [["Other"]] })),
      page("page", props({ slug: [["about"]], type: [["Page"]] })),
    ]),
    DB_ID,
    { now },
  );
  assert.deepEqual(
    posts.map((post) => post.slug),
    ["today", "about"],
  );
});

test("throws when the page is not a database", () => {
  assert.throws(() => toPosts(recordMap([], "page"), DB_ID), /not a database/);
});
