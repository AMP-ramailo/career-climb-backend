import { Module } from '@nestjs/common';
import { InterviewerService } from './interviewer.service';
import { InterviewerController } from './interviewer.controller';

@Module({
  controllers: [InterviewerController],
  providers: [InterviewerService],
})
export class InterviewerModule {}
