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
  root: boolean
  twitter: boolean
}

export const getOGImageURL = (props: GetOGImageUrlArgs): string => {
  const [query, setQuery] = useState<OGImageQuery>({
    md: '1',
    fontSize: '96px',
    background: encodeURIComponent(BLOG.darkBackground),
    foreground: encodeURIComponent(BLOG.lightBackground),
    siteTitle: encodeURIComponent(BLOG.title),
    isTwitter: undefined
  })

  useEffect(() => {
    if (props.twitter) {
      if (!props.root) {
        setQuery(prevQuery => ({ ...prevQuery, isTwitter: 'true' }))
        return
      }
      setQuery(prevQuery => ({
        ...prevQuery,
        siteTitle: undefined,
        isTwitter: 'true'
      }))
      return
    }
    if (props.root) {
      setQuery(prevQuery => ({ ...prevQuery, siteTitle: undefined }))
    }
  }, [props])

  const queryString = useMemo(() => {
    return (Object.keys(query) as OGImageKeys)
      .filter(key => !!query[key])
      .map(key => key + '=' + query[key])
      .join('&')
  }, [query])

  return `${BLOG.ogImageGenerateURL}/${encodeURIComponent(
    props.title
  )}.png?${queryString}`
}
