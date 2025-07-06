import { prisma } from '@repo/database'
import { CreateEventDTO } from '../models/EventModel.js'
import { PaginationResult, Paginator } from '../utils/Pagination'
import { AbstractService } from './AbstractService'

export class EventService extends AbstractService {
  constructor() {
    super()
  }

  async createEvent(data: CreateEventDTO) {
    const { guests, ...eventData } = data

    const createdEvent = await prisma.event.create({ data: eventData })

    const guestRecords = await Promise.all(
      guests.map((email) =>
        prisma.guest.upsert({
          where: { email },
          update: {},
          create: { email }
        })
      )
    )

    await Promise.all(
      guestRecords.map((guest) =>
        prisma.eventGuest.create({
          data: {
            eventId: createdEvent.id,
            guestId: guest.id
          }
        })
      )
    )

    return prisma.event.findUnique({
      where: { id: createdEvent.id },
      include: {
        guests: {
          include: {
            guest: true
          }
        }
      }
    })
  }

  async getAllEvents(page = 1, limit = 10): Promise<PaginationResult<unknown>> {
    const { take, skip } = Paginator.getPagination({ page, limit })

    const [data, total] = await Promise.all([
      prisma.event.findMany({
        skip,
        take,
        include: {
          guests: {
            include: { guest: true }
          }
        },
        orderBy: { startTime: 'asc' }
      }),
      prisma.event.count()
    ])

    return Paginator.buildResult(data, total, page, limit)
  }

  async getEventById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        guests: {
          include: { guest: true }
        }
      }
    })
  }

  async updateEvent(id: string, data: Partial<CreateEventDTO>) {
    const { guests, ...eventData } = data

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: eventData
    })

    if (guests) {
      await prisma.eventGuest.deleteMany({ where: { eventId: id } })

      const guestRecords = await Promise.all(
        guests.map((email) =>
          prisma.guest.upsert({
            where: { email },
            update: {},
            create: { email }
          })
        )
      )

      await Promise.all(
        guestRecords.map((guest) =>
          prisma.eventGuest.create({
            data: {
              eventId: id,
              guestId: guest.id
            }
          })
        )
      )
    }

    return this.getEventById(id)
  }

  async deleteEvent(id: string) {
    await prisma.eventGuest.deleteMany({ where: { eventId: id } })
    return prisma.event.delete({ where: { id } })
  }
}
