import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/helpers';

export class UpdateUserRoleDto {
  @ApiProperty()
  role: UserType;
}
