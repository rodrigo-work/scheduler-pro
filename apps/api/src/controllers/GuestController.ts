import { Request, Response } from 'express'
import { GuestService } from '../services/GuestService'
import { AbstractController } from './AbstractController'

export class GuestController extends AbstractController {
  private readonly guestService: GuestService

  constructor() {
    super()
    this.guestService = new GuestService()
  }

  async getAllGuests(req: Request, res: Response) {
    const guests = await this.guestService.getAllGuests()
    res.json(guests)
  }

  async getGuestById(req: Request, res: Response) {
    const guest = await this.guestService.getGuestById(req.params.id)
    res.json(guest)
  }

  async createGuest(req: Request, res: Response) {
    const guest = await this.guestService.createGuest(req.body.email)
    res.status(201).json(guest)
  }

  async updateGuest(req: Request, res: Response) {
    const guest = await this.guestService.updateGuest(
      req.params.id,
      req.body.email
    )
    res.json(guest)
  }

  async deleteGuest(req: Request, res: Response) {
    await this.guestService.deleteGuest(req.params.id)
    res.json({ message: 'Guest deleted successfully' })
  }

  async inviteGuestToEvent(req: Request, res: Response) {
    const { guestId, eventId } = req.params
    const relation = await this.guestService.inviteGuestToEvent(
      guestId,
      eventId
    )
    res.json(relation)
  }

  async confirmGuest(req: Request, res: Response) {
    const { guestId, eventId } = req.params
    const relation = await this.guestService.confirmGuest(eventId, guestId)
    res.json(relation)
  }
}
