import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from './notification.service';

@Module({
    imports:[ConfigModule.forRoot()],
    exports:[NotificationService],
    providers:[NotificationService]
})
export class NotificationModule {}
