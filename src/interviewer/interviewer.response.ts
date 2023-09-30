import { ApiProperty } from '@nestjs/swagger';

export class InterviewerProfileResponse {
  @ApiProperty()
  dob: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  price: number;
}
