import { makeModule } from '@context/container';
import { Container } from 'typedi';
import Prisma from './prisma';

const databaseModule = makeModule('database', async ({ onDisposing }) => {
  const prisma = Container.get(Prisma);
  onDisposing(() => prisma.$disconnect());
});

export { databaseModule };
