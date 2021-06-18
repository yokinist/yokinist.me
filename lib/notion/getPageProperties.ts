import { getTextContent, getDateValue } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import { ReturnGetAllPostsParams } from './getAllPosts'
import { Post } from '@/types'
import BLOG from '@/blog.config'

async function getPageProperties(
  id: string,
  block: ReturnGetAllPostsParams['block'],
  schema: ReturnGetAllPostsParams['schema'],
): Promise<Post> {
  const authToken = BLOG.notionAccessToken || null
  const api = new NotionAPI({ authToken })
  const rawProperties = Object.entries(
    block?.[id]?.value?.properties || []
  )
  const excludeProperties = ['date', 'select', 'multi_select', 'person']
  const properties: Post = {
    id: undefined,
    createdTime: undefined,
    fullWidth: undefined,
    date: {
      start_date: undefined
    }
  }
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i]
    properties.id = id
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val as Parameters<typeof getTextContent>[0])
    } else {
      switch (schema[key]?.type) {
        case 'date': {
          const dateProperty = getDateValue(
            val as Parameters<typeof getDateValue>[0]
          )
          delete dateProperty.type
          properties[schema[key].name] = dateProperty
          break
        }
        case 'select':
        case 'multi_select': {
          const selects = getTextContent(
            val as Parameters<typeof getTextContent>[0]
          )
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(',')
          }
          break
        }
        // NOTE: Not using it?
        case 'person': {
          const rawUsers = (val as string[][]).flat()
          const users = []
          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0]
              const res = await api.getUsers([userId])
              const resValue = res?.results?.[userId[1]]?.value
              const user = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo
              }
              users.push(user)
            }
          }
          properties[schema[key].name] = users
          break
        }
        default:
          break
      }
    }
  }
  return properties as Post
}

export { getPageProperties as default }
