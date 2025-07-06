import { Request, Response } from 'express'
import { GuestService } from '../services/GuestService'
import { ResponseError } from '../utils/errors/customErrors'
import { AbstractController } from './AbstractController'

export class GuestController extends AbstractController {
  private readonly guestService: GuestService

  constructor() {
    super()
    this.guestService = new GuestService()
  }

  async createGuest(req: Request, res: Response): Promise<void> {
    try {
      const guest = await this.guestService.createGuest(req.body.email)
      res.status(201).json({ data: guest })
    } catch (error) {
      // res.json(error)

      throw new ResponseError(JSON.stringify(error), 498)

      //  res.json(error)

      // this.handleError(res, error)
    }
  }

  async getAllGuests(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const result = await this.guestService.getAllGuests(page, limit)
    res.json(result)
  }

  async getGuestById(req: Request, res: Response): Promise<void> {
    const guest = await this.guestService.getGuestById(req.params.id)
    res.json(guest)
  }

  async updateGuest(req: Request, res: Response): Promise<void> {
    const guest = await this.guestService.updateGuest(
      req.params.id,
      req.body.email
    )
    res.json(guest)
  }

  async deleteGuest(req: Request, res: Response): Promise<void> {
    try {
      const guest = await this.guestService.deleteGuest(req.params.id)
      res.json({ message: 'Guest deleted successfully' })
    } catch (error) {
      res.json(error)
      // this.handleError(res, error)
    }
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
