
import { Injectable } from '@nestjs/common';
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
  async validateUser(username: string, password: string): Promise<any> {
    // Implement your own user validation logic here (e.g., with Sequelize).
  }

  async findOrCreateGoogleUser(profile: any): Promise<any> {
    // Implement logic to find or create a user based on the Google profile.
    // Save the user to your database (with Sequelize).
  }

  async login(user: any, res,req): Promise<any> {

    this.usersService.findByEmail(user.email).then((userData)=>{
      if (!userData)
      {  var userValue = new User()
        userValue.email = user.email;
        userValue.name = user.firstName + " " + user.lastName ;
        userValue.image_url = user.picture;
        userValue.role = UserType.USER
        var userDbResponse = this.usersService.createUser(userValue)
        const payload = { sub: user.id };
        var access_token = this.jwtService.sign(payload);
        //res.redirect(`http://localhost:3000/auth/google/success/user=${userDbResponse}&access_token=${access_token}`);
        // Customize the payload as needed.
        return {
          access_token: access_token,
        };
      }else{
        const payload = { sub: user.id };
        var access_token = this.jwtService.sign(payload);
       // res.redirect(`http://localhost:3000/auth/google/success/user=${userDbResponse}&access_token=${access_token}`);
        // Customize the payload as needed.
        return {
          access_token: access_token,
        };
      }
    })
    
  }
}