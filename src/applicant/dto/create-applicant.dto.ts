import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicantDto {
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
  linkedin_url?: string;
  @ApiProperty()
  github_url?: string;
  @ApiProperty()
  rating?: number;
  @ApiProperty()
  user_id?: number;
}

export class GetApplicantDto {
  @ApiProperty()
  id: number;

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
  linkedin_url?: string;
  @ApiProperty()
  github_url?: string;
  @ApiProperty()
  rating?: number;
  @ApiProperty()
  user_id?: number;
}
