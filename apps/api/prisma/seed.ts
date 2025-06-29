import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const guests = [
  {
    id: 'cf48757c-e48b-4065-bc38-3a49566a138e',
    email: 'mariaeduarda.martins@bol.com.br'
  }
]

const events = [
  {
    id: '89877696-d62e-45de-b927-090283e90a98',
    title: 'Reis-Carvalho',
    description:
      'Recusandae deleniti dicta fugiat rerum perspiciatis quo.\nVoluptatum maiores pariatur corrupti voluptas harum quo.',
    location: 'WhatsApp',
    startTime: new Date('2025-10-02T21:35:11.428Z'),
    endTime: new Date('2025-10-02T22:28:11.428Z'),
    timezone: 'America/Sao_Paulo',
    createdAt: new Date('2025-06-24T02:37:54.765Z'),
    updatedAt: new Date('2025-06-24T02:37:54.765Z'),
    guests: [
      {
        id: '600ed3cc-68ea-4c0e-a6b5-feffef6d8a77',
        guestId: 'cf48757c-e48b-4065-bc38-3a49566a138e'
      }
    ]
  },
  {
    id: '566c50c3-d27b-42c9-88ae-630ecf840039',
    title: 'Martins S.A.',
    description: 'Incidunt quidem rem.',
    location: 'Zoom',
    startTime: new Date('2024-02-09T17:16:12.170Z'),
    endTime: new Date('2024-02-09T18:16:12.170Z'),
    timezone: 'America/Sao_Paulo',
    createdAt: new Date('2025-06-24T02:37:54.765Z'),
    updatedAt: new Date('2025-06-24T02:37:54.765Z'),
    guests: [
      {
        id: 'c1f180ac-0ca7-4076-86f2-a7e4e134ab15',
        guestId: 'cf48757c-e48b-4065-bc38-3a49566a138e'
      }
    ]
  }
]

async function main() {
  console.log('🌱 Iniciando seed...')

  // Criar os convidados
  for (const guest of guests) {
    const created = await prisma.guest.upsert({
      where: { id: guest.id },
      update: {},
      create: {
        id: guest.id,
        email: guest.email
      }
    })
    console.log(`✅ Guest criado/atualizado: ${created.email}`)
  }

  // Criar eventos + relação com convidados
  for (const event of events) {
    const createdEvent = await prisma.event.create({
      data: {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        timezone: event.timezone,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        guests: {
          create: event.guests.map((g) => ({
            id: g.id,
            guest: {
              connect: {
                id: g.guestId
              }
            }
          }))
        }
      }
    })
    console.log(`📅 Evento criado: ${createdEvent.title}`)
  }

  console.log('✅ Seed finalizado com sucesso!')
}

main()
  .catch(async (e) => {
    console.error('❌ Erro durante o seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
