import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

let prisma: PrismaClient;

if (process.env.VERCEL === '1') {
  const dbPath = '/tmp/dev.db';
  const srcPath = path.join(process.cwd(), 'prisma', 'dev.db');

  if (!fs.existsSync(dbPath)) {
    try {
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, dbPath);
        console.log('Successfully copied SQLite database to /tmp/dev.db');
      } else {
        console.error('Source database not found at:', srcPath);
      }
    } catch (err) {
      console.error('Failed to copy database to /tmp/dev.db:', err);
    }
  }

  prisma = new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });
} else {
  const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
  prisma = globalForPrisma.prisma || new PrismaClient();
  globalForPrisma.prisma = prisma;
}

export { prisma };
