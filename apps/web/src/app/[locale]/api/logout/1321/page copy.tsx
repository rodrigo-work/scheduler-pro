'use client'

import { Button } from '@repo/design-system/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const code = searchParams.get('code')
  const redirect = searchParams.get('state') || '/dashboard'
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [countdown, setCountdown] = useState(20)

  useEffect(() => {
    const handleLogin = () => {
      const authorizeUrl =
        `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN!}/oauth2/authorize?` +
        `response_type=code&` +
        `client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!}&` +
        `redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!)}&` +
        `scope=openid&` +
        `state=${encodeURIComponent(redirect)}`

      router.push(authorizeUrl)
    }

    const handleRedirect = async () => {
      if (code) {
        try {
          const res = await fetch('/api/exchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
          })

          if (!res.ok) {
            console.error('Token exchange failed')
            setIsRedirecting(false)
            return
          }

          router.push(redirect)
        } catch (err) {
          console.error('Error exchanging token:', err)
          setIsRedirecting(false)
        }
      } else {
        setIsRedirecting(true)

        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval)
              handleLogin()
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    }

    handleRedirect()
  }, [code, redirect, router])

  const handleManualLogin = () => {
    const authorizeUrl =
      `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN!}/oauth2/authorize?` +
      `response_type=code&` +
      `client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!}&` +
      `redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!)}&` +
      `scope=openid&` +
      `state=${encodeURIComponent(redirect)}`

    router.push(authorizeUrl)
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Loader2Icon className="animate-spin" />
        <code>redirect = {redirect}</code>
        <code>code = {code}</code>

        {isRedirecting && countdown > 0 && (
          <p className="text-sm text-gray-600">
            Redirecionando em {countdown} segundo{countdown !== 1 ? 's' : ''}...
          </p>
        )}

        {!isRedirecting && (
          <Button size="sm" onClick={handleManualLogin}>
            Tentar login novamente
          </Button>
        )}
      </div>
    </div>
  )
}
