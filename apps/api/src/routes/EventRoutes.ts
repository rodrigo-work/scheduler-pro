import { Router } from 'express'
import { EventController } from '../controllers/EventController'

export class EventRoutes {
  private router: Router
  private eventController: EventController

  constructor() {
    this.router = Router()
    this.eventController = new EventController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      this.eventController.createEvent.bind(this.eventController)
    )

    this.router.get(
      '/',
      this.eventController.getAllEvents.bind(this.eventController)
    )

    this.router.get(
      '/:id',
      this.eventController.getEventById.bind(this.eventController)
    )

    this.router.put(
      '/:id',
      this.eventController.updateEvent.bind(this.eventController)
    )

    this.router.delete(
      '/:id',
      this.eventController.deleteEvent.bind(this.eventController)
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
