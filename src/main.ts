import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as donenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SkillService } from './skill/skill.service';
import { Interviewer } from './interviewer/entities/interviewer.entity';
import { InterviewerService } from './interviewer/interviewer.service';
import { interviewerSeed } from './interviewer/interviewer.seed';
donenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  const config = new DocumentBuilder()
    .setTitle('Career Climb')
    .setDescription('The Career Climb API description')
    .setVersion('1.0')
    .addTag('CareerClimb')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const seedSkill = app.get(SkillService);
  await seedSkill.seedData();
  const checkInterviewer = await app
    .get(InterviewerService)
    .countInterviewers();
  if (checkInterviewer < 10) await interviewerSeed();
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.APP_PORT || 8080).then(() => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
    console.log(
      `Documentation available at http://localhost:${
        process.env.PORT_NUMBER || 8080
      }/api`,
    );
  });
}
bootstrap();
