import { Router } from 'express'
import { GuestController } from '../controllers/GuestController'

export class GuestRoutes {
  private router: Router
  private eventController: GuestController

  constructor() {
    this.router = Router()
    this.eventController = new GuestController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      this.eventController.getAllGuests.bind(this.eventController)
    )

    this.router.get(
      '/:id',
      this.eventController.getGuestById.bind(this.eventController)
    )

    this.router.post(
      '/',
      this.eventController.createGuest.bind(this.eventController)
    )

    this.router.put(
      '/:id',
      this.eventController.updateGuest.bind(this.eventController)
    )

    this.router.delete(
      '/:id',
      this.eventController.deleteGuest.bind(this.eventController)
    )

    this.router.post(
      '/:guestId/events/:eventId',
      this.eventController.inviteGuestToEvent.bind(this.eventController)
    )

    this.router.patch(
      '/:guestId/events/:eventId/confirm',
      this.eventController.confirmGuest.bind(this.eventController)
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
