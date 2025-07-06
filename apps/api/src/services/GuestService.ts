import { prisma } from '@repo/database'
import { PaginationResult, Paginator } from '../utils/Pagination'
import { AbstractService } from './AbstractService'

export class GuestService extends AbstractService {
  constructor() {
    super()
  }

  async infoGuests() {
    const info = {
      url: 'qqqq'
    }
    return info
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
        orderBy: { updatedAt: 'asc' }
      }),
      prisma.guest.count()
    ])

    return Paginator.buildResult(data, total, page, limit)
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

  async createGuest(email: string) {
    return await prisma.guest.create({ data: { email } })
  }

  async updateGuest(id: string, email: string) {
    return await prisma.guest.update({
      where: { id },
      data: { email }
    })
  }

  async deleteGuest(id: string) {
    return await prisma.guest.delete({ where: { id } })
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
