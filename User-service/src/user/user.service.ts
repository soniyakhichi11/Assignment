import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async register(data: any) {
    const hash = await bcrypt.hash(data.password, 10);
    const user = this.repo.create({ ...data, password: hash });
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findByUserId(userId: number) {
  return this.repo.findOneBy({ userId });
}

}
