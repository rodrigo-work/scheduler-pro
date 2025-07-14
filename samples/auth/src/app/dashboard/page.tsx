'use client'

import { useState } from 'react'
//
import { log } from '@repo/logger'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const AuthPage = () => {
  // export default function AuthPage() {
  log('Hey! This is the AuthPage.')

  const router = useRouter()

  const code = useSearchParams().get('code')
  const redirect = useSearchParams().get('state') || '/dashboard'

  const [isRedirecting, setIsRedirecting] = useState(false)
  const [countdown, setCountdown] = useState(6)

  return (
    <div className="container">
      {/* <h1 className="title">
        Web <br />
        <span>Next.js</span>
      </h1> */}
      {/* <CounterButton /> */}
      <p className="description">
        descriptiondescriptiondescriptiondescription
      </p>

      <p className="description">
        Built With <Link href="https://turbo.build/repo">Turborepo</Link>
        {' & '}
        <Link href="https://nextjs.org/">Next.js</Link>
      </p>
    </div>
  )
}

export default AuthPage
