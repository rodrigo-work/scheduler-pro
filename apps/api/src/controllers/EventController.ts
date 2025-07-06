import { Request, Response } from 'express'
import { EventService } from '../services/EventService'
import { AbstractController } from './AbstractController'

export class EventController extends AbstractController {
  private readonly eventService: EventService

  constructor() {
    super()
    this.eventService = new EventService()
  }

  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = await this.eventService.createEvent(req.body)
      res.status(201).json(event)
    } catch (err) {
      //  this.handleError(res, err)
      res.status(400).json({ error: err as Error })
    }
  }

  async getAllEvents(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const result = await this.eventService.getAllEvents(page, limit)
    res.json(result)
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    const event = await this.eventService.getEventById(req.params.id)
    // if (!event) res.status(404).json({ error: 'Evento não encontrado' })
    res.json({ data: event })
  }

  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.eventService.updateEvent(req.body.id, req.body)
      res.json(updated)
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }

  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      await this.eventService.deleteEvent(req.params.id)
      res.json({ message: 'Evento deletado com sucesso' })
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }
}
