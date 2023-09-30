import { ApiProperty } from '@nestjs/swagger';

export class CreateInterviewDto {
  @ApiProperty()
  interview_date: Date;

  @ApiProperty()
  interview_time: number;

  @ApiProperty()
  interview_status: string;

  @ApiProperty()
  payment_id: string;

  @ApiProperty()
  interviewer_id: number;

  @ApiProperty()
  applicant_id: number;
}
