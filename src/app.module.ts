import { Module, MiddlewareConsumer, Dependencies } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HelloModule } from './modules/hello/hello.module';
import { ExceptionModule } from './modules/exception/exception.module';
import { DataSource } from 'typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/users.entity';
import { PhotoModule } from './modules/photo/photo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';

@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PhotoModule,
    UsersModule,
    // HelloModule,
    // ExceptionModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 为 hello 路由添加中间件
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude({ path: 'hello', method: RequestMethod.GET })
    //   .forRoutes('hello');

    consumer.apply(LoggerMiddleware).forRoutes('hello');
  }
}
