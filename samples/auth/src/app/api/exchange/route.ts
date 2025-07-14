// apps/web/src/app/api/exchange/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { exchangeToken } from './exchangeToken'

export async function POST(req: NextRequest) {
  await new Promise((r) => setTimeout(r, 6000))

  const { code } = await req.json()

  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 })
  }

  try {
    const tokenData = await exchangeToken({ code })

    const response = NextResponse.json({ success: true })
    response.cookies.set('access_token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 3600
    })

    return response
  } catch (error) {
    console.error('Token exchange failed:', error)
    return NextResponse.json(
      { error: 'Token exchange failed' },
      { status: 500 }
    )
  }
}
