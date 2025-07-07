import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { Result } from './result.entity';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';



@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  providers: [ResultService, RabbitmqService, JwtAuthGuard],
  controllers: [ResultController],
})
export class ResultModule {}