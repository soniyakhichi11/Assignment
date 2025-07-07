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
    queueOptions: { durable: false },
  },
} as ClientOptions);
  }

  async sendResultNotification(data: any) {
    return this.client.emit('result_created', data).toPromise();
  }
}
