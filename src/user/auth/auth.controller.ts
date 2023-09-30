// auth.controller.ts
import { Controller, Get, Res, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.services';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Request() req, @Res() res: Response) {
    const user = req.user;
    console.log('suer', user);
    const token = await this.authService.login(req, res);
    console.log(token);
    return { user, ...token };
  }
}
