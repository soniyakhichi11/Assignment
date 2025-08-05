import { Injectable } from '@nestjs/common';
import { ClientOptions, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  private client: ClientProxy;

  constructor() {
   this.client = ClientProxyFactory.create({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URI],
    queue: 'result_queue',
    queueOptions: { durable: true },
    exchange:'queue_exchange',
    exchangeType:'direct',
     routingKey:'result_created',
  },
} as ClientOptions);
  }

  async sendResultNotification(data: any) {
    // const payload={
    //   pattern:'result_created',
    //   data
    // };
    console.log('Emitting result_created event:', data);
    this.client.emit('result_created', data);
  }
}
