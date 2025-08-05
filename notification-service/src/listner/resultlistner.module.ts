import { Module } from "@nestjs/common";
import { NotificationModule } from "src/notification/notification.module";
import { ResultListnerService } from "./resultlistener.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports:[
        NotificationModule,
        ClientsModule.register([
            {
                name:'RESULT_SERVICE',
                transport:Transport.RMQ,
                options:{
                    urls:['amqp://guest:guest@127.0.0.1:5672'],
                    queue:'result_queue',
                    queueOptions:{durable:true},
                    exchange:'queue_exchange',
                    exchangeType:'direct',
                    routingKey:'result_created',
                }

            }
        ])
    ],
    providers:[ResultListnerService],
    exports:[ResultListnerService]

})
export class ResultListnerModule{}