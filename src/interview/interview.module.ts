import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';

import { InterviewerService } from 'src/interviewer/interviewer.service';
import { ApplicantService } from 'src/applicant/applicant.service';
@Module({
  controllers: [InterviewController],
  providers: [InterviewService, InterviewerService, ApplicantService],
})
export class InterviewModule {}
