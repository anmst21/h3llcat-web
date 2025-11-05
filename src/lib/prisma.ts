// Node runtime only (don't import this in edge code)
import { PrismaClient } from "../../prisma/generated/prisma/client";
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? ["warn", "error"]
        : ["query", "info", "warn", "error"],
  });

// Avoid creating a new client on every HMR in dev
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
