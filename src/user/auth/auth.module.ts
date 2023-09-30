// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.services';
import {GoogleStrategy} from './google.strategy';
import {AuthController} from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user.entity';
import { DatabaseModule } from 'src/database/database.module';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: `${process.env.TOKEN_SECRET}`,
      signOptions: { expiresIn: '1h' },
    }),
  
  ],
  controllers:[AuthController],
  providers: [AuthService,UsersService,GoogleStrategy],
})
export class AuthModule {}
