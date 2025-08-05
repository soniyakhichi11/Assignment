import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv'
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

dotenv.config()
async function bootstrap(){
  const app=await NestFactory.create(AppModule);
  const logger= new Logger('Bootstrap');
  logger.log('Notification-main service is starting...');
  await app.listen(3001);
  console.log('Notification-main service is listening...');
}

 

bootstrap();
