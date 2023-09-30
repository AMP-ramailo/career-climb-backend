import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InterviewerService } from './interviewer.service';
import { CreateInterviewerDto } from './dto/create-interviewer.dto';
import { UpdateInterviewerDto } from './dto/update-interviewer.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { InterviewerProfileResponse } from './interviewer.response';

@ApiTags('interviewer-profile')
@Controller('interviewer-profile')
export class InterviewerController {
  constructor(private readonly interviewerService: InterviewerService) {}

  @Post()
  async create(@Body() createInterviewerDto: CreateInterviewerDto) {
    return this.interviewerService.create(createInterviewerDto);
  }

  @Get('get-profile/:user_id')
  @ApiParam({ name: 'user_id', required: true })
  @ApiOkResponse({ type: CreateInterviewerDto })
  async getProfile(@Param('user_id') user_id: string) {
    return this.interviewerService.getProfile(+user_id);
  }

  @Get('get-personal/:user_id')
  @ApiParam({ name: 'user_id', required: true })
  @ApiOkResponse({ type: InterviewerProfileResponse })
  async getPersonal(@Param('user_id') user_id: string) {
    return this.interviewerService.getPersonalProfile(+user_id);
  }

  @Patch(':user_id')
  async update(
    @Param('user_id') user_id: string,
    @Body() updateInterviewerDto: UpdateInterviewerDto,
  ) {
    return this.interviewerService.update(+user_id, updateInterviewerDto);
  }
}
