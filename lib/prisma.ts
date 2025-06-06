import { PrismaClient } from "@/app/generated/prisma"
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof prismaClientWithExtensions> | undefined
}

const prismaClientWithExtensions = () => new PrismaClient().$extends(withAccelerate())

export const prisma =
    globalForPrisma.prisma ??
    prismaClientWithExtensions()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 