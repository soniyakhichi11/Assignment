import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  register(@Body() body: { name: string; email: string; password: string; role: string }) {
    return this.userService.register(body);
  }

  @Post('validate')
  async validate(@Body() body: { token: string }) {
    const payload = this.jwtService.verify(body.token);
    const user = await this.userService.findById(payload.id);
    return user;
  }
}