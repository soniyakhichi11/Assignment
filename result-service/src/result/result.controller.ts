import { Controller, Post, Get, Param, Body, Delete, Put, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { ResultService } from './result.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';


@Controller('result')
@UseGuards(JwtAuthGuard)
export class ResultController {
  constructor(private readonly service: ResultService) {}

    @Post()
  create(@Req() req, @Body() dto: any) {
    if (req.user.role !== 'moderator') {
      throw new ForbiddenException('Only moderators can create results');
    }
    return this.service.create(dto);
  }

  @Get()
  findAll(@Req() req) {
    if (req.user.role !== 'moderator') {
      throw new ForbiddenException('Only moderators can view all results');
    }
    return this.service.findAll();
  }

  @Get(':studentId')
  findByStudent(@Param('studentId') id: string, @Req() req) {
    if (req.user.role !== 'moderator' && +id !== req.user.id) {
      throw new ForbiddenException('Access denied');
    }
    return this.service.findByStudent(+id);
  }

    @Put(':id')
  update(@Param('id') id: string, @Body() dto: any, @Req() req) {
    if (req.user.role !== 'moderator') {
      throw new ForbiddenException('Only moderators can update results');
    }
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    if (req.user.role !== 'moderator') {
      throw new ForbiddenException('Only moderators can delete results');
    }
    return this.service.delete(+id);
  }
}
