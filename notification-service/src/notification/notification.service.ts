import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationService {
  @EventPattern('result_created')
  handleResultCreated(@Payload() data: any) {
    console.log('📢 Notification Received for Result:', data);
    // You can add SMS, email, or logs here
  }
}
