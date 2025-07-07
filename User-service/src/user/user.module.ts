import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET  || 'secretkey123' , // Make sure it's defined
      signOptions: { expiresIn: '1h' },
    }),
],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService,JwtModule],
})
export class UserModule {}
