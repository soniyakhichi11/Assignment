import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Injectable, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { Channel } from "amqp-connection-manager";
import { ResultDto } from "src/notification/dto/result.dto";
import { NotificationService } from "src/notification/notification.service";

@Injectable()
export class ResultListnerService{
    private readonly logger = new Logger(ResultListnerService.name);
    constructor(private readonly notificationService:NotificationService){
      console.log('Resultlistner service initialized')
    }

    @RabbitSubscribe({
          exchange:'queue_exchange',
          routingKey:'result_created',
          queue:'result_queue'
    })
    async handleResultCreated({data}:{data:ResultDto}){
      console.log("received result created event");

        this.logger.log(`Received result_created event: ${JSON.stringify(data)}`);

        try {

      if (!data || !data.studentId) {
      this.logger.error('Invalid payload: studentId is missing');
      return;
    }

      await this.notificationService.sendResultEmail(data);

        } catch (error) {
            
this.logger.error(`Error processing result_created event: ${error.message}`, error.stack);

        }
    }
}
