import { PrismaClient } from '@prisma/client';
import { env } from './env.js';

// Prevent multiple PrismaClient instances during dev hot-reload
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: env.isProduction ? ['error', 'warn'] : ['query', 'error', 'warn'],
  });

if (!env.isProduction) {
  globalForPrisma.prisma = prisma;
}
