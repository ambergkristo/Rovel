import type { Locale, LocalizedText } from '../types'

export const localeStorageKey = 'rovel-storefront-locale-v1'

export const defaultLocale: Locale = 'et'

export const supportedLocales: Locale[] = ['et', 'en', 'ru']

export const isSupportedLocale = (value: string): value is Locale =>
  supportedLocales.includes(value as Locale)

export const resolveText = (text: LocalizedText, locale: Locale) => text[locale]

export const getNumberLocale = (locale: Locale) => {
  if (locale === 'et') {
    return 'et-EE'
  }

  if (locale === 'ru') {
    return 'ru-EE'
  }

  return 'en-EE'
}
