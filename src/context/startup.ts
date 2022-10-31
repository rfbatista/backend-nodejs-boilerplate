import { bootstrap } from '@context/container';
import { databaseModule } from '@infrastructure/data_source';
import iamModule from "@modules/iam"
import { server } from '@infrastructure/server';

const startup = async (): Promise<void> => {
  await bootstrap([
    server,
    iamModule,
    databaseModule,
  ]);
};

export { startup };
