import { join } from 'path';

// config/configuration.ts
export default () => ({
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [join(__dirname, '../', 'dist/src/**/*.entity.{ts,js}')],
    autoLoadEntities: true,
    synchronize: true,
  },
});
