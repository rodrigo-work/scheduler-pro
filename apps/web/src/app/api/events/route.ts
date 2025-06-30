////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { Faker, base, pt_BR } from '@faker-js/faker'
import fs from 'fs'
import { matchSorter } from 'match-sorter' // For filtering
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const faker = new Faker({
  locale: [pt_BR, base]
})

// Mock current time
const currentTime = new Date().toISOString()

// Define the shape of Event data
type Guest = {
  id: string
  email: string
}

type EventGuest = {
  id: string
  eventId: string
  guestId: string
  confirmed: boolean
  guest: Guest
}

type Event = {
  id: string
  name: string
  description: string
  location: string
  startTime: Date
  endTime: Date
  timezone: string
  createdAt: string
  updatedAt: string
  guests: EventGuest[]
}

// Mock event data store
const fakeEvents = {
  records: [] as Event[], // Holds the list of event objects

  // Initialize with sample data
  initialize() {
    const NUM_EVENTS = 5
    const SAMPLE_EVENTS: Event[] = []

    // Sets para garantir unicidade
    const usedEventNames = new Set<string>()
    const usedGuestEmails = new Set<string>()

    // Função para gerar guest único (email único)
    function generateUniqueGuest(): Guest {
      let email: string
      do {
        email = faker.internet
          .email({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
          })
          .toLowerCase()
      } while (usedGuestEmails.has(email))
      usedGuestEmails.add(email)

      return {
        id: uuidv4(),
        email
      }
    }

    // Gera datas random com intervalo entre 30 e 60 minutos
    function generateRandomDate() {
      const startDate = faker.date.between({
        from: '2024-01-01T00:00:00.000Z',
        to: '2027-01-01T00:00:00.000Z'
      })

      const endDate = new Date(startDate)
      const randomMinutes = faker.number.int({ min: 30, max: 60 })
      endDate.setMinutes(endDate.getMinutes() + randomMinutes)

      return { start: startDate, end: endDate }
    }

    // Gera nome único para evento
    function generateUniqueEventName(): string {
      let name: string
      do {
        name = faker.company.name()
      } while (usedEventNames.has(name))
      usedEventNames.add(name)
      return name
    }

    // Gera evento com convidados únicos
    function generateRandomEventData(): Event {
      const locations = ['Google Meet', 'Microsoft Teams', 'WhatsApp']

      const eventId = uuidv4()

      // Cria uma lista de convidados únicos para o evento
      const maxGuestsForEvent = Math.floor(NUM_EVENTS / 2)
      const guestsPool: Guest[] = Array.from(
        { length: maxGuestsForEvent },
        () => generateUniqueGuest()
      )

      // Seleciona convidados aleatórios para o evento
      const guestCount = faker.number.int({ min: 1, max: guestsPool.length })
      const selectedGuests = faker.helpers
        .shuffle(guestsPool)
        .slice(0, guestCount)

      const guests: EventGuest[] = selectedGuests.map((g) => ({
        id: uuidv4(),
        eventId,
        guestId: g.id,
        confirmed: faker.helpers.arrayElement([true, false]),
        guest: {
          id: g.id,
          email: g.email
        }
      }))

      return {
        id: eventId,
        name: generateUniqueEventName(),
        description: faker.lorem.lines({ min: 1, max: 3 }),
        location: faker.helpers.arrayElement(locations),
        startTime: generateRandomDate().start,
        endTime: generateRandomDate().end,
        timezone: 'America/Sao_Paulo',
        createdAt: faker.date
          .between({ from: '2023-01-01', to: '2026-12-31' })
          .toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        guests
      }
    }

    // Gera todos os eventos
    for (let i = 1; i <= NUM_EVENTS; i++) {
      SAMPLE_EVENTS.push(generateRandomEventData())
    }

    this.records = SAMPLE_EVENTS
  },

  // Get all events with optional location filtering and search
  async getAll({ search }: { search?: string }) {
    let events = [...this.records]

    if (search) {
      events = matchSorter(events, search ?? '', {
        keys: ['id', 'name', 'description', 'location']
      })
    }

    return events
  },

  // Get paginated results with optional category filtering and search
  async getEvents({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number
    limit?: number
    search?: string
  }) {
    const allEvents = await this.getAll({ search })
    const totalEvents = allEvents.length

    const offset = (page - 1) * limit
    const paginatedEvents = allEvents.slice(offset, offset + limit)

    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total: totalEvents,
      page,
      totalPages: Math.ceil(totalEvents / limit),
      limit,
      data: paginatedEvents
    }
  }
}

// Endpoint GET padrão para Next.js API routes
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const search = String(searchParams.get('search'))

  const generate = Boolean(searchParams.get('generate'))

  const filters = {
    ...(page && { page }),
    ...(limit && { limit }),
    ...(search && search !== 'null' && { search })
  }

  const data = await fakeEvents.getEvents(filters)

  if (generate) {
    const filePath = path.join(process.cwd(), 'public', 'events.json')
    try {
      fs.writeFileSync(
        filePath,
        JSON.stringify({ data: data.data }, null, 2),
        'utf-8'
      )
      return NextResponse.json(
        {
          success: true,
          time: currentTime,
          message:
            'Sample Events data for testing and learning purposes generated.',
          total: data.data.length
        },
        { status: 200 }
      )
    } catch (error) {
      console.error(error)
      return NextResponse.json(
        { error: 'Error generate events.' },
        { status: 500 }
      )
    }
  } else {
    return NextResponse.json(data)
  }
}

// Inicializa os dados
fakeEvents.initialize()
