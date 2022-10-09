import { bootstrap } from '@context/container';
import { databaseModule } from '@infrastructure/data-source/database-module';
import { server } from '@infrastructure/server';

const startup = async (): Promise<void> => {
  await bootstrap([server, databaseModule]);
};

export { startup };
