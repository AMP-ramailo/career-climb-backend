// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.services';
import {GoogleStrategy} from './google.strategy';
import {AuthController} from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers:[AuthController],
  providers: [AuthService,GoogleStrategy],
})
export class AuthModule {}
