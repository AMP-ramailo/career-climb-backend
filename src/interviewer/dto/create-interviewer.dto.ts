import { ApiProperty } from '@nestjs/swagger';

export class CreateInterviewerDto {
  @ApiProperty()
  experience?: number;
  @ApiProperty()
  interview_count?: number;
  @ApiProperty()
  dob?: Date;
  @ApiProperty()
  address?: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  current_company?: string;
  @ApiProperty()
  price?: number;
  @ApiProperty()
  rating?: number;
  @ApiProperty()
  user_id?: number;
}
