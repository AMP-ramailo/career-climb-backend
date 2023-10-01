import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { UserType } from 'src/helpers/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(userId: number): Promise<User> {
    return await this.usersService.findById(userId);
  }
  async invalidateToken(accessToken: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verifyAsync(accessToken);

      // Check if the token has expired
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTimeInSeconds) {
        throw new UnauthorizedException('Token has expired');
      }

      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async login(req, rsp): Promise<any> {
    try {
      const userData = await this.usersService.findByEmail(req.user.email);
      if (userData) {
        const payload = { sub: userData.id };
        const accessToken = this.jwtService.sign(payload);
        console.log({ access_token: accessToken });
        rsp.redirect(
          `http://localhost:3000/auth/google/success?access_token=${accessToken}`,
        );
        return { user: userData, access_token: accessToken };
      } else {
        const user: User = new User();
        user.email = req.user.email;
        user.name = req.user.firstName + ' ' + req.user.lastName;
        user.image_url = req.user.picture;
        user.role = UserType.USER;
        console.log(user);
        const userDbResponse = await this.usersService.createUser(
          user.dataValues,
        );

        const payload = { sub: userDbResponse.id };
        const accessToken = this.jwtService.sign(payload);

        rsp.redirect(
          `http://localhost:3000/auth/google/success?access_token=${accessToken}`,
        );

        return { user: userDbResponse, access_token: accessToken };
      }
    } catch (error) {
      // Handle any errors that occur during the process
      throw new Error('Login failed'); // You can customize the error handling as needed
    }
  }
}
