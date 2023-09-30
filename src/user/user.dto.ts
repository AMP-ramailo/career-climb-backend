import { UserType } from 'src/helpers';
export class UserDto {
    id: number;
    name: string;
    email: string;
    image_url: string;
    role: UserType;
  }