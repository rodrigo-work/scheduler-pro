import { NextRequest } from 'next/server'

export const COOKIE_IDP_NAME = 'access_token' // 'accessTokenIDP'

export function isAuthenticated(req: NextRequest): boolean {
  return req.cookies.has(COOKIE_IDP_NAME)
}

export function shouldRedirectToAuth(req: NextRequest): boolean {
  return !isAuthenticated(req) && !req.nextUrl.pathname.includes('/auth')
}

export function shouldRedirectToApp(req: NextRequest): boolean {
  return isAuthenticated(req) && !req.nextUrl.pathname.includes('/dashboard')
}
