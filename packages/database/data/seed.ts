import { PrismaClient } from '@repo/database/generated/client'
import { readFile } from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('📂 Lendo arquivo JSON...')

  const filePath = path.join(__dirname, 'events.json')
  const fileContent = await readFile(filePath, 'utf-8')
  const { data: events } = JSON.parse(fileContent)

  console.log('👥 Criando convidados únicos...')
  const uniqueGuestsMap = new Map<string, string>() // guestId => email

  for (const event of events) {
    for (const eg of event.guests) {
      uniqueGuestsMap.set(eg.guest.id, eg.guest.email)
    }
  }

  for (const [id, email] of uniqueGuestsMap.entries()) {
    await prisma.guest.upsert({
      where: { id },
      update: {},
      create: { id, email }
    })
    console.log(`✅ Guest inserido: ${email}`)
  }

  console.log('📅 Criando eventos e ligações com convidados...')
  for (const event of events) {
    await prisma.event.create({
      data: {
        id: event.id,
        name: event.name,
        description: event.description,
        location: event.location,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
        timezone: event.timezone,
        createdAt: new Date(event.createdAt),
        updatedAt: new Date(event.updatedAt),
        guests: {
          create: event.guests.map(
            (g: { id: any; confirmed: any; guestId: any }) => ({
              id: g.id,
              confirmed: g.confirmed ?? false,
              guest: {
                connect: {
                  id: g.guestId
                }
              }
            })
          )
        }
      }
    })
    console.log(`✅ Evento inserido: ${event.name}`)
  }

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch(async (e) => {
    console.error('❌ Erro ao rodar seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
