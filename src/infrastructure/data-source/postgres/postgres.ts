import { config } from '@infrastructure/config';
import { DataSource } from 'typeorm';

const postgres = new DataSource({
  type: 'postgres',
  host: config.dataSource.postgres.host,
  port: config.dataSource.postgres.port,
  database: config.dataSource.postgres.database,
  password: config.dataSource.postgres.password,
  username: config.dataSource.postgres.user,
  synchronize: config.env === 'local' ? true : false,
  logging: false,
  migrations: ['migration/**/*.ts'],
});

export { postgres };
