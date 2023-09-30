import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async googleLogin(req, res) {
    // use other id generator
    if (!req.user) {
      return 'No user from google';
    }

    // save this data to database
    // return user_id

    const user_id = new Date().getTime();
    console.log('req', req.user);
    // add this to the database

    // redirect to frontend
    res.redirect(`http://localhost:3000/auth/google/success/${user_id}`);
  }
}
