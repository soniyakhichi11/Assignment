// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { NotificationService } from './notification/notification.service';
// import { NotificationModule } from './notification/notification.module';
// import { ResultListnerModule } from './listner/resultlistner.module';
// import { ResultListnerService } from './listner/resultlistener.service';

// @Module({
//   imports: [NotificationModule,ResultListnerModule],
//   controllers: [AppController],
//   providers: [AppService, NotificationService],
// })
// export class AppModule {

// constructor(private readonly listener: ResultListnerService) {
//     console.log('✅ AppModule initialized with ResultListnerService');
//   }

// }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { ResultListnerModule } from './listner/resultlistner.module';
import { RabbitMQModule, RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NotificationModule,
    ResultListnerModule,
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<RabbitMQConfig> => {
        const uri = configService.get<string>('RABBITMQ_URI');

        if (!uri) {
          throw new Error('RABBITMQ_URI is not defined in environment variables');
        }

        return {
          uri,
          exchanges: [
            {
              name: 'queue_exchange',
              type: 'direct',
            },
          ],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
