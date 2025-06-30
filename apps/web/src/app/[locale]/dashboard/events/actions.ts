'use server'

import { serialize } from '@/lib/searchparams'
import { Event } from './data/schema'

type PaginatorProps = {
  limit?: number
  page?: number
  search?: string
}

const NEXT_PUBLIC_API_URL = 'http://localhost:3001/api'
// const NEXT_PUBLIC_API_URL = 'https://localhost:3000/api'
// const NEXT_PUBLIC_API_URL = 'https://scheduler-pro2.vercel.app/api'

export const delay = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export async function createEvent(values: Event) {
  console.log('Creating event with values:', values)
  const data = await fetch(`${NEXT_PUBLIC_API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: values.name,
      description: 'description',
      location: 'WhatsApp',
      startTime: '2025-11-09T11:52:32.166Z',
      endTime: '2025-11-09T11:52:32.166Z',
      timezone: 'America/Sao_Paulo',
      guests: [values.guests]
    })
  })

  const result = await data.json()
  return result
}

export async function getAllEvents({ limit, page }: PaginatorProps) {
  await delay(2000)

  const filters = {
    ...(page && { page }),
    ...(limit && { limit })
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

  const result = await data.json()
  return result
}

export async function getEventById({ id }: Pick<Event, 'id'>) {
  await delay(2000)

  const data = await fetch(`${NEXT_PUBLIC_API_URL}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const result = await data.json()
  return result
}

export async function updateEvent(values: Event) {
  console.log('Updating event with values:', values)
  const data = await fetch(`${NEXT_PUBLIC_API_URL}/events/${values.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: values.id,
      name: values.name,
      description: 'description',
      location: 'WhatsApp',
      startTime: '2025-11-09T11:52:32.166Z',
      endTime: '2025-11-09T11:52:32.166Z',
      timezone: 'America/Sao_Paulo'
      // guests: [values.aguests]
    })
  })

  const result = await data.json()
  return result
}

export async function deleteEvent({ id }: Pick<Event, 'id'>) {
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
