import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies()

  // Remove todos os cookies
  ;(
    await // Remove todos os cookies
    cookieStore
  )
    .getAll()
    .forEach(async (cookie) => {
      ;(await cookieStore).set(cookie.name, '', {
        expires: new Date(0),
        path: '/'
      })
    })

  return NextResponse.json({ message: 'Cookies removidos' })
}
