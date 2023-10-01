import { ApiProperty } from '@nestjs/swagger';

export class InterviewerResponse {
  @ApiProperty()
  session_id: number;

  @ApiProperty()
  interview_date: Date;

  @ApiProperty()
  interview_time: number;

  @ApiProperty()
  interview_status: string;

  @ApiProperty()
  interviewer_id: number;

  @ApiProperty({
    type: 'object',
    properties: {
      github_url: { type: 'string' },
      linkedin_url: { type: 'string' },
      current_company: { type: 'string' },
      experience: { type: 'number' },
      user: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          image_url: { type: 'string' },
        },
      },
    },
  })
  applicant: {
    github_url: string;
    linkedin_url: string;
    current_company: string;
    experience: number;
    user: {
      name: string;
      image_url: string;
    };
  };
}

export class ApplicantResponse {
  @ApiProperty()
  session_id: number;

  @ApiProperty()
  interview_date: Date;

  @ApiProperty()
  interview_time: number;

  @ApiProperty()
  interview_status: string;

  @ApiProperty()
  applicant_id: number;

  @ApiProperty({
    type: 'object',
    properties: {
      current_company: { type: 'string' },
      experience: { type: 'number' },
      user: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          image_url: { type: 'string' },
        },
      },
    },
  })
  interviewer: {
    current_company: string;
    experience: number;
    user: {
      name: string;
      image_url: string;
    };
  };
}
