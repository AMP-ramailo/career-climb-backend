import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('interviewer-availability')
@Controller('interviewer-availability')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  //add decorator to get the user detail
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    // createScheduleDto.interviewer_id=user.id
    return await this.scheduleService.create(createScheduleDto);
  }

  @Get('get-all-schedule/:interviewer_id')
  async findAll(@Param() interviewer_id: number) {
    return await this.scheduleService.findAll(interviewer_id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.scheduleService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.scheduleService.remove(+id);
  }
}
