import BLOG from '@/blog.config'
import { useEffect } from 'react'

type Props = {
  id: string
  url: string
  title: string
}

const Cusdis: React.VFC<Props> = ({ id, url, title }) => {
  useEffect(() => {
    const script = document.createElement('script')
    const anchor = document.getElementById('comments')
    script.setAttribute(
      'src',
      BLOG.comment.cusdisConfig.scriptSrc ||
        'https://cusdis.com/js/cusdis.es.js'
    )
    script.setAttribute('async', 'true')
    script.setAttribute('defer', 'true')
    anchor?.appendChild(script)
    return () => {
      if (anchor?.innerHTML) anchor.innerHTML = ''
    }
  })

  return (
    <div id="comments">
      <div
        id="cusdis_thread"
        data-host={BLOG.comment.cusdisConfig.host || 'https://cusdis.com'}
        data-app-id={BLOG.comment.cusdisConfig.appId}
        data-page-id={id}
        data-page-url={url}
        data-page-title={title}
        data-theme={BLOG.appearance}
      ></div>
    </div>
  )
}

export default Cusdis
