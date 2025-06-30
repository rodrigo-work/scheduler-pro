'use server'

import { serialize } from '@/lib/searchparams'
import { Event } from './data/schema'

type PaginatorProps = {
  limit?: number
  page?: number
  search?: string
}

//const NEXT_PUBLIC_API_URL = 'http://localhost:3001/api'
const NEXT_PUBLIC_API_URL = 'https://localhost:3000/api'
// const NEXT_PUBLIC_API_URL = 'https://scheduler-pro2.vercel.app/api'

export const delay = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

// export async function updateUser() {
//   const result = await fetch(`${NEXT_PUBLIC_API_URL}/events`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(v)
//   })

//   const data = await result.json()

//   return data
// }

export async function getAllEvents({ limit, page, search }: PaginatorProps) {
  await delay(2000)

  const filters = {
    page,
    limit,
    ...(search && { search })
  }

  const data = await fetch(
    `${NEXT_PUBLIC_API_URL}/events${serialize({ ...filters })}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return await data.json()
}

export async function getEventById(id: Event) {
  await delay(2000)

  // const data = await fetch(`${NEXT_PUBLIC_API_URL}/events/${id}`, {
  const data = await fetch(`${NEXT_PUBLIC_API_URL}/events?search=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const result = await data.json()
  return result
}

export async function deleteEvent({ id }: Event) {
  await delay(2000)

  const data = await fetch(`${NEXT_PUBLIC_API_URL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const result = await data.json()
  return result
}
