import * as dotenv from 'dotenv';
import { addAliases } from 'module-alias';
import { resolve } from 'path';

dotenv.config();

const environmentLocal = process.env.NODE_ENV === 'local';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
addAliases({
  '@context': resolve(environmentLocal ? 'src/context' : 'dist/context'),
  '@modules': resolve(environmentLocal ? 'src/modules' : 'dist/modules'),
  '@shared': resolve(environmentLocal ? 'src/shared' : 'dist/shared'),
  '@infrastructure': resolve(environmentLocal ? 'src/infrastructure' : 'dist/infrastructure'),
});
