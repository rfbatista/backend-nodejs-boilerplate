import { addAliases } from 'module-alias';
import { resolve } from 'path';

const environmentLocal = process.env.NODE_ENV === 'local';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
addAliases({
  '@di': resolve(environmentLocal ? 'src/di' : 'dist/di'),
  '@core': resolve(environmentLocal ? 'src/core' : 'dist/core'),
  '@infrastructure': resolve(environmentLocal ? 'src/infrastructure' : 'dist/infrastructure'),
  '@presentation': resolve(environmentLocal ? 'src/presentation' : 'dist/presentation')
});
