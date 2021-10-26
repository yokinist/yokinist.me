import { NotionAPI } from 'notion-client';
import BLOG from '~/blog.config';

export const getPostBlocks = async (id: string) => {
  const authToken = BLOG.notionAccessToken;
  const api = new NotionAPI({ authToken });
  const pageBlock = await api.getPage(id);
  return pageBlock;
};
