import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './use.controller';
import { JwtStrategy } from './jwt.strategy';
import { ApplicantModule } from 'src/applicant/applicant.module';
import { InterviewerModule } from 'src/interviewer/interviewer.module';
import { ApplicantService } from 'src/applicant/applicant.service';
import { InterviewerService } from 'src/interviewer/interviewer.service';

@Module({
  imports:[AuthModule,
    ApplicantModule,
    InterviewerModule,
    JwtModule.register({
    secret: `${process.env.TOKEN_SECRET}`,
    
    signOptions: { expiresIn: '5h' },
  }),],
  controllers:[UserController],
  providers:[UsersService,JwtStrategy,ApplicantService,InterviewerService]
})
export class UserModule {}
