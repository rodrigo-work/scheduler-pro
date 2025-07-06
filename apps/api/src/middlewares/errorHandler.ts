import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err instanceof ApiError ? err.statusCode : 500

  console.error(err) // Substitua por um logger (como winston/pino) em produção

  res.status(statusCode).json({
    error: {
      message: err.message || 'Erro interno no servidor',
      status: statusCode,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  })
}
