import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ApplicantModule } from './applicant/applicant.module';
import { InterviewerModule } from './interviewer/interviewer.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [DatabaseModule, UserModule, ScheduleModule, ApplicantModule, InterviewerModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
