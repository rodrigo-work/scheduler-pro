import { Prisma } from '@repo/database/generated'

import { NextFunction, Request, Response } from 'express'
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  PersonalError
} from '../utils/errors/customErrors'

export function prismaErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': {
        const fields = (err.meta?.target as string[])?.join(', ') || 'campo(s)'
        return next(new ConflictError(`Já existe um registro com ${fields}`))
      }

      case 'P2025': {
        return next(new NotFoundError('Registro não encontrado.'))
      }

      case 'P2003': {
        return next(new BadRequestError('Violação de chave estrangeira.'))
      }

      default: {
        return next(new PersonalError(`Erro do Prisma: ${err.message}`, 500))
      }
    }
  }

  next(err) // Se não for erro do Prisma, deixa seguir
}
