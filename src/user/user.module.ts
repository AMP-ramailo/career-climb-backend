import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[AuthModule],
  providers:[UsersService]
})
export class UserModule {}
