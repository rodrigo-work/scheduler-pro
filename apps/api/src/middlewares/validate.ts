import { NextFunction, Request, Response } from 'express'
import { ZodObject, ZodRawShape } from 'zod'
import { PersonalError } from '../utils/errors/customErrors'
import { formatZodError } from '../utils/format'

export const validate =
  (schema: ZodObject<ZodRawShape>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params
    })

    if (!result.success) {
      const message = formatZodError(result.error)
      return next(new PersonalError(message, 493))
    }

    next()
  }
