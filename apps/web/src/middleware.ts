import { internationalizationMiddleware } from '@repo/internationalization/middleware'
import { NextRequest, NextResponse } from 'next/server'
import {
  COOKIE_IDP_NAME,
  shouldRedirectToApp,
  shouldRedirectToAuth
} from './lib/auth'
import { COOKIE_NAME, detectLanguage, LANGUAGES } from './lib/i18n'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const lang = detectLanguage(req)

  const i18nResponse = internationalizationMiddleware(
    req as unknown as NextRequest
  )
  if (i18nResponse) {
    return i18nResponse
  }

  // if (!hasLocalePrefix(req.nextUrl.pathname)) {
  //   return NextResponse.redirect(
  //     new URL(`/${lang}${req.nextUrl.pathname}`, req.url)
  //   )
  // }

  const langInUrl = LANGUAGES.find((l) =>
    req.nextUrl.pathname.startsWith(`/${l}`)
  )

  const currentLang = langInUrl ?? lang

  if (shouldRedirectToAuth(req)) {
    // const loginUrl = new URL('/auth/login', req.url)
    // loginUrl.searchParams.set('state', pathname)
    // return NextResponse.redirect(loginUrl)
    // const response = NextResponse.redirect(
    //   // new URL(`/${currentLang}/auth/login`, req.url)
    //   new URL(`/auth/login`, req.url)
    // )
    // response.cookies.set(COOKIE_NAME, currentLang)
    // return response
  }

  if (shouldRedirectToApp(req)) {
    const response = NextResponse.redirect(
      // new URL(`/${currentLang}/dashboard`, req.url)
      new URL(`/dashboard`, req.url)
    )
    response.cookies.set(COOKIE_NAME, currentLang)
    return response
  }

  const response = NextResponse.next()
  response.cookies.set(COOKIE_NAME, currentLang)

  if (req.cookies.has(COOKIE_IDP_NAME)) {
    response.cookies.set(
      COOKIE_IDP_NAME,
      req.cookies.get(COOKIE_IDP_NAME)?.value ?? ''
    )
  }

  return response
}
