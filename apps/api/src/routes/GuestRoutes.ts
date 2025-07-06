import { Router } from 'express'
import { GuestController } from '../controllers/GuestController'
import { validate } from '../middlewares/validate'
import { createGuestSchema } from '../schemas/guest.schema'

export class GuestRoutes {
  private router: Router
  private eventController: GuestController

  constructor() {
    this.router = Router()
    this.eventController = new GuestController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /guests:
     *   post:
     *     tags:
     *       - Guest
     *     summary: Add a new pet to the store
     *     description: ""
     *     operationId: create-guest
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *             properties:
     *               email:
     *                 type: string
     *                 example: "me+fake@rodrigo3d.com"
     *     responses:
     *       200:
     *         description: Requisição bem-sucedida
     *       201:
     *         description: Convidado criado com sucesso
     *       400:
     *         description: Dados inválidos
     *       404:
     *         description: Convidado não encontrado
     *       500:
     *         description: Erro interno do servidor
     */
    this.router.post(
      '/',
      validate(createGuestSchema),
      this.eventController.createGuest.bind(this.eventController)
    )
    /**
     * swagger
     * /guests{id|email}:
     *   get:
     *     tags:
     *       - Guest
     *     summary: Finds Pets by status
     *     description: Multiple status values can be provided with comma separated strings
     *     operationId: getGuestById
     *     parameters:
     *       - name: id ou email
     *         in: query
     *         description: ID ou email
     *         required: false
     *         schema:
     *           type: string
     *           example: 10
     *     responses:
     *       200:
     *         description: successful operation
     *       400:
     *         description: Invalid status value
     */
    this.router.get(
      '/:id',
      this.eventController.getGuestById.bind(this.eventController)
    )

    this.router.put(
      '/:id',
      this.eventController.updateGuest.bind(this.eventController)
    )
    /**
     * @swagger
     * /guests/{petId}:
     *   delete:
     *     tags:
     *       - Guest
     *     summary: Deletes a pet
     *     description: ""
     *     operationId: deletePet
     *     parameters:
     *       - name: petId
     *         in: path
     *         description: Pet id to delete
     *         required: true
     *         schema:
     *           type: string
     *           example: me+fake@rodrigo3d.com
     *     responses:
     *       200:
     *         description: Requisição bem-sucedida
     *       201:
     *         description: Convidado criado com sucesso
     *       400:
     *         description: Dados inválidos
     *       404:
     *         description: Convidado não encontrado
     *       500:
     *         description: Erro interno do servidor
     */
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
