import BLOG from '@/blog.config'
import type { ReactCusdis } from 'react-cusdis'

const cusdisI18n: Parameters<typeof ReactCusdis>[0]['lang'][] = [
  'ca',
  'en',
  'es',
  'fi',
  'fr',
  'id',
  'ja',
  'oc',
  'pt-br',
  'tr',
  'zh-cn',
  'zh-tw'
]

const loweredLang = BLOG.lang.toLowerCase()

export const fetchCusdisLang = (): null | typeof cusdisI18n[number] => {
  if (BLOG.comment.provider !== 'cusdis') return null
  if (loweredLang.startsWith('zh')) {
    return (
      cusdisI18n.find(i => loweredLang === i.toLocaleLowerCase()) ?? 'zh-cn'
    )
  } else {
    return (
      cusdisI18n.find(i =>
        BLOG.lang.toLowerCase().startsWith(i.toLowerCase())
      ) ?? 'en'
    )
  }
}
