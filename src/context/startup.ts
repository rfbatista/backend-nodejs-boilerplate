import { bootstrap } from '@context/container';
import { databaseModule } from '@infrastructure/data_source';
import iamModule from "@modules/iam"
import { server } from '@infrastructure/server';
import { healthModule } from '@infrastructure/health';

const startup = async (): Promise<void> => {
  await bootstrap([
    server,
    healthModule,
    iamModule,
    databaseModule,
  ]);
};

export { startup };
