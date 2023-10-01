import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateFeedbackInterviewerDto } from './dto/create-feedback-interviewer.dto';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('create-feedback-applicant')
  @ApiOkResponse({ type: CreateFeedbackDto })
  async feedBackForApplicant(@Body() createFeedbackDto: CreateFeedbackDto) {
    return await this.feedbackService.feedbackForApplicant(createFeedbackDto);
  }

  @Post('create-feedback-interviewer')
  @ApiOkResponse({ type: CreateFeedbackInterviewerDto })
  async feedBackForInterviewer(
    @Body() createFeedbackDto: CreateFeedbackInterviewerDto,
  ) {
    return await this.feedbackService.feedbackForInterviewer(createFeedbackDto);
  }

  @Get('all-interviewer-feedback/:interviewer_id')
  @ApiParam({ name: 'interviewer_id', required: true })
  @ApiOkResponse({ type: CreateFeedbackInterviewerDto })
  async findFeedbackInterviewer(
    @Param('interviewer_id') interviewer_id: string,
  ) {
    return await this.feedbackService.allFeedbackInterviewer(+interviewer_id);
  }

  @Get('all-applicant-feedback/:applicant_id')
  @ApiParam({ name: 'applicant_id', required: true })
  @ApiOkResponse({ type: CreateFeedbackDto })
  async findFeedback(@Param('applicant_id') applicant_id: string) {
    return await this.feedbackService.allFeedbackApplicant(+applicant_id);
  }
}
