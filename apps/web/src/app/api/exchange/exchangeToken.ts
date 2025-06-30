// apps/web/src/app/api/exchange/exchangeToken.ts

export interface ExchangeTokenOptions {
  code: string
}

export async function exchangeToken({ code }: ExchangeTokenOptions) {
  const COGNITO_DOMAIN =
    process.env.NEXT_PUBLIC_COGNITO_DOMAIN ||
    'https://rodrigo-work.auth.us-east-1.amazoncognito.com'
  const CLIENT_ID =
    process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '4vd5651ldt63jloj9eiumsk9ld'
  const REDIRECT_URI =
    process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI ||
    'https://localhost:3000/auth/login'
  const CLIENT_SECRET =
    process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET ||
    '7vjmvsvp2i7klt94qsq4l60qt6fuvbei68s1ok7i2qsr1n3ql8r'

  const tokenUrl = `${COGNITO_DOMAIN}/oauth2/token`

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code
  })

  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    'base64'
  )

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basicAuth}`
    },
    body
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error_description || 'Token exchange failed')
  }

  return data // Retorna access_token, refresh_token etc.
}
