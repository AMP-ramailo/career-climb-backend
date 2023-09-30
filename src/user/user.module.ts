import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './use.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[AuthModule,
    JwtModule.register({
    secret: `${process.env.TOKEN_SECRET}`,
    
    signOptions: { expiresIn: '1h' },
  }),],
  controllers:[UserController],
  providers:[UsersService,JwtStrategy]
})
export class UserModule {}
