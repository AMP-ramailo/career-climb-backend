
import { Injectable } from '@nestjs/common';
import { UsersService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { UserType } from 'src/helpers/constants';
import { error } from 'console';

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

  async login(req, rsp):Promise<any> {
    try {
    const userData = await this.usersService.findByEmail(req.user.email)
      if (userData)
      { 
        const payload = { sub: userData.id };
        var accessToken = this.jwtService.sign(payload);
        console.log({ access_token:accessToken});
       rsp.redirect(`http://localhost:3000/auth/google/success/user?access_token?${accessToken}`);
        return {user:userData, access_token:accessToken};
     
       
       
      }else{
        console.log("here");
        const user: User = new User();
        user.email = req.user.email;
        user.name = req.user.firstName + " " + req.user.lastName ;
        user.image_url = req.user.picture;
        user.role = UserType.INTERVIEWER;
        console.log(user)
        const userDbResponse = await this.usersService.createUser(user.dataValues);

          const payload = { sub: userDbResponse.id };
          var accessToken = this.jwtService.sign(payload);
      
          rsp.redirect(`http://localhost:3000/auth/google/success/access_token?${accessToken}`);
  
         return {user:userDbResponse, access_token:accessToken};
       
      }
 
   
   
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    throw new Error('Login failed'); // You can customize the error handling as needed
  }
    

  }
}