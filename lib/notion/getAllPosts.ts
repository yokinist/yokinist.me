import { NotionAPI } from 'notion-client';
import { BasePageBlock } from 'notion-types/build/esm/block';
import { Collection } from 'notion-types/build/esm/collection';
import { ExtendedRecordMap } from 'notion-types/build/esm/maps';
import { idToUuid } from 'notion-utils';
import BLOG from '~/blog.config';
import { Post } from '~/types';
import { getPageProperties, getAllPageIds, filterPublishedPosts } from './index';

export const getAllPosts = async ({ includedPages = false }: { includedPages: boolean }): Promise<Post[]> => {
  let id = BLOG.notionPageId;
  const authToken = BLOG.notionAccessToken;
  const api = new NotionAPI({ authToken });
  const response = await api.getPage(id);

  id = idToUuid(id);
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[id].value as BasePageBlock;
  const result = await returnGetAllPosts({
    id,
    rawMetadata,
    collectionQuery,
    block,
    schema,
    includedPages,
  });
  return result ?? [];
};

export type ReturnGetAllPostsParams = {
  id: string;
  includedPages: boolean;
  rawMetadata: BasePageBlock;
  collectionQuery: ExtendedRecordMap['collection_query'];
  block: ExtendedRecordMap['block'];
  schema: Collection['schema'];
};

const returnGetAllPosts = async ({
  id,
  includedPages,
  rawMetadata,
  collectionQuery,
  block,
  schema,
}: ReturnGetAllPostsParams) => {
  if (rawMetadata?.type !== 'collection_view_page' && rawMetadata?.type !== 'collection_view') {
    console.error(`pageId "${id}" is not a database`);
    return null;
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery);
    const data: Post[] = [];
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i];
      const properties = (await getPageProperties(id, block, schema)) || null;
      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(block[id].value?.created_time).toString();
      properties.fullWidth = (block[id].value?.format as BasePageBlock['format'])?.page_full_width ?? false;

      data.push(properties);
    }
    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({
      posts: data,
      includedPages,
    });

    // Sort by date
    if (BLOG.sortByDate) {
      posts.sort((a, b) => {
        const dateA = new Date(a?.date?.start_date || a.createdTime);
        const dateB = new Date(b?.date?.start_date || b.createdTime);
        return dateB.getTime() - dateA.getTime();
      });
    }
    return posts;
  }
};
