'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
// import { Button } from "@repo/ui/button";
import { log } from '@repo/logger'
import Link from 'next/link'
// import { CounterButton } from "@repo/ui/counter-button";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001'

export default function Web() {
  log('Hey! This is the Web page.')

  const [name, setName] = useState<string>('')
  const [response, setResponse] = useState<{ message: string } | null>(null)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    setResponse(null)
    setError(undefined)
  }, [name])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await fetch(`${API_HOST}/message/${name}`)
      const response = await result.json()
      setResponse(response)
    } catch (err) {
      // console.error(err)
      setError('Unable to fetch response')
    }
  }

  const onReset = () => {
    setName('')
  }

  return (
    <div className="container">
      <h1 className="title">
        Web <br />
        <span>Next.js</span>
      </h1>
      {/* <CounterButton /> */}
      <p className="description">
        Built With <Link href="https://turbo.build/repo">Turborepo</Link>
        {' & '}
        <Link href="https://nextjs.org/">Next.js</Link>
      </p>
      <div>
        <h1>Web</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
          ></input>
          <button type="submit">Submit</button>
        </form>
        {error && (
          <div>
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}
        {response && (
          <div>
            <h3>Greeting</h3>
            <p>{response.message}</p>
            <button onClick={onReset}>Reset</button>
          </div>
        )}
      </div>
    </div>
  )
}
