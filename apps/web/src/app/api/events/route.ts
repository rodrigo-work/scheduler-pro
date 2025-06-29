import { Faker, base, pt_BR } from '@faker-js/faker'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Event, Guest, GuestInfo } from './types'

const faker = new Faker({
  locale: [pt_BR, base]
})

function generateRandomDate() {
  const startDate = faker.date.between({
    from: '2024-01-01T00:00:00.000Z',
    to: '2027-01-01T00:00:00.000Z'
  }) // Data futura para início
  const endDate = new Date(startDate) // Inicializa com a mesma data de início

  // Gera intervalo aleatório de 30 minutos a 1 hora
  const randomMinutes = Math.floor(Math.random() * (60 - 30 + 1)) + 30
  endDate.setMinutes(endDate.getMinutes() + randomMinutes)

  return {
    start: startDate,
    end: endDate
  }
}

const generateGuest = (count: number): GuestInfo[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    email: faker.internet
      .email({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      })
      .toLowerCase()
  }))
}

const generateEvents = (users: GuestInfo[]): Event => {
  const eventId = uuidv4()
  const randomDate = generateRandomDate()

  const guestCount = faker.number.int({ min: 1, max: users.length })
  const selectedUsers = faker.helpers.shuffle(users).slice(0, guestCount)

  const guests: Guest[] = selectedUsers.map((user) => ({
    id: faker.string.uuid(),
    eventId,
    guestId: user.id,
    guest: {
      id: user.id,
      email: user.email
    }
  }))

  return {
    id: eventId,
    title: faker.company.name(),
    description: faker.lorem.lines({ min: 1, max: 3 }),
    location: faker.helpers.arrayElement([
      'Google Meet',
      'Zoom',
      'Microsoft Teams',
      'WhatsApp'
    ]),
    startTime: randomDate.start,
    endTime: randomDate.end,
    timezone: 'America/Sao_Paulo',
    createdAt: '2025-06-24T02:37:54.765Z',
    updatedAt: '2025-06-24T02:37:54.765Z',
    guests
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const qty = Number(searchParams.get('qty')) || 100

  const users = generateGuest(Math.floor(qty / 2))
  const events = Array.from({ length: qty }).map(() => generateEvents(users))

  const filePath = path.join(process.cwd(), 'public', 'events.json')

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify({ data: events }, null, 2),
      'utf-8'
    )
  }

  // try {
  // fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8')
  // return res.status(200).json({ message: '✅ Tasks data generated.', total: tasks.length });
  // } catch (error) {
  // console.error(error);
  // return res.status(500).json({ error: 'Erro ao gerar tasks.' });
  // }
  // }

  return NextResponse.json({ data: events })
}
