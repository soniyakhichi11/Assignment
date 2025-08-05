import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({summary:'Register a new user'})
  @ApiBody({type:CreateUserDto})
  @ApiResponse({
    status:201,
    description:'Register a new user',
    type:User
  })
  register(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }

  @Post('validate')
  @ApiOperation({summary:'Validate JWT token and retun user info'})
  @ApiBody({type:ValidateTokenDto})
  @ApiResponse({status:200,
    description:'Token is valid'})
    @ApiResponse({status:401,
    description:'Token is not valid'})
  async validate(@Body() body: ValidateTokenDto) {
    const payload = this.jwtService.verify(body.token);
    const user = await this.userService.findById(payload.id);
    return user;
  }
  


@Get('student/:userId')
@ApiOperation({ summary: 'Get student by userId' })
@ApiResponse({ status: 200, description: 'Student found', type: User })
@ApiResponse({ status: 404, description: 'Student not found' })
async getStudentByUserId(@Param('userId',ParseIntPipe) userId: number) {
  const user = await this.userService.findByUserId(userId);
  if (!user || user.role !== 'student') {
    throw new NotFoundException('Student not found');
  }
  return user;
}



}