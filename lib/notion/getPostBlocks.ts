import BLOG from '~/blog.config';
import { NotionAPI } from 'notion-client';

export const getPostBlocks = async (id: string) => {
  const authToken = BLOG.notionAccessToken;
  const api = new NotionAPI({ authToken });
  const pageBlock = await api.getPage(id);
  return pageBlock;
};
