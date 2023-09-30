import { ApiProperty } from '@nestjs/swagger';

export class PersonalProfileResponse {
  @ApiProperty()
  dob: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phone: string;
}

export class SocialProfileResponse {
  @ApiProperty()
  linkedin_url: string;
  @ApiProperty()
  github_url: string;
}
