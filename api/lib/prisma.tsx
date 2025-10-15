import { PrismaClient } from "@prisma/client";
// Use globalThis to handle hot-reloading in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma; // Store Prisma client globally only in development mode
}
