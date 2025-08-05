import { Controller, Post, Get, Param, Body, Delete, Put, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { ResultService } from './result.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateResultDto } from './dto/create-result.dto';
import { UserRole } from 'src/common/enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('result')
@ApiBearerAuth()
@Controller('result')
@UseGuards(JwtAuthGuard)
export class ResultController {
  constructor(private readonly service: ResultService) {}

    @Post()
    @ApiOperation({summary:'create a new result (moderator only)'})
    @ApiBody({type:CreateResultDto})
    @ApiResponse({
      status:201,
      description:'Result created successfully'
    })
    @ApiResponse({status:403,
      description:'Only moderators can create results'
    })
  create(@Req() req, @Body() body:CreateResultDto) {
    if (req.user.role !== UserRole.MODERATOR) {
      throw new ForbiddenException('Only moderators can create results');
    }
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({summary:'only moderators can view all resuls'})
  @ApiResponse({status:200,
    description:'List of all results'
  })
   @ApiResponse({status:403,
    description:'Only moderators can view all results'
  })
  findAll(@Req() req) {
    if (req.user.role !== UserRole.MODERATOR) {
      throw new ForbiddenException('Only moderators can view all results');
    }
    return this.service.findAll();
  }

  @Get(':studentId')
    @ApiOperation({summary:'Get result by student ID (moderator or student)'})
    @ApiParam({name:'studentId', type:Number})
  @ApiResponse({status:200,
    description:'Result found'
  })
   @ApiResponse({status:403,
    description:'Access denied'
  })
  findByStudent(@Param('studentId') id: string, @Req() req) {
    if (req.user.role !== UserRole.MODERATOR && +id !== req.user.id) {
      throw new ForbiddenException('Access denied');
    }
    return this.service.findByStudent(+id);
  }

    @Put(':id')

@ApiOperation({ summary: 'Update a result (moderators only)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Result updated successfully' })
  @ApiResponse({ status: 403, description: 'Only moderators can update results' })

  update(@Param('id') id: string, @Body() dto: any, @Req() req) {
    if (req.user.role !== UserRole.MODERATOR) {
      throw new ForbiddenException('Only moderators can update results');
    }
    return this.service.update(+id, dto);
  }

  @Delete(':id')

  @ApiOperation({ summary: 'Delete a result (moderators only)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Result deleted successfully' })
  @ApiResponse({ status: 403, description: 'Only moderators can delete results' })

  remove(@Param('id') id: string, @Req() req) {
    if (req.user.role !== UserRole.MODERATOR) {
      throw new ForbiddenException('Only moderators can delete results');
    }
    return this.service.delete(+id);
  }
}
