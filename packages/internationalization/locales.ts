import languine from './languine.json'

export const locales = [
  languine.locale.source,
  ...languine.locale.targets
] as const

interface LanguageProps {
  label: string
  value: string
  icon: string
  locale: string
}

const localizedStrings: LanguageProps[] = [
  {
    label: 'English',
    value: 'en',
    icon: '🇬🇧',
    locale: 'en-US'
  },
  {
    label: 'Español',
    value: 'es',
    icon: '🇪🇸',
    locale: 'es-ES'
  },
  {
    label: 'Português',
    value: 'pt',
    icon: '🇧🇷',
    locale: 'pt-BR'
  },
  {
    label: '中文',
    value: 'zh',
    icon: '🇨🇳',
    locale: 'zh-CN'
  }
]

export const languages: LanguageProps[] = locales
  .map((locale) => {
    const lang = locale.split('-')[0]
    const localized = localizedStrings.find((l) => l.value === lang)

    if (localized) {
      return {
        label: localized.label,
        value: lang,
        icon: localized.icon,
        locale: localized.locale
      }
    }
    return undefined
  })
  .filter((lang): lang is LanguageProps => lang !== undefined)

// console.log(`Languages: ${JSON.stringify(languages, null, 2)}`)
