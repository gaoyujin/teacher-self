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
    ConfigModule.forRoot({
      //作用于全局
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
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
