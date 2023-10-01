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

export class AllInterviewerResponse {
  @ApiProperty()
  experience: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  address: string;
  @ApiProperty()
  current_company: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  rating: number;
  @ApiProperty({
    type: 'object',

    properties: {
      name: { type: 'string' },
      image_url: { type: 'string' },
    },
  })
  user: number;
}
