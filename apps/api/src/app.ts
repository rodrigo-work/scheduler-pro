import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { type Express } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'
import { EventRoutes } from './routes/EventRoutes'
import { GroupRoutes } from './routes/GroupRoutes'
import { GuestRoutes } from './routes/GuestRoutes'
import { HealthRoutes } from './routes/HealthRoutes'

export class Application {
  private app: Express
  private healthRoutes: HealthRoutes
  private groupRoutes: GroupRoutes
  private eventRoutes: EventRoutes
  private guestRoutes: GuestRoutes

  constructor() {
    this.app = express()
    this.healthRoutes = new HealthRoutes()
    this.groupRoutes = new GroupRoutes()
    this.eventRoutes = new EventRoutes()
    this.guestRoutes = new GuestRoutes()
  }

  public init(): Express {
    const swaggerDocument = yaml.load('./src/swagger.yaml')

    this.app
      .disable('x-powered-by')
      .use(morgan('dev'))
      .use(urlencoded({ extended: true }))
      .use(json())
      .use(cors())

    this.app.use('/', this.healthRoutes.getRouter())
    this.app.use('/groups', this.groupRoutes.getRouter())
    this.app.use('/api/events', this.eventRoutes.getRouter())
    this.app.use('/api/guests', this.guestRoutes.getRouter())

    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    this.app.use((req, res, next) => {
      res.status(404).json({ status: 404, message: 'Not found' })
      next()
    })

    this.app.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(500).send({ status: 500, message: 'Internal server error' })
      next()
    })

    return this.app
  }
}
