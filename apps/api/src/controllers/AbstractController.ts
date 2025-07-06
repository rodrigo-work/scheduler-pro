/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

function getMessage(code: string | number): string {
  const messages: Record<string | number, string> = {
    200: 'Sucesso',
    400: 'Requisição inválida',
    401: 'Não autorizado',
    404: 'Não encontrado',
    P2002: 'Unique constraint failed on the {constraint}',
    USR002: 'Senha incorreta'
  }

  return messages[code] || 'Unexpected error occurred'
}

export abstract class AbstractController {
  protected handleResponse(res: Response, error: unknown): void {
    // console.log(JSON.stringify({ error: error as Error }, null, 2))

    const data = {
      status: 400,
      name: (error as any)?.name,
      message: getMessage((error as any)?.code),
      prisma: error
    }

    // console.log(JSON.stringify({ error: error as Error }, null, 2))

    if (error instanceof Error) {
      res.status(data.status).json(data)
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' })
    }
  }

  protected handleResponseError(res: Response, error: unknown): void {
    // console.log(JSON.stringify({ error: error as Error }, null, 2))

    const data = {
      status: 400,
      name: (error as any)?.name,
      message: getMessage((error as any)?.code),
      prisma: error
    }

    // console.log(JSON.stringify({ error: error as Error }, null, 2))

    if (error instanceof Error) {
      res.status(data.status).json(data)
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' })
    }
  }
}
