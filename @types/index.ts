/* eslint-disable camelcase */
export type PostType = "Post" | "Page"

export type PostStatus = "Idea" | "Published" | "Revise" | "Published"

export type Post = {
  id: string
  createdTime: string
  fullWidth: boolean
  title?: string
  slug?: string
  summary?: string
  tags?: string[]
  date: {
    start_date?: string
  }
  status?: [PostStatus]
  type?: [PostType]
}

export type TagObj = { [key: string]: 1 }