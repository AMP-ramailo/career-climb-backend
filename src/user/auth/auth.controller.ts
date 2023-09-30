// auth.controller.ts
import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.services';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req,@Res() rsp) {
    return this.authService.login(req, rsp);
  }
}
