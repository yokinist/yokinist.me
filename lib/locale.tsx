import { useContext, createContext } from 'react'
import { fetchLocaleLang } from '@/lib/lang'

const locale = fetchLocaleLang()

const LocaleContext = createContext<typeof locale | null>(null)

type Props = {
  children: React.ReactNode
}

export const LocaleProvider: React.VFC<Props> = ({ children }) => {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
}

export const useLocale = () => useContext(LocaleContext)