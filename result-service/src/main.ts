import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
   await app.listen(3002);
  console.log('✅ Result Service running at http://localhost:3002');
}
bootstrap();
