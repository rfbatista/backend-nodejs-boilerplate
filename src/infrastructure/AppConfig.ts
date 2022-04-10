import { LoggerLevel } from './Logger';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppConfig = {
  http: {
    port: parseInt(process.env.PORT),
  },
  logger: {
    level: process.env.LOG_LEVEL ?? LoggerLevel.debug,
    hostname: {
      prefix: process.env.LOG_HOSTNAME_PREFIX,
    },
  },
};
