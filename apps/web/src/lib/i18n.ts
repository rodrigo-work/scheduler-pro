import acceptLanguage from 'accept-language'
import { NextRequest } from 'next/server'

export const LANGUAGES = ['en', 'pt-BR']
export const DEFAULT_LANGUAGE = 'en'
export const COOKIE_NAME = 'lang'

acceptLanguage.languages(LANGUAGES)

export function detectLanguage(req: NextRequest): string {
  const cookieLang = req.cookies.get(COOKIE_NAME)?.value
  const headerLang = req.headers.get('Accept-Language')

  return (
    acceptLanguage.get(cookieLang) ||
    acceptLanguage.get(headerLang) ||
    DEFAULT_LANGUAGE
  )
}

export function hasLocalePrefix(pathname: string): boolean {
  return LANGUAGES.some((loc) => pathname.startsWith(`/${loc}`))
}
