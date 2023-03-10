import { Module } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { ExceptionController } from './exception.controller';

@Module({
  imports: [],
  controllers: [ExceptionController],
  providers: [ExceptionService],
})
export class ExceptionModule {}
