import { PrismaClient } from '@repo/database'
import { PaginationResult, Paginator } from '../utils/Pagination'
import { AbstractService } from './AbstractService'

// const prisma = new PrismaClient({
//   log:
//     process.env.NODE_ENV === 'development'
//       ? ['query', 'info', 'warn', 'error']
//       : ['error']
// })

const prisma = new PrismaClient({
  errorFormat: 'minimal',

  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'stdout',
      level: 'error'
    },
    {
      emit: 'stdout',
      level: 'info'
    },
    {
      emit: 'stdout',
      level: 'warn'
    }
  ]
})

prisma.$on('query', (e) => {
  // console.log('Query: ' + e.query)
  // console.log('Params: ' + e.params)
  // console.log('Duration: ' + e.duration + 'ms')
})

export class GuestService extends AbstractService {
  constructor() {
    super()
  }

  async createGuest(email: string): Promise<unknown> {
    return await prisma.guest.create({ data: { email } })
  }

  async getAllGuests(page = 1, limit = 10): Promise<PaginationResult<unknown>> {
    const { take, skip } = Paginator.getPagination({ page, limit })

    const [data, total] = await Promise.all([
      prisma.guest.findMany({
        skip,
        take,
        include: {
          events: {
            select: {
              eventId: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.guest.count()
    ])

    return Paginator.buildResult(total, page, limit, data)
  }

  async getGuestById(id: string) {
    return await prisma.guest.findUnique({
      where: { id },
      include: {
        events: {
          select: {
            eventId: true
          }
        }
      }
    })
  }

  async updateGuest(id: string, email: string) {
    return await prisma.guest.update({
      where: { id },
      data: { email }
    })
  }

  async deleteGuest(id: string) {
    return await prisma.guest.delete({ where: { email: id } })
  }

  async inviteGuestToEvent(guestId: string, eventId: string) {
    return await prisma.eventGuest.create({
      data: { guestId, eventId }
    })
  }

  async confirmGuest(eventId: string, guestId: string) {
    return await prisma.eventGuest.update({
      where: { eventId_guestId: { eventId, guestId } },
      data: { confirmed: true }
    })
  }
}
