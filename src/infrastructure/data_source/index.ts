import { makeModule } from '@context/container';
import { PrismaClient } from '@prisma/client';

const databaseModule = makeModule('database', async ({ onDisposing }) => {
  const prisma = new PrismaClient();
  onDisposing(() => prisma.$disconnect());
});

export { databaseModule };
