import { getBlockValue, getDateValue, getTextContent } from "notion-utils";
import { Post } from "~/types";
import { ReturnGetAllPostsParams } from "./getAllPosts";

const excludeProperties = ["date", "select", "multi_select", "person"];

export const getPageProperties = async (
  id: string,
  block: ReturnGetAllPostsParams["block"],
  schema: ReturnGetAllPostsParams["schema"],
): Promise<Post> => {
  const rawProperties = Object.entries(
    getBlockValue(block?.[id])?.properties || [],
  );
  const properties: Record<string, Post[keyof Post]> = {};
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i];
    properties.id = id;
    const currentPostKey = schema[key]?.name as keyof Post | undefined;
    if (
      currentPostKey &&
      schema[key]?.type &&
      !excludeProperties.includes(schema[key].type)
    ) {
      properties[currentPostKey] = getTextContent(
        val as Parameters<typeof getTextContent>[0],
      );
    } else {
      switch (schema[key]?.type) {
        case "date": {
          const dateProperty = getDateValue(
            val as Parameters<typeof getDateValue>[0],
          );
          const tmpDateProperty: Partial<typeof dateProperty> = dateProperty;
          if (tmpDateProperty && currentPostKey) {
            // biome-ignore lint/performance/noDelete: <explanation>
            delete tmpDateProperty.type;
            properties[currentPostKey] = tmpDateProperty;
          }
          break;
        }
        case "select":
        case "multi_select": {
          const selects = getTextContent(
            val as Parameters<typeof getTextContent>[0],
          );
          if (selects[0]?.length && currentPostKey) {
            properties[currentPostKey] = selects.split(",");
          }
          break;
        }
        default:
          break;
      }
    }
  }
  return properties as Post;
};
