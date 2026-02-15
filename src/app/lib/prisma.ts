import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import config from "../config"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const connectionString = (config.database_url as string) ?? ""
const adapter = new PrismaPg({ connectionString })

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: config.node_env === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (config.node_env !== "production") globalForPrisma.prisma = prisma

export default prisma
