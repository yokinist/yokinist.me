import BLOG from '@/blog.config'
import { useEffect, useMemo, useState } from 'react'

type OGImageQuery = {
  md: string
  fontSize: string
  background: string
  foreground: string
  siteTitle: string | undefined
  isTwitter: string | undefined
}

type OGImageKeys = (keyof OGImageQuery)[]

type GetOGImageUrlArgs = {
  title: string
  root?: boolean
  twitter?: boolean
}

export const getOGImageURL = ({
  title,
  root,
  twitter
}: GetOGImageUrlArgs): string => {
  const [query, setQuery] = useState<OGImageQuery>({
    md: '1',
    fontSize: '96px',
    background: encodeURIComponent(BLOG.darkBackground),
    foreground: encodeURIComponent(BLOG.lightBackground),
    siteTitle: encodeURIComponent(BLOG.title),
    isTwitter: undefined
  })

  useEffect(() => {
    if (twitter) {
      setQuery(prevQuery => ({ ...prevQuery, isTwitter: 'true' }))
    }
    if (root) {
      setQuery(prevQuery => ({ ...prevQuery, siteTitle: undefined }))
    }
  }, [twitter, root])

  const queryString = useMemo(() => {
    return (Object.keys(query) as OGImageKeys)
      .filter(key => !!query[key])
      .map(key => key + '=' + query[key])
      .join('&')
  }, [query])

  return `${BLOG.ogImageGenerateURL}/${encodeURIComponent(
    title
  )}.png?${queryString}`
}
