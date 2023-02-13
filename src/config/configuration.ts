import { join } from 'path';

// config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    //host: 'localhost',
    //socketPath: '/tmp/mysql.sock',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nest',
    entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
    synchronize: true, // 设置 synchronize: true 不能被用于生产环境，否则您可能会丢失生产环境数据
  },
});
