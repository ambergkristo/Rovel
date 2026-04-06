import { createContext } from 'react'
import type { MessageTree } from '../i18n/messages'
import type { Locale } from '../types'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: MessageTree
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)
