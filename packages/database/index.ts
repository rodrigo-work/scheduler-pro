import { keys } from '@repo/database/keys'
import { PrismaClient } from './generated/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: keys().DATABASE_URL
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export * from './generated/client'
