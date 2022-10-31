import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export default class Prisma extends PrismaClient {}
