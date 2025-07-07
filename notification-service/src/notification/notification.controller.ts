import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  @EventPattern('result_created')
  handleResultCreated(@Payload() data: any) {
    console.log('📢 Notification Received:', data);
    // Extend logic here (send email/SMS/etc)
  }
}
