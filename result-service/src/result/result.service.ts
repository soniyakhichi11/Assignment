import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Result } from './result.entity';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';



@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result) private repo: Repository<Result>,
    private rabbit: RabbitmqService,
  ) {}

  async create(data: any) {
    const res = this.repo.create(data);
    const saved = await this.repo.save(res);
    await this.rabbit.sendResultNotification(saved);
    return saved;
  }

  findByStudent(id: number) {
    return this.repo.find({ where: { studentId: id } });
  }

  findAll() {
    return this.repo.find();
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
