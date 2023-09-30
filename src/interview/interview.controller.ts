import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApplicantResponse, InterviewerResponse } from './interview.response';

@ApiTags('interview')
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  create(@Body() createInterviewDto: CreateInterviewDto) {
    return this.interviewService.create(createInterviewDto);
  }

  @Get('interviewer-interviews/:interviewer_id')
  @ApiParam({ name: 'interviewer_id', required: true })
  @ApiOkResponse({ type: [InterviewerResponse] })
  getInterviewerInterview(interviewer_id: string) {
    return this.interviewService.getInterviewerInterview(+interviewer_id);
  }

  @Get('applicant_interviewer/:applicant_id')
  @ApiParam({ name: 'interviewer_id', required: true })
  @ApiOkResponse({ type: [ApplicantResponse] })
  getApplicantInterview(@Param('applicant_id') applicant_id: string) {
    return this.interviewService.getApplicantInterview(+applicant_id);
  }
}
