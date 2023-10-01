import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import {
  BulkCreateScheduleDto,
  CreateScheduleDto,
} from './dto/create-schedule.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('interviewer-availability')
@Controller('interviewer-availability')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  //add decorator to get the user detail
  async bulkCreate(@Body() bulkCreateScheduleDto: BulkCreateScheduleDto) {
    // createScheduleDto.interviewer_id=user.id
    return await this.scheduleService.bulkCreate(bulkCreateScheduleDto);
  }

  @Get('get-all-schedule/:interviewer_id')
  @ApiParam({ name: 'interviewer_id', required: true })
  @ApiOkResponse({ type: CreateScheduleDto, isArray: true })
  async findAll(@Param('interviewer_id') interviewer_id: number) {
    console.log('interviewer_id', interviewer_id);
    return await this.scheduleService.findAll(interviewer_id);
  }

  @Get(':availability_id')
  @ApiParam({ name: 'availability_id', required: true })
  @ApiOkResponse({ type: CreateScheduleDto })
  async findOne(@Param('availability_id') availability_id: string) {
    return await this.scheduleService.findOne(+availability_id);
  }

  @Delete(':availability_id')
  @ApiParam({ name: 'availability_id', required: true })
  async remove(@Param('availability_id') availability_id: string) {
    return await this.scheduleService.remove(+availability_id);
  }
}
