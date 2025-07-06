import { z } from 'zod'

export const createGuestSchema = z.object({
  body: z.object({
    email: z.email({
      message: 'Email inválido'
    })
  })
})
