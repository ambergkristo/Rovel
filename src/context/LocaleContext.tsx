import {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { messages } from '../i18n/messages'
import {
  defaultLocale,
  isSupportedLocale,
  localeStorageKey,
} from '../lib/localization'
import type { Locale } from '../types'
import { LocaleContext } from './locale-context'

const readInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  const storedLocale = window.localStorage.getItem(localeStorageKey)

  if (storedLocale && isSupportedLocale(storedLocale)) {
    return storedLocale
  }

  return defaultLocale
}

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(localeStorageKey, locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      messages: messages[locale],
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
